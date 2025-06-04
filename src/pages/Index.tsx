
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CircleArrowRight, Brain, Users, Sparkles } from 'lucide-react';
import QuizScreen from '@/components/QuizScreen';
import TypeReveal from '@/components/TypeReveal';
import GalaxyMap from '@/components/GalaxyMap';
import TeamSynergy from '@/components/TeamSynergy';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [mbtiResult, setMbtiResult] = useState(null);

  const handleQuizComplete = (result) => {
    setMbtiResult(result);
    setCurrentScreen('reveal');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'quiz':
        return <QuizScreen onComplete={handleQuizComplete} />;
      case 'reveal':
        return <TypeReveal result={mbtiResult} onContinue={() => setCurrentScreen('galaxy')} />;
      case 'galaxy':
        return <GalaxyMap result={mbtiResult} onTeamMode={() => setCurrentScreen('team')} />;
      case 'team':
        return <TeamSynergy result={mbtiResult} onBack={() => setCurrentScreen('galaxy')} />;
      default:
        return <WelcomeScreen onStart={() => setCurrentScreen('quiz')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-galactic-dark via-galactic to-galactic-light font-manrope">
      {renderScreen()}
    </div>
  );
};

const WelcomeScreen = ({ onStart }) => {
  const timeOfDay = new Date().getHours();
  const greeting = timeOfDay < 12 ? 'Good Morning' : timeOfDay < 18 ? 'Good Afternoon' : 'Good Evening';
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cosmic background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-mystic rounded-full animate-particle-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <Card className="max-w-lg w-full bg-quartz/10 backdrop-blur-lg border-mystic/30 shadow-2xl animate-fade-in">
        <div className="p-8 text-center space-y-6">
          {/* Logo/Title */}
          <div className="space-y-2">
            <div className="relative mx-auto w-20 h-20 mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-mystic to-mint rounded-full animate-aura-pulse" />
              <div className="absolute inset-2 bg-galactic rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-mystic" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-quartz bg-gradient-to-r from-mystic to-mint bg-clip-text text-transparent">
              PersonaFlux
            </h1>
            <p className="text-quartz/80 text-lg">{greeting}, Explorer</p>
          </div>

          {/* Subtitle */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-quartz">
              Who Are You Today?
            </h2>
            <p className="text-quartz/70 leading-relaxed">
              Discover your MBTI personality through an immersive cosmic journey. 
              Understand how your mind works, how you connect with others, and unlock your potential.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-center space-x-2 text-quartz/80">
              <Sparkles className="w-4 h-4 text-mint" />
              <span>Lightning-fast 12-question quiz</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-quartz/80">
              <Brain className="w-4 h-4 text-mystic" />
              <span>Cognitive function analysis</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-quartz/80">
              <Users className="w-4 h-4 text-mint" />
              <span>Team compatibility insights</span>
            </div>
          </div>

          {/* Start button */}
          <Button 
            onClick={onStart}
            className="w-full bg-gradient-to-r from-mystic to-mystic-dark hover:from-mystic-dark hover:to-mystic text-white font-semibold py-4 text-lg animate-cosmic-glow transition-all duration-300 transform hover:scale-105"
          >
            Begin Your Discovery
            <CircleArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <p className="text-xs text-quartz/50 mt-4">
            ✨ Your journey to self-discovery starts here
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Index;
