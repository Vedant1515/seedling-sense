import React from 'react';
import { Bell, Clock, AlertTriangle, CheckCircle, Pause } from 'lucide-react';
import { useFarmily } from '../contexts/FarmilyContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';

export const Reminders: React.FC = () => {
  const { reminders, plants, markReminderDone, snoozeReminder } = useFarmily();
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <AlertTriangle size={16} className="text-destructive" />;
      case 'medium':
        return <Clock size={16} className="text-warning" />;
      case 'low':
        return <Bell size={16} className="text-success" />;
      default:
        return <Bell size={16} />;
    }
  };

  const handleMarkDone = (reminderId: string, plantName: string) => {
    markReminderDone(reminderId);
    toast({
      title: "Task Completed! ✅",
      description: `Great job taking care of your ${plantName}!`,
    });
  };

  const handleSnooze = (reminderId: string) => {
    snoozeReminder(reminderId);
    toast({
      title: "Reminder snoozed 😴",
      description: "Task moved to tomorrow",
    });
  };

  const getPlantName = (plantId: string) => {
    const plant = plants.find(p => p.id === plantId);
    return plant?.name || 'Unknown Plant';
  };

  const todayReminders = reminders.filter(r => r.due === 'Today');
  const otherReminders = reminders.filter(r => r.due !== 'Today');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 pb-8">
        <div className="mobile-container">
          <div className="flex items-center space-x-3">
            <Bell size={24} />
            <div>
              <h1 className="text-2xl font-bold">Reminders</h1>
              <p className="text-primary-foreground/80">
                {todayReminders.length} task{todayReminders.length !== 1 ? 's' : ''} due today
              </p>
            </div>
          </div>

          {todayReminders.length > 0 && (
            <div className="bg-primary-foreground/10 rounded-lg p-3 mt-4">
              <p className="text-sm text-primary-foreground/90">
                💡 Reminders prevent plant neglect
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mobile-container py-6 space-y-6">
        {/* Today's Tasks */}
        {todayReminders.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
              <AlertTriangle size={20} className="text-destructive" />
              <span>Due Today</span>
            </h2>
            <div className="space-y-3">
              {todayReminders.map((reminder) => (
                <Card key={reminder.id} className="shadow-soft border-l-4 border-l-destructive">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getPriorityIcon(reminder.priority)}
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {reminder.type} {getPlantName(reminder.plantId)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Due {reminder.due}
                          </p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(reminder.priority)}>
                        {reminder.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleMarkDone(reminder.id, getPlantName(reminder.plantId))}
                        className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Mark Done
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSnooze(reminder.id)}
                        className="flex-1"
                      >
                        <Pause size={16} className="mr-2" />
                        Snooze
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Tasks */}
        {otherReminders.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Clock size={20} className="text-muted-foreground" />
              <span>Upcoming</span>
            </h2>
            <div className="space-y-3">
              {otherReminders.map((reminder) => (
                <Card key={reminder.id} className="shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getPriorityIcon(reminder.priority)}
                        <div>
                          <h3 className="font-medium text-foreground">
                            {reminder.type} {getPlantName(reminder.plantId)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Due {reminder.due}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-muted-foreground">
                        {reminder.priority}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {reminders.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle size={48} className="mx-auto text-success mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
            <p className="text-muted-foreground">No pending reminders. Great job! 🌱</p>
          </div>
        )}
      </div>
    </div>
  );
};