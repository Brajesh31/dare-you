import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import GameIntro from '@/components/GameIntro';
import IntensityCard from '@/components/IntensityCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import { Users, UserMinus, UserPlus } from 'lucide-react';

const StyledWrapper = styled.div`
  .btn-conteiner {
    display: flex;
    justify-content: center;
    --color-text: #ffffff;
    --color-background: #ff135a;
    --color-outline: #ff145b80;
    --color-shadow: #00000080;
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
  }

  .btn-content {
    display: flex;
    align-items: center;
    padding: 13px 22px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 30px;
    color: var(--color-text);
    background: var(--color-background);
    transition: 1s;
    border-radius: 100px;
    box-shadow: 0 0 0.2em 0 var(--color-background);
  }

  .btn-content:hover, .btn-content:focus {
    transition: 0.5s;
    -webkit-animation: btn-content 1s;
    animation: btn-content 1s;
    outline: 0.1em solid transparent;
    outline-offset: 0.2em;
    box-shadow: 0 0 0.4em 0 var(--color-background);
  }

  .btn-content .icon-arrow {
    transition: 0.5s;
    margin-right: 0px;
    transform: scale(0.6);
  }

  .btn-content:hover .icon-arrow {
    transition: 0.5s;
    margin-right: 25px;
  }

  .icon-arrow {
    width: 20px;
    margin-left: 8px;
    position: relative;
    top: 6%;
  }

  /* SVG */
  #arrow-icon-one {
    transition: 0.4s;
    transform: translateX(-60%);
  }

  #arrow-icon-two {
    transition: 0.5s;
    transform: translateX(-30%);
  }

  .btn-content:hover #arrow-icon-three {
    animation: color_anim 1s infinite 0.2s;
  }

  .btn-content:hover #arrow-icon-one {
    transform: translateX(0%);
    animation: color_anim 1s infinite 0.6s;
  }

  .btn-content:hover #arrow-icon-two {
    transform: translateX(0%);
    animation: color_anim 1s infinite 0.4s;
  }

  /* SVG animations */
  @keyframes color_anim {
    0% {
      fill: white;
    }

    50% {
      fill: var(--color-background);
    }

    100% {
      fill: white;
    }
  }

  /* Button animations */
  @-webkit-keyframes btn-content {
    0% {
      outline: 0.2em solid var(--color-background);
      outline-offset: 0;
    }
  }

  @keyframes btn-content {
    0% {
      outline: 0.2em solid var(--color-background);
      outline-offset: 0;
    }
  }
`;

const AnimatedButton = ({ onClick }) => {
  return (
    <div className="btn-conteiner">
      <a className="btn-content" href="#" onClick={onClick}>
        <span className="icon-arrow">
          <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="arrow" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
              <path id="arrow-icon-one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF" />
              <path id="arrow-icon-two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF" />
              <path id="arrow-icon-three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF" />
            </g>
          </svg>
        </span> 
      </a>
    </div>
  );
};

const Index = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [playerCount, setPlayerCount] = useState(2);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

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
    {
      title: "Extreme 21+",
      description: "No-holds-barred, boundary-pushing questions and dares. Only for the bravest players!",
      intensity: "extreme" as const,
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

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    carouselApi?.scrollNext();
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
            <Carousel 
              className="w-full max-w-xs mx-auto"
              setApi={setCarouselApi}
            >
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
            </Carousel>
            <StyledWrapper>
              <AnimatedButton onClick={handleNext} />
            </StyledWrapper>
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
