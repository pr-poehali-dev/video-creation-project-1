import json
import os
import uuid
import base64
import psycopg2
from typing import Dict, Any
from datetime import datetime
from urllib import request, parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Создание платежа в ЮKassa для покупки UC
    Args: event с POST запросом {player_id, uc_amount, price}
    Returns: HTTP response с confirmation_url для оплаты
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    player_id = body_data.get('player_id')
    uc_amount = body_data.get('uc_amount')
    price = body_data.get('price')
    
    if not player_id or not uc_amount or not price:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Missing required fields'})
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
    
    order_number = f"PU{datetime.now().strftime('%Y%m%d')}{str(uuid.uuid4())[:6].upper()}"
    idempotence_key = str(uuid.uuid4())
    
    payment_data = {
        'amount': {
            'value': f'{price}.00',
            'currency': 'RUB'
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': 'https://your-site.com/payment-success'
        },
        'capture': True,
        'description': f'Пополнение {uc_amount} UC - Player ID: {player_id}',
        'metadata': {
            'order_number': order_number,
            'player_id': player_id,
            'uc_amount': uc_amount
        }
    }
    
    auth_string = f'{shop_id}:{secret_key}'
    auth_bytes = auth_string.encode('utf-8')
    auth_b64 = base64.b64encode(auth_bytes).decode('utf-8')
    
    headers = {
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotence_key,
        'Authorization': f'Basic {auth_b64}'
    }
    
    req = request.Request(
        'https://api.yookassa.ru/v3/payments',
        data=json.dumps(payment_data).encode('utf-8'),
        headers=headers,
        method='POST'
    )
    
    response = request.urlopen(req)
    payment_response = json.loads(response.read().decode('utf-8'))
    
    payment_id = payment_response.get('id')
    confirmation_url = payment_response.get('confirmation', {}).get('confirmation_url')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO orders (order_number, player_id, uc_amount, price, payment_id, status) VALUES (%s, %s, %s, %s, %s, %s)",
        (order_number, player_id, uc_amount, price, payment_id, 'pending')
    )
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({
            'order_number': order_number,
            'payment_id': payment_id,
            'confirmation_url': confirmation_url
        })
    }
