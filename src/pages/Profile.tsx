import React, { useState } from 'react';
import { User, Settings, Bell, Moon, Sun, LogOut, Award, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';

export const Profile: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const userStats = [
    { label: 'Plants Growing', value: 3, icon: '🌱' },
    { label: 'Days Active', value: 24, icon: '📅' },
    { label: 'Tasks Completed', value: 18, icon: '✅' },
    { label: 'Community Posts', value: 5, icon: '💬' },
  ];

  const achievements = [
    { name: 'First Plant', icon: '🌱', unlocked: true },
    { name: 'Green Thumb', icon: '👍', unlocked: true },
    { label: 'Plant Parent', icon: '👨‍👩‍👧‍👦', unlocked: false },
    { name: 'Harvest Master', icon: '🌾', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 pb-8">
        <div className="mobile-container">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Vedant Pandya</h1>
              <p className="text-primary-foreground/80">vedant@farmily.com</p>
              <p className="text-sm text-primary-foreground/60">Member since September 2025</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {userStats.slice(0, 2).map((stat, index) => (
              <div key={index} className="bg-primary-foreground/10 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mobile-container py-6 space-y-6">
        {/* Activity Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award size={20} className="text-primary" />
              <span>Your Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {userStats.slice(2).map((stat, index) => (
                <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf size={20} className="text-primary" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border text-center ${
                    achievement.unlocked 
                      ? 'bg-success/10 border-success/20' 
                      : 'bg-muted/30 border-border'
                  }`}
                >
                  <div className={`text-2xl mb-2 ${achievement.unlocked ? '' : 'opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className={`text-sm font-medium ${
                    achievement.unlocked ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {achievement.name}
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      Unlocked
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings size={20} className="text-primary" />
              <span>Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Notifications */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Notifications</p>
                  <p className="text-sm text-muted-foreground">Care reminders & updates</p>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                {darkMode ? (
                  <Moon size={20} className="text-muted-foreground" />
                ) : (
                  <Sun size={20} className="text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle appearance</p>
                </div>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
              />
            </div>

            {/* Account Actions */}
            <div className="space-y-3 pt-4">
              <Button variant="outline" className="w-full justify-start">
                <Settings size={16} className="mr-3" />
                Account Settings
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Award size={16} className="mr-3" />
                Privacy Policy
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                <LogOut size={16} className="mr-3" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Farmily v1.0.0 • Made with 💚 for plant lovers
          </p>
        </div>
      </div>
    </div>
  );
};