import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Award, Play } from 'lucide-react';
import { useFarmily } from '../contexts/FarmilyContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export const LearningHub: React.FC = () => {
  const { tutorials } = useFarmily();
  const navigate = useNavigate();

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-success/10 text-success border-success/20';
      case 'intermediate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🌿';
      case 'advanced':
        return '🌳';
      default:
        return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 pb-8">
        <div className="mobile-container">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen size={24} />
            <div>
              <h1 className="text-2xl font-bold">Learning Hub</h1>
              <p className="text-primary-foreground/80">Master your green thumb</p>
            </div>
          </div>

          <div className="bg-primary-foreground/10 rounded-lg p-3">
            <p className="text-sm text-primary-foreground/90">
              🎓 Learning Hub reduces beginner drop-off
            </p>
          </div>
        </div>
      </div>

      <div className="mobile-container py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <div className="text-2xl mb-1">📚</div>
            <div className="text-lg font-bold">{tutorials.length}</div>
            <div className="text-xs text-muted-foreground">Tutorials</div>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-lg font-bold">
              {tutorials.reduce((acc, t) => acc + parseInt(t.length), 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total mins</div>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-lg font-bold">85%</div>
            <div className="text-xs text-muted-foreground">Progress</div>
          </Card>
        </div>

        {/* Beginner Tutorials */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <span>🌱</span>
            <span>Beginner Friendly</span>
          </h2>
          <div className="space-y-3">
            {tutorials
              .filter(tutorial => tutorial.level === 'Beginner')
              .map((tutorial) => (
                <Card 
                  key={tutorial.id} 
                  className="shadow-soft hover:shadow-card transition-smooth cursor-pointer"
                  onClick={() => navigate(`/tutorial/${tutorial.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground text-lg">
                          {getLevelIcon(tutorial.level)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{tutorial.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock size={14} className="text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{tutorial.length}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getLevelColor(tutorial.level)}>
                        {tutorial.level}
                      </Badge>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="w-full justify-start text-primary">
                      <Play size={16} className="mr-2" />
                      Start Tutorial
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Intermediate Tutorials */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
            <span>🌿</span>
            <span>Intermediate</span>
          </h2>
          <div className="space-y-3">
            {tutorials
              .filter(tutorial => tutorial.level === 'Intermediate')
              .map((tutorial) => (
                <Card 
                  key={tutorial.id} 
                  className="shadow-soft hover:shadow-card transition-smooth cursor-pointer"
                  onClick={() => navigate(`/tutorial/${tutorial.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-nature rounded-lg flex items-center justify-center text-primary-foreground text-lg">
                          {getLevelIcon(tutorial.level)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{tutorial.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock size={14} className="text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{tutorial.length}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getLevelColor(tutorial.level)}>
                        {tutorial.level}
                      </Badge>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="w-full justify-start text-primary">
                      <Play size={16} className="mr-2" />
                      Start Tutorial
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="p-6 text-center">
            <Award size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-foreground mb-2">More Content Coming Soon!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced tutorials, plant identification guides, and seasonal care tips.
            </p>
            <Button variant="outline" size="sm">
              Request a Topic
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};