
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowRight, Award, Briefcase, Users, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TypeReveal = ({ result, onContinue }) => {
  const [showDetails, setShowDetails] = useState('traits');
  const { type, scores, typeData } = result;

  const getBarColor = (dimension) => {
    switch(dimension) {
      case 'I': case 'E': return 'from-mint to-mint-dark';
      case 'S': case 'N': return 'from-mystic to-mystic-dark';
      case 'T': case 'F': return 'from-quartz to-quartz-dark';
      case 'J': case 'P': return 'from-galactic-light to-galactic';
      default: return '';
    }
  };

  // Calculate the dominant traits
  const dominantTraits = {
    energy: scores.E >= 50 ? 'E' : 'I',
    information: scores.S >= 50 ? 'S' : 'N',
    decisions: scores.T >= 50 ? 'T' : 'F',
    lifestyle: scores.J >= 50 ? 'J' : 'P'
  };

  // Type descriptions
  const typeDescriptions = {
    I: "Introversion: You gain energy from quiet reflection and solitude.",
    E: "Extraversion: You gain energy from engaging with the external world.",
    S: "Sensing: You focus on concrete facts and details in the present.",
    N: "iNtuition: You focus on patterns, possibilities and the big picture.",
    T: "Thinking: You make decisions based on logic and objective analysis.",
    F: "Feeling: You make decisions based on personal values and empathy.",
    J: "Judging: You prefer structure, planning, and organization.",
    P: "Perceiving: You prefer flexibility, spontaneity, and adaptability."
  };

  const getCognitiveFunctions = (mbtiType) => {
    const functionMap = {
      'ISTJ': ['Si', 'Te', 'Fi', 'Ne'],
      'ISFJ': ['Si', 'Fe', 'Ti', 'Ne'],
      'INFJ': ['Ni', 'Fe', 'Ti', 'Se'],
      'INTJ': ['Ni', 'Te', 'Fi', 'Se'],
      'ISTP': ['Ti', 'Se', 'Ni', 'Fe'],
      'ISFP': ['Fi', 'Se', 'Ni', 'Te'],
      'INFP': ['Fi', 'Ne', 'Si', 'Te'],
      'INTP': ['Ti', 'Ne', 'Si', 'Fe'],
      'ESTP': ['Se', 'Ti', 'Fe', 'Ni'],
      'ESFP': ['Se', 'Fi', 'Te', 'Ni'],
      'ENFP': ['Ne', 'Fi', 'Te', 'Si'],
      'ENTP': ['Ne', 'Ti', 'Fe', 'Si'],
      'ESTJ': ['Te', 'Si', 'Ne', 'Fi'],
      'ESFJ': ['Fe', 'Si', 'Ne', 'Ti'],
      'ENFJ': ['Fe', 'Ni', 'Se', 'Ti'],
      'ENTJ': ['Te', 'Ni', 'Se', 'Fi']
    };
    
    return functionMap[mbtiType] || [];
  };

  const functionDescriptions = {
    'Ni': "Introverted Intuition - Foreseeing implications and transformations",
    'Ne': "Extraverted Intuition - Generating possibilities and connections",
    'Si': "Introverted Sensing - Recalling and comparing concrete details",
    'Se': "Extraverted Sensing - Experiencing and engaging with immediate context",
    'Ti': "Introverted Thinking - Analyzing and categorizing information",
    'Te': "Extraverted Thinking - Organizing and structuring the environment",
    'Fi': "Introverted Feeling - Evaluating importance and making value judgments",
    'Fe': "Extraverted Feeling - Connecting with and accommodating others"
  };

  const functions = getCognitiveFunctions(type);

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

      <Card className="max-w-2xl w-full bg-quartz/10 backdrop-blur-lg border-mystic/30 shadow-2xl animate-fade-in">
        <CardHeader className="text-center">
          <div className="relative mx-auto w-16 h-16 mb-2">
            <div className="absolute inset-0 bg-gradient-to-r from-mystic to-mint rounded-full animate-aura-pulse" />
            <div className="absolute inset-2 bg-galactic rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-mystic" />
            </div>
          </div>
          
          <CardTitle className="text-3xl font-bold text-quartz">
            You are <span className="bg-gradient-to-r from-mint to-mystic bg-clip-text text-transparent">{type}</span>
          </CardTitle>
          
          <CardDescription className="text-quartz/80 text-lg">
            {typeData?.title || "The Personality Type"}
          </CardDescription>
        </CardHeader>

        <Tabs value={showDetails} onValueChange={setShowDetails} className="w-full">
          <TabsList className="grid grid-cols-4 mx-6 mb-4">
            <TabsTrigger value="traits" className="text-quartz/80">Traits</TabsTrigger>
            <TabsTrigger value="careers" className="text-quartz/80">Careers</TabsTrigger>
            <TabsTrigger value="famous" className="text-quartz/80">Famous</TabsTrigger>
            <TabsTrigger value="functions" className="text-quartz/80">Functions</TabsTrigger>
          </TabsList>
          
          <CardContent className="space-y-6">
            <TabsContent value="traits" className="space-y-6 mt-0">
              {/* Personality Bars */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-quartz/80 text-sm">
                    <span>Introversion (I)</span>
                    <span>Extraversion (E)</span>
                  </div>
                  <div className="h-3 w-full bg-galactic/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getBarColor(dominantTraits.energy)}`}
                      style={{ width: `${scores.E}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-quartz/60 text-center">
                    {typeDescriptions[dominantTraits.energy]}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-quartz/80 text-sm">
                    <span>Sensing (S)</span>
                    <span>iNtuition (N)</span>
                  </div>
                  <div className="h-3 w-full bg-galactic/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getBarColor(dominantTraits.information)}`}
                      style={{ width: `${scores.S}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-quartz/60 text-center">
                    {typeDescriptions[dominantTraits.information]}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-quartz/80 text-sm">
                    <span>Thinking (T)</span>
                    <span>Feeling (F)</span>
                  </div>
                  <div className="h-3 w-full bg-galactic/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getBarColor(dominantTraits.decisions)}`}
                      style={{ width: `${scores.T}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-quartz/60 text-center">
                    {typeDescriptions[dominantTraits.decisions]}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-quartz/80 text-sm">
                    <span>Judging (J)</span>
                    <span>Perceiving (P)</span>
                  </div>
                  <div className="h-3 w-full bg-galactic/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getBarColor(dominantTraits.lifestyle)}`}
                      style={{ width: `${scores.J}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-quartz/60 text-center">
                    {typeDescriptions[dominantTraits.lifestyle]}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="careers" className="mt-0">
              <div className="space-y-4 text-quartz/90">
                <div className="flex items-center space-x-3 mb-4">
                  <Briefcase className="w-5 h-5 text-mint" />
                  <h3 className="text-lg font-medium">Recommended Careers</h3>
                </div>
                
                {typeData?.careers && (
                  <div className="grid grid-cols-2 gap-3">
                    {typeData.careers.map((career, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-mystic" />
                        <span>{career}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {!typeData?.careers && (
                  <p className="text-quartz/70">Career information not available for this type.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="famous" className="space-y-6 mt-0">
              {/* Famous People */}
              <div className="space-y-4 text-quartz/90">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-mint" />
                  <h3 className="text-lg font-medium">Famous People</h3>
                </div>
                
                {typeData?.celebrities && (
                  <ul className="list-disc pl-6 space-y-1">
                    {typeData.celebrities.map((celebrity, index) => (
                      <li key={index}>{celebrity}</li>
                    ))}
                  </ul>
                )}
                
                {!typeData?.celebrities && (
                  <p className="text-quartz/70">Celebrity information not available.</p>
                )}
              </div>
              
              {/* Fictional Characters */}
              <div className="space-y-4 text-quartz/90">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-mint" />
                  <h3 className="text-lg font-medium">Fictional Characters</h3>
                </div>
                
                {typeData?.characters && (
                  <ul className="list-disc pl-6 space-y-1">
                    {typeData.characters.map((character, index) => (
                      <li key={index}>{character}</li>
                    ))}
                  </ul>
                )}
                
                {!typeData?.characters && (
                  <p className="text-quartz/70">Character information not available.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="functions" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Brain className="w-5 h-5 text-mint" />
                  <h3 className="text-lg font-medium text-quartz">Cognitive Functions</h3>
                </div>
                
                <div className="space-y-3">
                  {functions.map((func, index) => (
                    <div key={index} className="border border-mystic/30 rounded-md p-3">
                      <div className="font-semibold text-quartz mb-1 flex items-center">
                        <span className={`inline-block w-6 h-6 rounded-full ${index === 0 ? 'bg-mint/80' : index === 1 ? 'bg-mystic/80' : index === 2 ? 'bg-mint/50' : 'bg-mystic/50'} flex items-center justify-center mr-2 text-xs`}>
                          {index + 1}
                        </span>
                        {func}
                      </div>
                      <div className="text-sm text-quartz/70">
                        {functionDescriptions[func]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>

        <CardFooter className="flex justify-center pt-2 pb-6">
          <Button 
            onClick={onContinue}
            className="bg-gradient-to-r from-mystic to-mystic-dark hover:from-mystic-dark hover:to-mystic text-white"
          >
            Continue to Galaxy Map
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TypeReveal;
