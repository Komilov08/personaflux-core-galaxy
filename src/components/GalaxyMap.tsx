
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Brain, CircleArrowUp, CircleArrowDown } from 'lucide-react';

const cognitiveFunctions = {
  'ENFP': { dominant: 'Ne', auxiliary: 'Fi', tertiary: 'Te', inferior: 'Si' },
  'INFP': { dominant: 'Fi', auxiliary: 'Ne', tertiary: 'Si', inferior: 'Te' },
  'ENFJ': { dominant: 'Fe', auxiliary: 'Ni', tertiary: 'Se', inferior: 'Ti' },
  'INFJ': { dominant: 'Ni', auxiliary: 'Fe', tertiary: 'Ti', inferior: 'Se' },
  'ENTP': { dominant: 'Ne', auxiliary: 'Ti', tertiary: 'Fe', inferior: 'Si' },
  'INTP': { dominant: 'Ti', auxiliary: 'Ne', tertiary: 'Si', inferior: 'Fe' },
  'ENTJ': { dominant: 'Te', auxiliary: 'Ni', tertiary: 'Se', inferior: 'Fi' },
  'INTJ': { dominant: 'Ni', auxiliary: 'Te', tertiary: 'Fi', inferior: 'Se' },
  'ESFP': { dominant: 'Se', auxiliary: 'Fi', tertiary: 'Te', inferior: 'Ni' },
  'ISFP': { dominant: 'Fi', auxiliary: 'Se', tertiary: 'Ni', inferior: 'Te' },
  'ESFJ': { dominant: 'Fe', auxiliary: 'Si', tertiary: 'Ne', inferior: 'Ti' },
  'ISFJ': { dominant: 'Si', auxiliary: 'Fe', tertiary: 'Ti', inferior: 'Ne' },
  'ESTP': { dominant: 'Se', auxiliary: 'Ti', tertiary: 'Fe', inferior: 'Ni' },
  'ISTP': { dominant: 'Ti', auxiliary: 'Se', tertiary: 'Ni', inferior: 'Fe' },
  'ESTJ': { dominant: 'Te', auxiliary: 'Si', tertiary: 'Ne', inferior: 'Fi' },
  'ISTJ': { dominant: 'Si', auxiliary: 'Te', tertiary: 'Fi', inferior: 'Ne' }
};

const contextualBehaviors = {
  teams: {
    title: "In Teams",
    behaviors: {
      'ENFP': "Natural brainstormer who energizes the group with creative ideas and enthusiasm",
      'INFP': "Brings unique perspectives and advocates for team values and harmony",
      'ENFJ': "Facilitates collaboration and ensures everyone feels heard and valued",
      'INFJ': "Provides strategic vision and helps the team align on long-term goals"
    }
  },
  stress: {
    title: "Under Stress",
    behaviors: {
      'ENFP': "May become scattered, overwhelmed by details, or withdraw from social situations",
      'INFP': "Becomes overly critical of self and others, may isolate or become stubborn",
      'ENFJ': "Takes on too much responsibility, may become controlling or self-critical",
      'INFJ': "Overthinks decisions, becomes perfectionist, or retreats into solitude"
    }
  },
  learning: {
    title: "When Learning",
    behaviors: {
      'ENFP': "Thrives with interactive, discussion-based learning and real-world applications",
      'INFP': "Prefers self-directed learning that connects to personal interests and values",
      'ENFJ': "Learns best through teaching others and collaborative group projects",
      'INFJ': "Enjoys deep, theoretical learning with time for reflection and synthesis"
    }
  }
};

