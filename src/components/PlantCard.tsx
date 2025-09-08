import React from 'react';
import { Droplets, Sun, Thermometer } from 'lucide-react';
import { Plant } from '../data/farmily-data';
import { useFarmily } from '../contexts/FarmilyContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';

interface PlantCardProps {
  plant: Plant;
  onClick?: () => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onClick }) => {
  const { updatePlant } = useFarmily();
  const { toast } = useToast();

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

  const handleWaterNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePlant(plant.id, {
      moisture: 60,
      status: 'Healthy',
      last_watered: new Date().toISOString()
    });
    toast({
      title: "Plant watered! 💧",
      description: `${plant.name} is now happy and healthy.`,
    });
  };

  const needsWater = plant.status === 'Needs Water' || plant.status === 'Low Moisture';

  return (
    <Card 
      className="plant-card cursor-pointer bg-gradient-to-br from-card to-primary/5" 
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            {plant.name}
          </CardTitle>
          <Badge className={`${getStatusColor(plant.status)} font-medium`}>
            {plant.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{plant.variety}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-3 bg-accent/10 rounded-lg">
            <Droplets className="w-5 h-5 text-accent mb-1" />
            <span className="text-xs text-muted-foreground">Moisture</span>
            <span className="font-semibold text-sm">{plant.moisture}%</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-warning/10 rounded-lg">
            <Sun className="w-5 h-5 text-warning mb-1" />
            <span className="text-xs text-muted-foreground">Sunlight</span>
            <span className="font-semibold text-sm">{plant.sunlight_hours}h</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-info/10 rounded-lg">
            <Thermometer className="w-5 h-5 text-info mb-1" />
            <span className="text-xs text-muted-foreground">Temp</span>
            <span className="font-semibold text-sm">{plant.temperature_c}°C</span>
          </div>
        </div>

        {needsWater && (
          <Button 
            onClick={handleWaterNow}
            className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium"
          >
            💧 Water Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
};