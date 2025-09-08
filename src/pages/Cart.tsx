import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useFarmily } from '../contexts/FarmilyContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

export const Cart: React.FC = () => {
  const { cart, cartCount, removeFromCart, clearCart } = useFarmily();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRemoveItem = (sku: string, name: string) => {
    removeFromCart(sku);
    toast({
      title: "Removed from cart",
      description: `${name} removed successfully`,
    });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-gradient-primary text-primary-foreground p-6">
          <div className="mobile-container">
            <div className="flex items-center space-x-4 mb-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/store')}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
            </div>
          </div>
        </div>

        <div className="mobile-container py-12 text-center">
          <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-6" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Discover amazing products for your garden
          </p>
          <Button 
            onClick={() => navigate('/store')}
            className="bg-gradient-primary text-primary-foreground"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6">
        <div className="mobile-container">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/store')}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <p className="text-primary-foreground/80">{cartCount} items</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-container py-6 space-y-6">
        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <Card key={item.sku} className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-nature rounded-lg flex items-center justify-center text-lg">
                    {item.name.includes('Sensor') ? '📱' :
                     item.name.includes('Seed') ? '🌱' :
                     item.name.includes('Soil') ? '🌍' :
                     item.name.includes('Pot') ? '🪴' : '🌿'}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.sku, item.name)}
                      className="text-destructive hover:text-destructive/80 p-1"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-success">
                  {totalPrice > 50 ? 'Free' : '$5.99'}
                </span>
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-primary">
                    ${(totalPrice + (totalPrice > 50 ? 0 : 5.99)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <Button 
                onClick={handleCheckout}
                className="w-full bg-gradient-primary text-primary-foreground font-semibold"
              >
                <CreditCard size={16} className="mr-2" />
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/store')}
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};