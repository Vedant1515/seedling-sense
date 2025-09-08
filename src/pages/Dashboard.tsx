import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Leaf } from 'lucide-react';
import { useFarmily } from '../contexts/FarmilyContext';
import { PlantCard } from '../components/PlantCard';
import { Button } from '../components/ui/button';

export const Dashboard: React.FC = () => {
  const { plants, reminders } = useFarmily();
  const navigate = useNavigate();

  const urgentReminders = reminders.filter(r => r.due === 'Today' && r.priority === 'High');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 pb-8">
        <div className="mobile-container">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Leaf size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome back!</h1>
              <p className="text-primary-foreground/80">Your garden is thriving 🌱</p>
            </div>
          </div>

          {urgentReminders.length > 0 && (
            <div className="bg-warning/20 border border-warning/30 rounded-lg p-4 mb-4">
              <p className="font-medium text-primary-foreground">
                ⚠️ {urgentReminders.length} urgent task{urgentReminders.length > 1 ? 's' : ''} today
              </p>
              <p className="text-sm text-primary-foreground/80">
                One-glance plant health saves time
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Plants Grid */}
      <div className="mobile-container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">My Plants</h2>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Plus size={16} />
            <span>Add Plant</span>
          </Button>
        </div>

        <div className="grid gap-4">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onClick={() => navigate(`/plant/${plant.id}`)}
            />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="bg-card p-4 rounded-lg shadow-soft border">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm font-medium text-muted-foreground">Healthy Plants</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {plants.filter(p => p.status === 'Healthy').length}
            </p>
          </div>

          <div className="bg-card p-4 rounded-lg shadow-soft border">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-sm font-medium text-muted-foreground">Need Attention</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {plants.filter(p => p.status !== 'Healthy').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};