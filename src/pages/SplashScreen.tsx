import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Droplets, Users, Bell } from 'lucide-react';
import farmilyLogo from '../assets/farmily-logo.png';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center text-primary-foreground p-6">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto mb-6">
          <img 
            src={farmilyLogo} 
            alt="Farmily Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-2">Farmily</h1>
          <p className="text-lg opacity-90">"Grow Smart, Live Green."</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-primary-foreground/10 rounded-lg">
            <Droplets className="w-8 h-8" />
            <div className="text-left">
              <h3 className="font-semibold">Save Water 80%</h3>
              <p className="text-sm opacity-80">Smart monitoring prevents overwatering</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-primary-foreground/10 rounded-lg">
            <Bell className="w-8 h-8" />
            <div className="text-left">
              <h3 className="font-semibold">Easy Reminders</h3>
              <p className="text-sm opacity-80">Never forget to care for your plants</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-primary-foreground/10 rounded-lg">
            <Users className="w-8 h-8" />
            <div className="text-left">
              <h3 className="font-semibold">Community Support</h3>
              <p className="text-sm opacity-80">Learn from fellow gardeners</p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div className="w-12 h-1 bg-primary-foreground/30 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};