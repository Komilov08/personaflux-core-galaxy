import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

const lightningQuestions = [
  {
    id: 1,
    question: "At a party, you find yourself:",
    optionA: { text: "Energizing others with stories", dimension: "E", icon: "🎉" },
    optionB: { text: "Observing and absorbing the vibe", dimension: "I", icon: "👁️" }
  },
  {
    id: 2,
    question: "When making decisions, you prefer to:",
    optionA: { text: "Trust your gut instinct", dimension: "N", icon: "✨" },
    optionB: { text: "Analyze concrete facts", dimension: "S", icon: "📊" }
  },
  {
    id: 3,
    question: "In group projects, you naturally:",
    optionA: { text: "Focus on team harmony", dimension: "F", icon: "💝" },
    optionB: { text: "Prioritize logical efficiency", dimension: "T", icon: "⚡" }
  },
  {
    id: 4,
    question: "Your ideal weekend involves:",
    optionA: { text: "Planned activities with structure", dimension: "J", icon: "📅" },
    optionB: { text: "Spontaneous adventures", dimension: "P", icon: "🎲" }
  },
  {
    id: 5,
    question: "When learning something new:",
    optionA: { text: "You dive into possibilities", dimension: "N", icon: "🌌" },
    optionB: { text: "You master the basics first", dimension: "S", icon: "🔧" }
  },
  {
    id: 6,
    question: "Under pressure, you:",
    optionA: { text: "Seek social support", dimension: "E", icon: "🤝" },
    optionB: { text: "Retreat to think alone", dimension: "I", icon: "🧘" }
  },
  {
    id: 7,
    question: "You're drawn to:",
    optionA: { text: "Abstract theories and concepts", dimension: "N", icon: "🔮" },
    optionB: { text: "Practical, real-world applications", dimension: "S", icon: "🛠️" }
  },
  {
    id: 8,
    question: "When giving feedback:",
    optionA: { text: "You consider people's feelings", dimension: "F", icon: "💕" },
    optionB: { text: "You focus on objective truth", dimension: "T", icon: "🎯" }
  },
  {
    id: 9,
    question: "Your workspace is typically:",
    optionA: { text: "Organized and systematic", dimension: "J", icon: "📋" },
    optionB: { text: "Flexible and adaptable", dimension: "P", icon: "🌊" }
  },
  {
    id: 10,
    question: "In conversations, you:",
    optionA: { text: "Think out loud as you speak", dimension: "E", icon: "💬" },
    optionB: { text: "Reflect before responding", dimension: "I", icon: "💭" }
  },
  {
    id: 11,
    question: "You're motivated by:",
    optionA: { text: "Personal values and meaning", dimension: "F", icon: "🌟" },
    optionB: { text: "Logic and competence", dimension: "T", icon: "🏆" }
  },
  {
    id: 12,
    question: "Your approach to deadlines:",
    optionA: { text: "Plan early and stay ahead", dimension: "J", icon: "⏰" },
    optionB: { text: "Work best under pressure", dimension: "P", icon: "🚀" }
  }
];

const deepDiveQuestions = [
  {
    id: 1,
    question: "At a party, you find yourself:",
    optionA: { text: "Energizing others with stories", dimension: "E", icon: "🎉" },
    optionB: { text: "Observing and absorbing the vibe", dimension: "I", icon: "👁️" }
  },
  {
    id: 2,
    question: "When making decisions, you prefer to:",
    optionA: { text: "Trust your gut instinct", dimension: "N", icon: "✨" },
    optionB: { text: "Analyze concrete facts", dimension: "S", icon: "📊" }
  },
  {
    id: 3,
    question: "In group projects, you naturally:",
    optionA: { text: "Focus on team harmony", dimension: "F", icon: "💝" },
    optionB: { text: "Prioritize logical efficiency", dimension: "T", icon: "⚡" }
  },
  {
    id: 4,
    question: "Your ideal weekend involves:",
    optionA: { text: "Planned activities with structure", dimension: "J", icon: "📅" },
    optionB: { text: "Spontaneous adventures", dimension: "P", icon: "🎲" }
  },
  {
    id: 5,
    question: "When learning something new:",
    optionA: { text: "You dive into possibilities", dimension: "N", icon: "🌌" },
    optionB: { text: "You master the basics first", dimension: "S", icon: "🔧" }
  },
  {
    id: 6,
    question: "Under pressure, you:",
    optionA: { text: "Seek social support", dimension: "E", icon: "🤝" },
    optionB: { text: "Retreat to think alone", dimension: "I", icon: "🧘" }
  },
  {
    id: 7,
    question: "You're drawn to:",
    optionA: { text: "Abstract theories and concepts", dimension: "N", icon: "🔮" },
    optionB: { text: "Practical, real-world applications", dimension: "S", icon: "🛠️" }
  },
  {
    id: 8,
    question: "When giving feedback:",
    optionA: { text: "You consider people's feelings", dimension: "F", icon: "💕" },
    optionB: { text: "You focus on objective truth", dimension: "T", icon: "🎯" }
  },
  {
    id: 9,
    question: "Your workspace is typically:",
    optionA: { text: "Organized and systematic", dimension: "J", icon: "📋" },
    optionB: { text: "Flexible and adaptable", dimension: "P", icon: "🌊" }
  },
  {
    id: 10,
    question: "In conversations, you:",
    optionA: { text: "Think out loud as you speak", dimension: "E", icon: "💬" },
    optionB: { text: "Reflect before responding", dimension: "I", icon: "💭" }
  },
  {
    id: 11,
    question: "You're motivated by:",
    optionA: { text: "Personal values and meaning", dimension: "F", icon: "🌟" },
    optionB: { text: "Logic and competence", dimension: "T", icon: "🏆" }
  },
  {
    id: 12,
    question: "Your approach to deadlines:",
    optionA: { text: "Plan early and stay ahead", dimension: "J", icon: "⏰" },
    optionB: { text: "Work best under pressure", dimension: "P", icon: "🚀" }
  }
];

