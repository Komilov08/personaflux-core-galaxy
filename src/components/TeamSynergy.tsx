
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, CircleArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';

const teammateSuggestions = ['INTJ', 'ESFJ', 'ISTP', 'ENFJ', 'ISTJ'];

const compatibilityMatrix = {
  'ENFP-INTJ': { score: 85, dynamic: 'Creative Vision + Strategic Planning' },
  'ENFP-ESFJ': { score: 70, dynamic: 'Enthusiasm + Practical Support' },
  'ENFP-ISTP': { score: 60, dynamic: 'Ideas + Implementation' },
  'ENFP-ENFJ': { score: 80, dynamic: 'Shared Values + Complementary Skills' },
  'ENFP-ISTJ': { score: 55, dynamic: 'Innovation vs Structure Tension' }
};

const getCompatibility = (type1, type2) => {
  const key1 = `${type1}-${type2}`;
  const key2 = `${type2}-${type1}`;
  return compatibilityMatrix[key1] || compatibilityMatrix[key2] || { score: 65, dynamic: 'Balanced Partnership' };
};

const getRoleRecommendation = (type) => {
  const roles = {
    'ENFP': 'Brainstorming Lead & Team Motivator',
    'INFP': 'Creative Consultant & Values Keeper',
    'ENFJ': 'Team Facilitator & People Manager',
    'INFJ': 'Strategic Advisor & Quality Assurance',
    'ENTP': 'Innovation Driver & Problem Solver',
    'INTP': 'Research Lead & Technical Analyst',
    'ENTJ': 'Project Director & Decision Maker',
    'INTJ': 'Strategic Planner & Systems Designer',
    'ESFP': 'Team Ambassador & Morale Booster',
    'ISFP': 'Creative Specialist & Harmony Keeper',
    'ESFJ': 'Operations Manager & Team Supporter',
    'ISFJ': 'Detail Coordinator & Process Manager',
    'ESTP': 'Action Catalyst & Crisis Manager',
    'ISTP': 'Technical Expert & Problem Fixer',
    'ESTJ': 'Team Leader & Execution Manager',
    'ISTJ': 'Quality Controller & Documentation Lead'
  };
  return roles[type] || 'Team Contributor';
};

