
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GameIntro from '@/components/GameIntro';
import IntensityCard from '@/components/IntensityCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import { Users, UserMinus, UserPlus } from 'lucide-react';

const Index = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [playerCount, setPlayerCount] = useState(2);

  const intensityLevels = [
    {
      title: "Casual",
      description: "Light-hearted questions and dares for any occasion. Perfect for family gatherings or casual hangouts.",
      intensity: "casual" as const,
    },
    {
      title: "Medium",
      description: "A mix of fun and challenging questions and dares. Great for friends who know each other well.",
      intensity: "medium" as const,
    },
    {
      title: "Spicy 18+",
      description: "Daring and intense content for adults only. Only for those brave enough to try!",
      intensity: "spicy" as const,
    },
  ];

  const increasePlayerCount = () => {
    if (playerCount < 10) {
      setPlayerCount(playerCount + 1);
    }
  };

  const decreasePlayerCount = () => {
    if (playerCount > 2) {
      setPlayerCount(playerCount - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8">
      {/* Background blobs with 3D effect */}
      <div className="blob-bg top-0 left-0 opacity-30 blur-2xl" />
      <div className="blob-bg bottom-0 right-0 opacity-30 blur-2xl" />
      
      {/* Content */}
      <div className="container max-w-4xl z-10">
        <GameIntro 
          title="Truth or Dare"
          subtitle="Choose your intensity level and get ready to play!"
        />

        {/* Player count selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center items-center mb-8 bg-black bg-opacity-40 rounded-xl p-3 backdrop-blur-sm border border-white/10 shadow-xl max-w-xs mx-auto"
        >
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={decreasePlayerCount}
              disabled={playerCount <= 2}
              className="h-8 w-8 rounded-full border-white/20 bg-black/40 text-white hover:bg-black/60"
            >
              <UserMinus size={16} />
            </Button>
            
            <div className="flex items-center space-x-2">
              <Users className="text-white" size={20} />
              <span className="text-white font-bold text-lg">{playerCount} Players</span>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={increasePlayerCount}
              disabled={playerCount >= 10}
              className="h-8 w-8 rounded-full border-white/20 bg-black/40 text-white hover:bg-black/60"
            >
              <UserPlus size={16} />
            </Button>
          </div>
        </motion.div>

        {isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {intensityLevels.map((level) => (
                  <CarouselItem key={level.intensity}>
                    <IntensityCard 
                      title={level.title}
                      description={level.description}
                      intensity={level.intensity}
                      compact={true}
                      playerCount={playerCount}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="static transform-none mx-2" />
                <CarouselNext className="static transform-none mx-2" />
              </div>
            </Carousel>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {intensityLevels.map((level) => (
              <IntensityCard 
                key={level.intensity}
                title={level.title}
                description={level.description}
                intensity={level.intensity}
                className="h-full"
                playerCount={playerCount}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
