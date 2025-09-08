import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Award, CheckCircle } from 'lucide-react';
import { useFarmily } from '../contexts/FarmilyContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export const TutorialDetail: React.FC = () => {
  const { tutorialId } = useParams<{ tutorialId: string }>();
  const { tutorials } = useFarmily();
  const navigate = useNavigate();

  const tutorial = tutorials.find(t => t.id === tutorialId);

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Tutorial not found</p>
      </div>
    );
  }

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

  // Mock tutorial content based on title
  const getTutorialSteps = (title: string) => {
    switch (title) {
      case 'Basil Care 101':
        return [
          'Choose a sunny location with 6+ hours of direct sunlight',
          'Plant in well-draining soil with good organic content',
          'Water when top inch of soil feels dry',
          'Pinch flowers to encourage leaf growth',
          'Harvest leaves regularly for best flavor'
        ];
      case 'Wicking Bed Setup':
        return [
          'Choose a suitable container with drainage holes',
          'Install the water reservoir at the bottom',
          'Add a layer of gravel for drainage',
          'Place the wicking fabric or pipe system',
          'Fill with quality potting soil and plant'
        ];
      case 'Watering Schedules':
        return [
          'Check soil moisture before watering',
          'Water deeply but less frequently',
          'Adjust schedule based on season and weather',
          'Use mulch to retain soil moisture'
        ];
      case 'Compost Basics':
        return [
          'Gather brown materials (dry leaves, paper)',
          'Collect green materials (food scraps, grass)',
          'Layer materials in 3:1 brown to green ratio',
          'Turn pile regularly for proper aeration',
          'Monitor temperature and moisture levels',
          'Harvest finished compost in 3-6 months'
        ];
      case 'Pest Prevention':
        return [
          'Inspect plants weekly for early detection',
          'Encourage beneficial insects with diverse plants',
          'Use companion planting for natural pest control',
          'Apply neem oil or insecticidal soap when needed',
          'Remove affected plant material promptly',
          'Maintain proper spacing for air circulation'
        ];
      default:
        return ['Tutorial content loading...'];
    }
  };

  const steps = getTutorialSteps(tutorial.title);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6">
        <div className="mobile-container">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/learning')}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{tutorial.title}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span className="text-sm">{tutorial.length}</span>
                </div>
                <Badge className={getLevelColor(tutorial.level)}>
                  {tutorial.level}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-container py-6 space-y-6">
        {/* Video Placeholder */}
        <Card className="shadow-soft">
          <CardContent className="p-0">
            <div className="aspect-video bg-gradient-nature rounded-t-lg flex items-center justify-center text-primary-foreground">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play size={24} />
                </div>
                <p className="text-sm opacity-80">Video Tutorial</p>
                <p className="text-xs opacity-60">Duration: {tutorial.length}</p>
              </div>
            </div>
            <div className="p-4">
              <Button className="w-full bg-gradient-primary text-primary-foreground font-medium">
                <Play size={16} className="mr-2" />
                Start Video Tutorial
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tutorial Overview */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">What You'll Learn</h2>
            <p className="text-muted-foreground mb-4">
              This comprehensive guide will teach you everything you need to know about{' '}
              {tutorial.title.toLowerCase()}. Perfect for {tutorial.level.toLowerCase()} gardeners 
              who want to improve their skills.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <Award size={24} className="mx-auto text-primary mb-2" />
                <p className="text-sm font-medium">Expert Tips</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <CheckCircle size={24} className="mx-auto text-success mb-2" />
                <p className="text-sm font-medium">Proven Methods</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Guide */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Step-by-Step Guide</h2>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Tutorials */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Related Tutorials</h2>
            <div className="space-y-3">
              {tutorials
                .filter(t => t.id !== tutorial.id && t.level === tutorial.level)
                .slice(0, 2)
                .map((relatedTutorial) => (
                  <div 
                    key={relatedTutorial.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-smooth"
                    onClick={() => navigate(`/tutorial/${relatedTutorial.id}`)}
                  >
                    <div>
                      <h3 className="font-medium text-foreground">{relatedTutorial.title}</h3>
                      <p className="text-sm text-muted-foreground">{relatedTutorial.length}</p>
                    </div>
                    <Play size={16} className="text-primary" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};