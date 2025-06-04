
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, CircleArrowRight } from 'lucide-react';

const mbtiDescriptions = {
  'ENFP': { name: 'The Campaigner', description: 'Enthusiastic, creative, and sociable free spirits' },
  'INFP': { name: 'The Mediator', description: 'Poetic, kind, and altruistic, always eager to help' },
  'ENFJ': { name: 'The Protagonist', description: 'Charismatic and inspiring leaders, able to mesmerize listeners' },
  'INFJ': { name: 'The Advocate', description: 'Creative and insightful, inspired and independent' },
  'ENTP': { name: 'The Debater', description: 'Smart and curious thinkers who cannot resist an intellectual challenge' },
  'INTP': { name: 'The Thinker', description: 'Innovative inventors with an unquenchable thirst for knowledge' },
  'ENTJ': { name: 'The Commander', description: 'Bold, imaginative, and strong-willed leaders' },
  'INTJ': { name: 'The Architect', description: 'Imaginative and strategic thinkers, with a plan for everything' },
  'ESFP': { name: 'The Entertainer', description: 'Spontaneous, energetic, and enthusiastic people' },
  'ISFP': { name: 'The Adventurer', description: 'Flexible and charming artists, always ready to explore' },
  'ESFJ': { name: 'The Consul', description: 'Extraordinarily caring, social, and popular people' },
  'ISFJ': { name: 'The Protector', description: 'Very dedicated and warm protectors, always ready to defend loved ones' },
  'ESTP': { name: 'The Entrepreneur', description: 'Smart, energetic, and perceptive people who enjoy living on the edge' },
  'ISTP': { name: 'The Virtuoso', description: 'Bold and practical experimenters, masters of all kinds of tools' },
  'ESTJ': { name: 'The Executive', description: 'Excellent administrators, unsurpassed at managing things or people' },
  'ISTJ': { name: 'The Logistician', description: 'Practical and fact-minded, reliable and responsible' }
};

const TypeReveal = ({ result, onContinue }) => {
  const [showLetters, setShowLetters] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const typeInfo = mbtiDescriptions[result.type];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLetters(true), 500);
    const timer2 = setTimeout(() => setShowDescription(true), 1500);
    const timer3 = setTimeout(() => setShowStats(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dramatic particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-mystic rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <Card className="max-w-lg w-full bg-quartz/10 backdrop-blur-lg border-mystic/30 shadow-2xl">
        <div className="p-8 text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-r from-mystic to-mint rounded-full animate-aura-pulse" />
              <div className="absolute inset-2 bg-galactic rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-mystic" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-quartz">Your Core Is...</h1>
          </div>

          {/* MBTI Letters Animation */}
          <div className="space-y-4">
            {showLetters && (
              <div className="flex justify-center space-x-4 animate-fade-in">
                {result.type.split('').map((letter, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 bg-gradient-to-br from-mystic to-mystic-dark rounded-lg flex items-center justify-center text-white text-2xl font-bold animate-scale-in shadow-lg"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            )}

            {showDescription && (
              <div className="space-y-2 animate-fade-in">
                <h2 className="text-3xl font-bold text-quartz bg-gradient-to-r from-mystic to-mint bg-clip-text text-transparent">
                  {typeInfo.name}
                </h2>
                <p className="text-quartz/80 text-lg leading-relaxed">
                  {typeInfo.description}
                </p>
              </div>
            )}
          </div>

          {/* Personality Breakdown */}
          {showStats && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-semibold text-quartz flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2 text-mint" />
                Your Personality Breakdown
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-quartz/80">Extraverted</span>
                    <span className="text-mystic font-semibold">{result.scores.E}%</span>
                  </div>
                  <div className="w-full bg-galactic-light rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-mystic to-mystic-light h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${result.scores.E}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-quartz/80">Sensing</span>
                    <span className="text-mint font-semibold">{result.scores.S}%</span>
                  </div>
                  <div className="w-full bg-galactic-light rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-mint to-mint-light h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${result.scores.S}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-quartz/80">Thinking</span>
                    <span className="text-mystic font-semibold">{result.scores.T}%</span>
                  </div>
                  <div className="w-full bg-galactic-light rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-mystic to-mystic-light h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${result.scores.T}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-quartz/80">Judging</span>
                    <span className="text-mint font-semibold">{result.scores.J}%</span>
                  </div>
                  <div className="w-full bg-galactic-light rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-mint to-mint-light h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${result.scores.J}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-galactic/50 rounded-lg">
                <p className="text-xs text-quartz/70">
                  Confidence Level: <span className="text-mint font-semibold">87%</span> 
                  <br />
                  <span className="text-quartz/50">Personalities can evolve and shift over time</span>
                </p>
              </div>
            </div>
          )}

          {/* Continue Button */}
          {showStats && (
            <Button 
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-mint to-mint-dark hover:from-mint-dark hover:to-mint text-galactic font-semibold py-4 text-lg animate-cosmic-glow transition-all duration-300 transform hover:scale-105"
            >
              Explore Your Galaxy
              <CircleArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TypeReveal;
