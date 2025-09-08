import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bell, BookOpen, Users, ShoppingCart, User } from 'lucide-react';
import { useFarmily } from '../contexts/FarmilyContext';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/reminders', icon: Bell, label: 'Reminders' },
  { path: '/learning', icon: BookOpen, label: 'Learn' },
  { path: '/community', icon: Users, label: 'Community' },
  { path: '/store', icon: ShoppingCart, label: 'Store' },
  { path: '/profile', icon: User, label: 'Profile' }
];

export const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const { cartCount } = useFarmily();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft">
      <div className="mobile-container py-2">
        <div className="flex justify-around items-center">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            const isStore = path === '/store';
            
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-smooth relative ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={20} />
                {isStore && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
                <span className="text-xs font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};