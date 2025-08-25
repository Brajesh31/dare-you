
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

interface IntensityCardProps {
  title: string;
  description: string;
  intensity: "casual" | "medium" | "spicy";
  className?: string;
  compact?: boolean;
  playerCount?: number;
}

const IntensityCard = ({ title, description, intensity, className, compact = false, playerCount = 2 }: IntensityCardProps) => {
  const navigate = useNavigate();

  const getColors = () => {
    switch (intensity) {
      case "casual":
        return "from-blue-400 to-blue-500 hover:from-blue-300 hover:to-blue-400";
      case "medium":
        return "from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400";
      case "spicy":
        return "from-red-500 to-game-pink hover:from-red-400 hover:to-pink-400";
      default:
        return "from-game-blue to-game-pink";
    }
  };

  const handleClick = () => {
    navigate(`/game/${intensity}`, { state: { playerCount } });
  };

  return (
    <div 
      className={cn(
        "card-hover relative p-1 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-rotate-1",
        compact ? "w-full max-w-[260px] mx-auto" : "",
        className
      )}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getColors()} opacity-80 shadow-lg`}></div>
      <div className="relative flex flex-col h-full bg-black bg-opacity-80 rounded-lg p-4 space-y-3 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <h3 className={cn("font-bold text-white", compact ? "text-xl" : "text-2xl")}>{title}</h3>
          <div className="flex items-center">
            <Users className="text-white opacity-70 mr-1" size={18} />
            <span className="text-white text-sm opacity-70">{playerCount}</span>
          </div>
        </div>
        <p className={cn("text-gray-300 flex-grow", compact ? "text-sm" : "")}>{description}</p>
        <Button 
          onClick={handleClick}
          className="bg-white text-black hover:bg-gray-200 font-medium shadow-md hover:shadow-xl transition-all"
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default IntensityCard;