const QuizScreen = ({ onComplete, mode = 'lightning' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [auraIntensity, setAuraIntensity] = useState(0);

  const questions = mode === 'lightning' ? lightningQuestions : deepDiveQuestions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const intensityIncrement = 100 / questions.length;

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option.dimension;
    setAnswers(newAnswers);
    setAuraIntensity(((currentQuestion + 1) / questions.length) * 100);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate MBTI type
      const result = calculateMBTI(newAnswers);
      onComplete(result);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Update aura intensity based on current progress
      setAuraIntensity((currentQuestion / questions.length) * 100);
    }
  };

  const calculateMBTI = (answers) => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    answers.forEach(answer => counts[answer]++);

    const type = 
      (counts.E > counts.I ? 'E' : 'I') +
      (counts.S > counts.N ? 'S' : 'N') +
      (counts.T > counts.F ? 'T' : 'F') +
      (counts.J > counts.P ? 'J' : 'P');

    return {
      type,
      scores: {
        E: Math.round((counts.E / (counts.E + counts.I)) * 100),
        S: Math.round((counts.S / (counts.S + counts.N)) * 100),
        T: Math.round((counts.T / (counts.T + counts.F)) * 100),
        J: Math.round((counts.J / (counts.J + counts.P)) * 100)
      }
    };
  };

  const question = questions[currentQuestion];
  const canGoBack = currentQuestion > 0;
  const hasAnsweredCurrent = answers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic aura background */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-mystic/20 via-transparent to-transparent transition-all duration-1000"
        style={{ opacity: auraIntensity / 100 }}
      />

      <div className="max-w-md w-full space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-quartz/80 text-sm">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-galactic-light" />
          <div className="text-center text-xs text-quartz/60">
            {mode === 'lightning' ? 'Lightning Quiz' : 'Deep Dive Analysis'}
          </div>
        </div>

        {/* Navigation */}
        {canGoBack && (
          <div className="flex justify-start">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="icon"
              className="bg-galactic/30 border-mint/50 text-quartz hover:bg-mint/20 transition-all duration-300"
            >
              <CircleArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Question Card */}
        <Card className="bg-quartz/10 backdrop-blur-lg border-mystic/30 animate-scale-in">
          <div className="p-6 space-y-6 text-center">
            <h2 className="text-xl font-semibold text-quartz">
              {question.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-4">
              <Button
                onClick={() => handleAnswer(question.optionA)}
                className={`w-full h-auto p-6 border transition-all duration-300 hover:scale-105 ${
                  answers[currentQuestion] === question.optionA.dimension
                    ? 'bg-mint/40 border-mint text-quartz'
                    : 'bg-mint/20 hover:bg-mint/30 border-mint/50 text-quartz'
                } group`}
                variant="outline"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{question.optionA.icon}</span>
                  <span className="text-left flex-1">{question.optionA.text}</span>
                  <CircleArrowRight className="w-5 h-5 text-mint group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>

              <Button
                onClick={() => handleAnswer(question.optionB)}
                className={`w-full h-auto p-6 border transition-all duration-300 hover:scale-105 ${
                  answers[currentQuestion] === question.optionB.dimension
                    ? 'bg-mystic/40 border-mystic text-quartz'
                    : 'bg-mystic/20 hover:bg-mystic/30 border-mystic/50 text-quartz'
                } group`}
                variant="outline"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{question.optionB.icon}</span>
                  <span className="text-left flex-1">{question.optionB.text}</span>
                  <CircleArrowRight className="w-5 h-5 text-mystic group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
            </div>
          </div>
        </Card>

        {/* Aura visualization */}
        <div className="text-center">
          <div className="text-xs text-quartz/60">Your personality aura is forming...</div>
          <div className="flex justify-center mt-2">
            {[...Array(questions.length)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full mx-1 transition-all duration-500 ${
                  i < answers.filter(a => a !== undefined).length ? 'bg-mystic animate-aura-pulse' : 'bg-galactic-light/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
