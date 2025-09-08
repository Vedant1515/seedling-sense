import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Leaf, Package } from 'lucide-react';
import { useFarmily } from '../contexts/FarmilyContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';

export const Store: React.FC = () => {
  const { store, cart, cartCount, addToCart } = useFarmily();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast({
      title: "Added to cart! 🛒",
      description: `${item.name} added successfully`,
    });
  };

  const getCategoryIcon = (name: string) => {
    if (name.toLowerCase().includes('sensor') || name.toLowerCase().includes('iot')) return '📱';
    if (name.toLowerCase().includes('seed')) return '🌱';
    if (name.toLowerCase().includes('soil') || name.toLowerCase().includes('mix')) return '🌍';
    if (name.toLowerCase().includes('pot') || name.toLowerCase().includes('eco')) return '🪴';
    if (name.toLowerCase().includes('fertilizer')) return '🌿';
    return '📦';
  };

  const getItemsInCart = (sku: string) => {
    const cartItem = cart.find(item => item.sku === sku);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 pb-8">
        <div className="mobile-container">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <ShoppingCart size={24} />
              <div>
                <h1 className="text-2xl font-bold">Garden Store</h1>
                <p className="text-primary-foreground/80">Everything for your plants</p>
              </div>
            </div>

            {cartCount > 0 && (
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/cart')}
                className="flex items-center space-x-2"
              >
                <ShoppingCart size={16} />
                <span>Cart ({cartCount})</span>
              </Button>
            )}
          </div>

          <div className="bg-primary-foreground/10 rounded-lg p-3">
            <p className="text-sm text-primary-foreground/90">
              🔗 Store links physical + digital solution
            </p>
          </div>
        </div>
      </div>

      <div className="mobile-container py-6 space-y-6">
        {/* Categories */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {['All', 'Sensors', 'Seeds', 'Soil', 'Pots', 'Fertilizer'].map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              size="sm"
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Products */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Package size={20} className="text-primary" />
            <span>Popular Items</span>
          </h2>
          
          <div className="grid gap-4">
            {store.map((item) => {
              const inCart = getItemsInCart(item.sku);
              return (
                <Card key={item.sku} className="shadow-soft hover:shadow-card transition-smooth">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-nature rounded-lg flex items-center justify-center text-2xl">
                        {getCategoryIcon(item.name)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">SKU: {item.sku}</p>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-primary">${item.price}</span>
                            {item.price > 50 && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Free Shipping
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {inCart > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {inCart} in cart
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(item)}
                              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                            >
                              <Plus size={16} className="mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Value Proposition */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <Leaf size={48} className="mx-auto text-primary mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Growing Made Easy</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Smart sensors, quality supplies, and expert guidance - everything you need for a thriving garden.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary">🚚</div>
                <div className="text-xs text-muted-foreground">Free Shipping</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">🌱</div>
                <div className="text-xs text-muted-foreground">Expert Support</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">↩️</div>
                <div className="text-xs text-muted-foreground">30-Day Return</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};