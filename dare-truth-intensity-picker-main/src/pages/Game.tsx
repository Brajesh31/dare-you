
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Users } from 'lucide-react';

const Game = () => {
  const { intensity = 'casual' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentMode, setCurrentMode] = useState<'truth' | 'dare' | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  
  // Get playerCount from state or default to 2
  const playerCount = location.state?.playerCount || 2;
  
  // Define background colors/gradients based on intensity
  const getBackgroundStyle = () => {
    switch (intensity) {
      case 'casual':
        return { 
          background: 'linear-gradient(135deg, rgba(46, 82, 137, 0.9) 0%, rgba(74, 192, 252, 0.7) 100%)'
        };
      case 'medium':
        return { 
          background: 'linear-gradient(135deg, rgba(95, 46, 137, 0.9) 0%, rgba(188, 74, 252, 0.7) 100%)'
        };
      case 'spicy':
        return { 
          background: 'linear-gradient(135deg, rgba(137, 46, 82, 0.9) 0%, rgba(220, 33, 136, 0.7) 100%)'
        };
      default:
        return {};
    }
  };
  
  const getTitle = () => {
    switch (intensity) {
      case 'casual':
        return 'Casual Mode';
      case 'medium':
        return 'Medium Mode';
      case 'spicy':
        return 'Spicy 18+ Mode';
      default:
        return 'Truth or Dare';
    }
  };

  const getButtonClass = () => {
    switch (intensity) {
      case 'casual':
        return 'from-blue-500 to-blue-600';
      case 'medium':
        return 'from-purple-500 to-pink-500';
      case 'spicy':
        return 'from-red-500 to-game-pink';
      default:
        return 'from-game-blue to-game-pink';
    }
  };

  const getCardGlow = () => {
    switch (intensity) {
      case 'casual':
        return 'shadow-[0_0_15px_rgba(74,192,252,0.7)]';
      case 'medium':
        return 'shadow-[0_0_15px_rgba(188,74,252,0.7)]';
      case 'spicy':
        return 'shadow-[0_0_15px_rgba(220,33,136,0.7)]';
      default:
        return 'shadow-[0_0_15px_rgba(74,192,252,0.7)]';
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentMode) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (values from -0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Convert to rotation degrees (limit to +/- 10 degrees)
    setCardRotation({
      x: -y * 10, // Inverted for natural feeling
      y: x * 10
    });
  };
  
  const resetCardRotation = () => {
    setCardRotation({ x: 0, y: 0 });
  };
  
  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev % playerCount) + 1);
    setCurrentMode(null);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8 transition-all duration-700"
      style={getBackgroundStyle()}
    >
      {/* Background blobs with enhanced blur */}
      <div className="blob-bg top-0 left-0 opacity-30 blur-2xl" />
      <div className="blob-bg bottom-0 right-0 opacity-30 blur-2xl" />
      
      {/* Magic sparkles (absolute positioned) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-white rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-white rounded-full animate-pulse opacity-60 animation-delay-200"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-70 animation-delay-500"></div>
        <div className="absolute bottom-1/4 right-1/5 w-2.5 h-2.5 bg-white rounded-full animate-pulse opacity-60 animation-delay-700"></div>
      </div>
      
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4 text-white" 
        onClick={() => navigate('/')}
        size="sm"
      >
        <ArrowLeft className="mr-1 h-3 w-3" />
        Back
      </Button>
      
      <div className="container max-w-md z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold gradient-text mb-2"
        >
          {getTitle()}
        </motion.h1>
        
        {/* Player indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6 inline-flex items-center bg-black bg-opacity-40 px-4 py-1.5 rounded-full border border-white/10 shadow-lg"
        >
          <Users className="mr-2 h-4 w-4 text-white/70" />
          <span className="text-white font-medium">Player {currentPlayer} of {playerCount}</span>
        </motion.div>
        
        {!currentMode ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <h2 className="text-xl text-white font-medium mb-6">Choose your challenge:</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={() => setCurrentMode('truth')}
                className={`h-20 text-lg font-bold rounded-xl bg-gradient-to-r ${getButtonClass()} hover:opacity-90 transform transition-transform hover:scale-105 shadow-lg hover:shadow-xl`}
              >
                <Sparkles className="mr-2 h-4 w-4" /> Truth
              </Button>
              
              <Button 
                onClick={() => setCurrentMode('dare')}
                className={`h-20 text-lg font-bold rounded-xl bg-gradient-to-r ${getButtonClass()} hover:opacity-90 transform transition-transform hover:scale-105 shadow-lg hover:shadow-xl`}
              >
                <Sparkles className="mr-2 h-4 w-4" /> Dare
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ perspective: "1000px" }}
            className="perspective-1000"
          >
            {/* 3D Magical Card */}
            <motion.div
              className={`relative w-full mx-auto mb-6 ${getCardGlow()}`}
              style={{ 
                transformStyle: "preserve-3d",
                transform: `rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
                transition: "transform 0.1s ease-out"
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetCardRotation}
              whileHover={{ scale: 1.02 }}
            >
              {/* Card background with magical glow effect */}
              <div className="relative rounded-xl overflow-hidden transform">
                {/* Card border gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-80"></div>
                
                {/* Card inner content */}
                <div className="relative bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-6 min-h-[200px]">
                  {/* Magical sparkle in top-right corner */}
                  <div className="absolute top-2 right-2 w-6 h-6">
                    <Sparkles className="w-full h-full text-white opacity-80" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 text-left">
                    {currentMode === 'truth' ? 'Truth' : 'Dare'}
                  </h3>
                  
                  <div className="my-6 text-left">
                    <p className="text-xl text-gray-200">
                      {currentMode === 'truth' 
                        ? "This is where your truth question would appear. For now, this is a placeholder."
                        : "This is where your dare challenge would appear. For now, this is a placeholder."
                      }
                    </p>
                  </div>
                  
                  {/* Magical shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setCurrentMode(null)}
                size="sm"
              >
                Go back
              </Button>
              <Button 
                className={`flex-1 bg-gradient-to-r ${getButtonClass()}`}
                onClick={() => setCurrentMode(currentMode)}
                size="sm"
              >
                New {currentMode}
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500"
                onClick={nextPlayer}
                size="sm"
              >
                Next Player
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Game;
