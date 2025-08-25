import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import { IntensityLevel } from '@/lib/questionService';

interface IntensityCardProps {
  title: string;
  description: string;
  intensity: IntensityLevel;
  compact?: boolean;
  className?: string;
  playerCount: number;
}

const IntensityCard: React.FC<IntensityCardProps> = ({ 
  title, 
  description, 
  intensity,
  compact = false,
  className = '',
  playerCount
}) => {
  const navigate = useNavigate();
  
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'casual': return 'from-blue-400 to-blue-600';
      case 'medium': return 'from-amber-400 to-amber-600';
      case 'spicy': return 'from-red-400 to-red-600';
      case 'extreme': return 'from-purple-400 to-pink-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getIconColor = (intensity: string) => {
    switch (intensity) {
      case 'casual': return 'text-blue-300';
      case 'medium': return 'text-amber-300';
      case 'spicy': return 'text-red-300';
      case 'extreme': return 'text-purple-300';
      default: return 'text-blue-300';
    }
  };

  const handleClick = () => {
    navigate('/game', { 
      state: { 
        intensity, 
        playerCount 
      }
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "rounded-xl overflow-hidden cursor-pointer relative",
        "border border-white/10 shadow-lg",
        "backdrop-blur-sm bg-black/40",
        className
      )}
      onClick={handleClick}
    >
      {/* Card header gradient */}
      <div className={`h-2 w-full bg-gradient-to-r ${getIntensityColor(intensity)}`}></div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {!compact && (
            <p className="text-gray-300 mt-2 text-sm">{description}</p>
          )}
        </div>
        
        {/* Magical blob in bottom right */}
        <div 
          className={`absolute bottom-0 right-0 w-24 h-24 rounded-tl-full blur-xl opacity-20 bg-gradient-to-tl ${getIntensityColor(intensity)}`}
        ></div>
      </div>
    </motion.div>
  );
};

export default IntensityCard;
