import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');

  const purchaseHistory = [
    {
      id: 'PU20241028001',
      date: '28.10.2024 14:32',
      uc: 660,
      price: 500,
      status: 'completed',
      playerId: '5123456789',
    },
    {
      id: 'PU20241025002',
      date: '25.10.2024 19:15',
      uc: 1800,
      price: 1350,
      status: 'completed',
      playerId: '5123456789',
    },
    {
      id: 'PU20241020003',
      date: '20.10.2024 11:48',
      uc: 325,
      price: 250,
      status: 'completed',
      playerId: '5123456789',
    },
    {
      id: 'PU20241015004',
      date: '15.10.2024 16:22',
      uc: 3850,
      price: 2750,
      status: 'completed',
      playerId: '5123456789',
    },
  ];

  const totalSpent = purchaseHistory.reduce((sum, item) => sum + item.price, 0);
  const totalUC = purchaseHistory.reduce((sum, item) => sum + item.uc, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" className="text-primary-foreground" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                UC SHOP
              </span>
            </div>
            <Button
              variant="outline"
              className="border-border"
              onClick={() => navigate('/')}
            >
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="User" className="text-primary" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Личный кабинет</h1>
            <p className="text-muted-foreground">Управляйте покупками и профилем</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Всего покупок</span>
              <Icon name="ShoppingBag" className="text-primary" size={20} />
            </div>
            <div className="text-3xl font-bold text-primary">{purchaseHistory.length}</div>
          </Card>
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Куплено UC</span>
              <Icon name="Coins" className="text-secondary" size={20} />
            </div>
            <div className="text-3xl font-bold text-secondary">{totalUC.toLocaleString()}</div>
          </Card>
          <Card className="p-6 border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Потрачено</span>
              <Icon name="TrendingUp" className="text-primary" size={20} />
            </div>
            <div className="text-3xl font-bold">{totalSpent.toLocaleString()} ₽</div>
          </Card>
        </div>

        <Card className="border-border bg-card">
          <div className="border-b border-border">
            <div className="flex gap-4 px-6">
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="History" size={18} className="inline mr-2" />
                История покупок
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="User" size={18} className="inline mr-2" />
                Профиль
              </button>
            </div>
          </div>

          {activeTab === 'history' && (
            <div className="p-6">
              <div className="space-y-4">
                {purchaseHistory.map((purchase) => (
                  <Card
                    key={purchase.id}
                    className="p-4 border-border bg-background hover:border-primary/50 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="Package" className="text-primary" size={24} />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{purchase.uc} UC</div>
                          <div className="text-sm text-muted-foreground">
                            Заказ #{purchase.id}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Player ID: {purchase.playerId}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold">{purchase.price} ₽</div>
                          <div className="text-sm text-muted-foreground">{purchase.date}</div>
                        </div>
                        <div className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium flex items-center gap-1">
                          <Icon name="CheckCircle" size={14} />
                          Выполнен
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="p-6">
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold mb-6">Настройки профиля</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Имя</label>
                    <Input
                      type="text"
                      placeholder="Ваше имя"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Player ID (по умолчанию)
                    </label>
                    <Input
                      type="text"
                      placeholder="5123456789"
                      defaultValue="5123456789"
                      className="bg-background border-border"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Этот ID будет автоматически подставляться при покупке
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <Icon name="Bell" size={18} className="text-primary" />
                      Уведомления
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm">Email уведомления о покупках</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm">Акции и специальные предложения</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm">SMS уведомления</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Icon name="Save" size={18} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