const GalaxyMap = ({ result, onTeamMode }) => {
  const [selectedContext, setSelectedContext] = useState('teams');
  const functions = cognitiveFunctions[result.type];
  const behavior = contextualBehaviors[selectedContext]?.behaviors[result.type] || 
    "Explore different contexts to see how your personality manifests in various situations.";

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-quartz bg-gradient-to-r from-mystic to-mint bg-clip-text text-transparent">
          Your PersonaFlux Galaxy
        </h1>
        <p className="text-quartz/80">Explore your cognitive functions and contextual behaviors</p>
      </div>

      {/* Cognitive Function Stack */}
      <Card className="bg-quartz/10 backdrop-blur-lg border-mystic/30">
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-quartz flex items-center">
            <Brain className="w-5 h-5 mr-2 text-mystic" />
            Cognitive Function Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-mystic/20 rounded-lg border border-mystic/30">
                <div>
                  <Badge className="bg-mystic text-white mb-2">Dominant</Badge>
                  <div className="text-lg font-semibold text-quartz">{functions.dominant}</div>
                </div>
                <CircleArrowUp className="w-6 h-6 text-mystic" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-mint/20 rounded-lg border border-mint/30">
                <div>
                  <Badge className="bg-mint text-galactic mb-2">Auxiliary</Badge>
                  <div className="text-lg font-semibold text-quartz">{functions.auxiliary}</div>
                </div>
                <CircleArrowUp className="w-6 h-6 text-mint" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-quartz/20 rounded-lg border border-quartz/30">
                <div>
                  <Badge className="bg-quartz/80 text-galactic mb-2">Tertiary</Badge>
                  <div className="text-lg font-semibold text-quartz">{functions.tertiary}</div>
                </div>
                <CircleArrowDown className="w-6 h-6 text-quartz/80" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-galactic-light/40 rounded-lg border border-galactic-light/50">
                <div>
                  <Badge className="bg-galactic-light text-white mb-2">Inferior</Badge>
                  <div className="text-lg font-semibold text-quartz">{functions.inferior}</div>
                </div>
                <CircleArrowDown className="w-6 h-6 text-galactic-light" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Contextual Behavior */}
      <Card className="bg-quartz/10 backdrop-blur-lg border-mystic/30">
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-quartz">Contextual Behaviors</h2>
          
          {/* Context Selector */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(contextualBehaviors).map(([key, context]) => (
              <Button
                key={key}
                onClick={() => setSelectedContext(key)}
                variant={selectedContext === key ? "default" : "outline"}
                className={selectedContext === key ? 
                  "bg-mystic hover:bg-mystic-dark text-white" : 
                  "border-mystic/50 text-quartz hover:bg-mystic/20"
                }
              >
                {context.title}
              </Button>
            ))}
          </div>

          {/* Behavior Description */}
          <div className="p-4 bg-galactic/30 rounded-lg">
            <h3 className="font-semibold text-quartz mb-2">
              {contextualBehaviors[selectedContext]?.title}
            </h3>
            <p className="text-quartz/80 leading-relaxed">{behavior}</p>
          </div>
        </div>
      </Card>

      {/* MBTI Galaxy Map */}
      <Card className="bg-quartz/10 backdrop-blur-lg border-mystic/30">
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-quartz">Your Position in the MBTI Galaxy</h2>
          
          <div className="relative bg-galactic/50 rounded-lg p-8 min-h-64">
            {/* Current type - center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-r from-mystic to-mint rounded-full flex items-center justify-center text-white font-bold text-lg animate-aura-pulse shadow-lg">
                {result.type}
              </div>
              <div className="text-center text-xs text-quartz/80 mt-2">You</div>
            </div>

            {/* Neighboring types */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-quartz/30 rounded-full flex items-center justify-center text-quartz/80 text-sm">
                {result.type.slice(0,3) + (result.type[3] === 'J' ? 'P' : 'J')}
              </div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-quartz/30 rounded-full flex items-center justify-center text-quartz/80 text-sm">
                {result.type.slice(0,2) + (result.type[2] === 'T' ? 'F' : 'T') + result.type[3]}
              </div>
            </div>

            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <div className="w-12 h-12 bg-quartz/30 rounded-full flex items-center justify-center text-quartz/80 text-sm">
                {(result.type[0] === 'E' ? 'I' : 'E') + result.type.slice(1)}
              </div>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <div className="w-12 h-12 bg-quartz/30 rounded-full flex items-center justify-center text-quartz/80 text-sm">
                {result.type[0] + (result.type[1] === 'S' ? 'N' : 'S') + result.type.slice(2)}
              </div>
            </div>
          </div>

          <p className="text-sm text-quartz/70 text-center">
            Gray circles show neighboring personality types. Hover to explore similarities and differences.
          </p>
        </div>
      </Card>

      {/* Team Mode Button */}
      <div className="text-center">
        <Button 
          onClick={onTeamMode}
          className="bg-gradient-to-r from-mint to-mint-dark hover:from-mint-dark hover:to-mint text-galactic font-semibold py-4 px-8 text-lg animate-cosmic-glow transition-all duration-300 transform hover:scale-105"
        >
          <Users className="mr-2 w-5 h-5" />
          Explore Team Synergy
        </Button>
      </div>
    </div>
  );
};

export default GalaxyMap;
