import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { useFarmily } from '../contexts/FarmilyContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

export const Checkout: React.FC = () => {
  const { cart, clearCart } = useFarmily();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<'address' | 'payment' | 'confirmation'>('address');

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = totalPrice > 50 ? 0 : 5.99;
  const finalTotal = totalPrice + shipping;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    clearCart();
    toast({
      title: "Order placed successfully! 🎉",
      description: "Your gardening supplies are on the way",
    });
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="mobile-container py-12 text-center">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-primary-foreground" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order #FRM-{Date.now().toString().slice(-6)} is being processed.
          </p>

          <Card className="shadow-soft mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-success/10 rounded-lg">
                <p className="text-sm text-success font-medium">
                  📦 Expected delivery: 3-5 business days
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-gradient-primary text-primary-foreground"
            >
              Back to Dashboard
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/store')}
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
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
              onClick={() => step === 'address' ? navigate('/cart') : setStep('address')}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Checkout</h1>
              <p className="text-primary-foreground/80">
                {step === 'address' ? 'Shipping Address' : 'Payment Details'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-container py-6 space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center space-x-4 mb-6">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step === 'address' ? 'bg-primary text-primary-foreground' : 'bg-success text-success-foreground'
          }`}>
            <MapPin size={16} />
          </div>
          <div className={`flex-1 h-1 ${step === 'payment' ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}>
            <CreditCard size={16} />
          </div>
        </div>

        {step === 'address' && (
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Vedant" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Pandya" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Garden Street" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Green Valley" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="12345" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground">
              Continue to Payment
            </Button>
          </form>
        )}

        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="Vedant Pandya" required />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground font-semibold">
              Place Order ${finalTotal.toFixed(2)}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};