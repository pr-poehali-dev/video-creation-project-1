import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [playerId, setPlayerId] = useState('');

  const packages = [
    { id: 1, uc: 60, price: 50, bonus: 0 },
    { id: 2, uc: 325, price: 250, bonus: 25 },
    { id: 3, uc: 660, price: 500, bonus: 60 },
    { id: 4, uc: 1800, price: 1350, bonus: 300 },
    { id: 5, uc: 3850, price: 2750, bonus: 850 },
    { id: 6, uc: 8100, price: 5500, bonus: 2100 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" className="text-primary-foreground" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                UC SHOP
              </span>
            </div>
            <nav className="hidden md:flex gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`font-medium transition-colors ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('how')}
                className={`font-medium transition-colors ${
                  activeSection === 'how' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Как оплатить
              </button>
              <button
                onClick={() => setActiveSection('packages')}
                className={`font-medium transition-colors ${
                  activeSection === 'packages' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Тарифы
              </button>
            </nav>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => navigate('/dashboard')}
            >
              <Icon name="User" size={18} className="mr-2" />
              Личный кабинет
            </Button>
          </div>
        </div>
      </header>

      {activeSection === 'home' && (
        <>
          <section className="relative overflow-hidden py-20 md:py-32">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url('https://cdn.poehali.dev/projects/4a77ac52-47af-432f-b01a-5c056d81ac9c/files/d7d9a0a5-b3dd-44de-9116-31f3da06d7ea.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-block mb-6 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                  <span className="text-primary font-semibold flex items-center gap-2">
                    <Icon name="Sparkles" size={16} />
                    Моментальная доставка UC
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                  Пополни UC по лучшей цене
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Автоматическая выдача за 30 секунд. Безопасно и надежно.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg"
                    onClick={() => setActiveSection('packages')}
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Купить UC
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 text-lg"
                    onClick={() => setActiveSection('how')}
                  >
                    <Icon name="HelpCircle" size={20} className="mr-2" />
                    Как это работает
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 border-border bg-card hover:border-primary/50 transition-all">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Zap" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Моментально</h3>
                  <p className="text-muted-foreground">
                    UC поступает на ваш аккаунт автоматически в течение 30 секунд после оплаты
                  </p>
                </Card>
                <Card className="p-6 border-border bg-card hover:border-primary/50 transition-all">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Shield" className="text-secondary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Безопасно</h3>
                  <p className="text-muted-foreground">
                    Гарантия возврата средств. Работаем официально более 5 лет
                  </p>
                </Card>
                <Card className="p-6 border-border bg-card hover:border-primary/50 transition-all">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Tag" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Выгодно</h3>
                  <p className="text-muted-foreground">
                    Самые низкие цены на рынке. Бонусы к каждой покупке
                  </p>
                </Card>
              </div>
            </div>
          </section>
        </>
      )}

      {activeSection === 'how' && (
        <section className="py-16 min-h-[60vh]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Как оплатить UC</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Выберите пакет UC</h3>
                    <p className="text-muted-foreground">
                      Перейдите в раздел "Тарифы" и выберите подходящий вам пакет UC. Чем больше пакет - тем выгоднее цена!
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Введите ID игрока</h3>
                    <p className="text-muted-foreground">
                      Укажите ваш Player ID из PUBG Mobile. Его можно найти в настройках игры в разделе "Основное".
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Оплатите любым способом</h3>
                    <p className="text-muted-foreground mb-4">
                      Мы принимаем банковские карты, электронные кошельки и криптовалюту
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="px-4 py-2 bg-card border border-border rounded-lg">
                        <Icon name="CreditCard" size={20} className="text-primary" />
                      </div>
                      <div className="px-4 py-2 bg-card border border-border rounded-lg">
                        <Icon name="Smartphone" size={20} className="text-primary" />
                      </div>
                      <div className="px-4 py-2 bg-card border border-border rounded-lg">
                        <Icon name="Bitcoin" size={20} className="text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Icon name="Check" className="text-secondary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Получите UC моментально</h3>
                    <p className="text-muted-foreground">
                      После успешной оплаты UC автоматически начислится на ваш аккаунт в течение 30 секунд!
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12 p-6 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="flex gap-4">
                  <Icon name="Info" className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold mb-2">Важно знать</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Убедитесь, что вводите правильный Player ID</li>
                      <li>• UC доставляется автоматически, служба поддержки не требуется</li>
                      <li>• При возникновении проблем - свяжитесь с поддержкой 24/7</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'packages' && (
        <section className="py-16 min-h-[60vh]">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Выберите пакет UC</h2>
              <p className="text-center text-muted-foreground mb-12">
                Чем больше пакет - тем выгоднее цена и больше бонусов!
              </p>
              <div className="mb-8 max-w-md mx-auto">
                <label className="block text-sm font-medium mb-2">Player ID</label>
                <Input
                  type="text"
                  placeholder="Введите ваш Player ID"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  className="bg-card border-border"
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className="p-6 border-border bg-card hover:border-primary transition-all relative overflow-hidden group"
                  >
                    {pkg.bonus > 0 && (
                      <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
                        +{pkg.bonus} UC
                      </div>
                    )}
                    <div
                      className="w-full h-32 mb-4 rounded-lg bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"
                      style={{
                        backgroundImage: `url('https://cdn.poehali.dev/projects/4a77ac52-47af-432f-b01a-5c056d81ac9c/files/0fa0ba46-7081-45f3-ab68-1cb57b73cb3b.jpg')`,
                      }}
                    />
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-primary">{pkg.uc}</span>
                      <span className="text-muted-foreground">UC</span>
                    </div>
                    {pkg.bonus > 0 && (
                      <div className="text-sm text-secondary font-medium mb-4">
                        = {pkg.uc - pkg.bonus} UC + {pkg.bonus} бонус
                      </div>
                    )}
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-2xl font-bold">{pkg.price}</span>
                      <span className="text-muted-foreground">₽</span>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Купить
                    </Button>
                  </Card>
                ))}
              </div>
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card px-6 py-3 rounded-lg border border-border">
                  <Icon name="Shield" size={18} className="text-primary" />
                  <span>Безопасная оплата через проверенные платежные системы</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-card border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" className="text-primary-foreground" size={24} />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  UC SHOP
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Официальный магазин пополнения UC для PUBG Mobile
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => setActiveSection('home')} className="hover:text-primary transition-colors">
                    Главная
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveSection('how')} className="hover:text-primary transition-colors">
                    Как оплатить
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveSection('packages')} className="hover:text-primary transition-colors">
                    Тарифы
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О компании</li>
                <li>Гарантии</li>
                <li>Отзывы</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Поддержка</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-muted-foreground">support@ucshop.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="MessageCircle" size={16} className="text-primary" />
                  <span className="text-muted-foreground">Онлайн чат 24/7</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 UC SHOP. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;