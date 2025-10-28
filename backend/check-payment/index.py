import json
import os
import base64
import psycopg2
from typing import Dict, Any
from urllib import request
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Проверка статуса платежа и обновление заказа
    Args: event с GET запросом ?payment_id=xxx
    Returns: HTTP response со статусом платежа
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    query_params = event.get('queryStringParameters', {})
    payment_id = query_params.get('payment_id')
    
    if not payment_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'payment_id required'})
        }
    
    shop_id = os.environ.get('YUKASSA_SHOP_ID')
    secret_key = os.environ.get('YUKASSA_SECRET_KEY')
    database_url = os.environ.get('DATABASE_URL')
    
    if not shop_id or not secret_key:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Payment system not configured'})
        }
    
    auth_string = f'{shop_id}:{secret_key}'
    auth_bytes = auth_string.encode('utf-8')
    auth_b64 = base64.b64encode(auth_bytes).decode('utf-8')
    
    headers = {
        'Authorization': f'Basic {auth_b64}'
    }
    
    req = request.Request(
        f'https://api.yookassa.ru/v3/payments/{payment_id}',
        headers=headers,
        method='GET'
    )
    
    response = request.urlopen(req)
    payment_info = json.loads(response.read().decode('utf-8'))
    
    payment_status = payment_info.get('status')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    if payment_status == 'succeeded':
        cur.execute(
            "UPDATE orders SET status = %s, completed_at = %s WHERE payment_id = %s",
            ('completed', datetime.now(), payment_id)
        )
        conn.commit()
        
        cur.execute(
            "SELECT order_number, player_id, uc_amount FROM orders WHERE payment_id = %s",
            (payment_id,)
        )
        order = cur.fetchone()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'status': 'completed',
                'order_number': order[0] if order else None,
                'player_id': order[1] if order else None,
                'uc_amount': order[2] if order else None,
                'message': 'UC successfully delivered!'
            })
        }
    elif payment_status == 'pending':
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'status': 'pending',
                'message': 'Payment in progress'
            })
        }
    else:
        cur.execute(
            "UPDATE orders SET status = %s WHERE payment_id = %s",
            ('failed', payment_id)
        )
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'status': 'failed',
                'message': 'Payment failed'
            })
        }