const TeamSynergy = ({ result, onBack }) => {
  const [teammates, setTeammates] = useState([]);
  const [newTeammate, setNewTeammate] = useState('');

  const addTeammate = (type) => {
    if (type && !teammates.includes(type) && type !== result.type) {
      setTeammates([...teammates, type]);
      setNewTeammate('');
    }
  };

  const removeTeammate = (type) => {
    setTeammates(teammates.filter(t => t !== type));
  };

  const getTeamCompatibilityScore = () => {
    if (teammates.length === 0) return 0;
    const scores = teammates.map(teammate => getCompatibility(result.type, teammate).score);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getTeamWarnings = () => {
    const warnings = [];
    const thinkingTypes = teammates.filter(t => t.includes('T')).length + (result.type.includes('T') ? 1 : 0);
    const feelingTypes = teammates.filter(t => t.includes('F')).length + (result.type.includes('F') ? 1 : 0);
    
    if (thinkingTypes === 0) warnings.push('Consider adding a Thinking type for objective analysis');
    if (feelingTypes === 0) warnings.push('Consider adding a Feeling type for team harmony');
    if (teammates.every(t => t.startsWith('I')) && result.type.startsWith('I')) {
      warnings.push('Team may need more extraverted energy for external communication');
    }
    
    return warnings;
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          onClick={onBack}
          variant="outline"
          className="border-mystic/50 text-quartz hover:bg-mystic/20"
        >
          <CircleArrowLeft className="mr-2 w-4 h-4" />
          Back to Galaxy
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-quartz bg-gradient-to-r from-mystic to-mint bg-clip-text text-transparent">
            Team Synergy Portal
          </h1>
        </div>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Add Teammates */}
      <Card className="bg-quartz/10 backdrop-blur-lg border-mystic/30">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-quartz flex items-center">
            <Users className="w-5 h-5 mr-2 text-mystic" />
            Build Your Team
          </h2>
          
          <div className="flex gap-2">
            <Input
              placeholder="Enter MBTI type (e.g., INTJ)"
              value={newTeammate}
              onChange={(e) => setNewTeammate(e.target.value.toUpperCase())}
              className="bg-galactic/30 border-mystic/30 text-quartz"
            />
            <Button 
              onClick={() => addTeammate(newTeammate)}
              className="bg-mystic hover:bg-mystic-dark text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-quartz/70">Quick add suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {teammateSuggestions.map(type => (
                <Button
                  key={type}
                  onClick={() => addTeammate(type)}
                  variant="outline"
                  size="sm"
                  className="border-mint/50 text-quartz hover:bg-mint/20"
                  disabled={teammates.includes(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Team Overview */}
      <Card className="bg-quartz/10 backdrop-blur-lg border-mystic/30">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-quartz">Your Team</h2>
            {teammates.length > 0 && (
              <Badge className={`${getTeamCompatibilityScore() > 75 ? 'bg-mint' : getTeamCompatibilityScore() > 60 ? 'bg-mystic' : 'bg-galactic-light'} text-white`}>
                {getTeamCompatibilityScore()}% Compatibility
              </Badge>
            )}
          </div>

          {teammates.length === 0 ? (
            <div className="text-center py-8 text-quartz/60">
              Add teammates to see team dynamics and compatibility analysis
            </div>
          ) : (
            <div className="space-y-4">
              {/* Team Member Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Your card */}
                <div className="p-4 bg-mystic/20 rounded-lg border border-mystic/30">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-mystic text-white">You</Badge>
                    <span className="font-semibold text-quartz">{result.type}</span>
                  </div>
                  <p className="text-sm text-quartz/80">{getRoleRecommendation(result.type)}</p>
                </div>

                {/* Teammate cards */}
                {teammates.map(teammate => {
                  const compatibility = getCompatibility(result.type, teammate);
                  return (
                    <div key={teammate} className="p-4 bg-mint/20 rounded-lg border border-mint/30">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-mint text-galactic">Teammate</Badge>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-quartz">{teammate}</span>
                          <Button
                            onClick={() => removeTeammate(teammate)}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-quartz/60 hover:text-mystic"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-quartz/80 mb-2">{getRoleRecommendation(teammate)}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-mint/50 text-quartz">
                          {compatibility.score}% match
                        </Badge>
                      </div>
                      <p className="text-xs text-quartz/70 mt-1">{compatibility.dynamic}</p>
                    </div>
                  );
                })}
              </div>

              {/* Team Insights */}
              <div className="space-y-4">
                <h3 className="font-semibold text-quartz">Team Insights</h3>
                
                {getTeamWarnings().length > 0 && (
                  <div className="space-y-2">
                    {getTeamWarnings().map((warning, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-mystic/10 rounded-lg border border-mystic/20">
                        <AlertTriangle className="w-4 h-4 text-mystic mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-quartz/80">{warning}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-3 bg-mint/10 rounded-lg border border-mint/20">
                    <CheckCircle className="w-4 h-4 text-mint mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-quartz/80">
                      As an {result.type}, you should lead brainstorming sessions and keep team energy high
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2 p-3 bg-mint/10 rounded-lg border border-mint/20">
                    <CheckCircle className="w-4 h-4 text-mint mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-quartz/80">
                      Your team has a good balance of idea generation and practical implementation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Export Options */}
      {teammates.length > 0 && (
        <Card className="bg-quartz/10 backdrop-blur-lg border-mystic/30">
          <div className="p-6 space-y-4">
            <h3 className="font-semibold text-quartz">Export Team Analysis</h3>
            <div className="flex gap-2">
              <Button 
                className="bg-mint hover:bg-mint-dark text-galactic"
                onClick={() => {
                  // Simple export functionality
                  const teamData = {
                    leader: result.type,
                    teammates: teammates,
                    compatibility: getTeamCompatibilityScore(),
                    recommendations: getTeamWarnings()
                  };
                  console.log('Team Analysis:', teamData);
                  alert('Team analysis logged to console (in a real app, this would export to PDF)');
                }}
              >
                Export for Teacher
              </Button>
              <Button 
                variant="outline"
                className="border-mystic/50 text-quartz hover:bg-mystic/20"
                onClick={() => {
                  navigator.share?.({
                    title: 'My PersonaFlux Team Analysis',
                    text: `Check out our team compatibility: ${getTeamCompatibilityScore()}% match!`,
                    url: window.location.href
                  }).catch(() => {
                    // Fallback for browsers without Web Share API
                    navigator.clipboard.writeText(`My team compatibility: ${getTeamCompatibilityScore()}% match! ${window.location.href}`);
                    alert('Team analysis copied to clipboard!');
                  });
                }}
              >
                Share Results
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TeamSynergy;
