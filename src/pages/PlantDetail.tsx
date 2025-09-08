import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplets, Sun, Thermometer, Calendar, Activity } from 'lucide-react';
import { useFarmily } from '../contexts/FarmilyContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export const PlantDetail: React.FC = () => {
  const { plantId } = useParams<{ plantId: string }>();
  const navigate = useNavigate();
  const { plants } = useFarmily();

  const plant = plants.find(p => p.id === plantId);

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Plant not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
        return 'bg-success/10 text-success border-success/20';
      case 'needs water':
      case 'low moisture':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Mock 7-day moisture data
  const moistureData = [45, 38, 42, 55, 48, 52, plant.moisture];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6">
        <div className="mobile-container">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{plant.name}</h1>
              <p className="text-primary-foreground/80">{plant.variety}</p>
            </div>
          </div>
          
          <Badge className={`${getStatusColor(plant.status)} font-medium`}>
            {plant.status}
          </Badge>
        </div>
      </div>

      <div className="mobile-container py-6 space-y-6">
        {/* Current Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity size={20} className="text-primary" />
              <span>Current Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-accent/10 rounded-lg">
                <Droplets className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold">{plant.moisture}%</p>
                <p className="text-xs text-muted-foreground">Soil Moisture</p>
              </div>
              
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <Sun className="w-6 h-6 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold">{plant.sunlight_hours}h</p>
                <p className="text-xs text-muted-foreground">Daily Sun</p>
              </div>
              
              <div className="text-center p-4 bg-info/10 rounded-lg">
                <Thermometer className="w-6 h-6 text-info mx-auto mb-2" />
                <p className="text-2xl font-bold">{plant.temperature_c}°C</p>
                <p className="text-xs text-muted-foreground">Temperature</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Moisture Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Moisture Levels (7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-end h-32 px-2">
                {moistureData.map((value, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="bg-gradient-primary rounded-t w-6"
                      style={{ height: `${(value / 100) * 80}px` }}
                    ></div>
                    <span className="text-xs font-medium">{value}%</span>
                    <span className="text-xs text-muted-foreground">{days[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Care History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar size={20} className="text-primary" />
              <span>Care History</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <div>
                <p className="font-medium text-sm">Last watered</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(plant.last_watered).toLocaleDateString()} at{' '}
                  {new Date(plant.last_watered).toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <div>
                <p className="font-medium text-sm">Last fertilized</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <div>
                <p className="font-medium text-sm">Repotted</p>
                <p className="text-xs text-muted-foreground">2 weeks ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};