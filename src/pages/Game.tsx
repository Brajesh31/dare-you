import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Button } from '@/components/ui/button';
import QuestionCard from '@/components/QuestionCard';
import { getRandomQuestion, QuestionType, IntensityLevel } from '@/lib/questionService';
import SwipeHandler from '../components/SwipeHandler';
import HexLoader from '@/components/HexLoader';

const StyledWrapper = styled.div<{ intensity: IntensityLevel }>`
  .min-h-screen {
    background: ${props => {
      switch (props.intensity) {
        case 'casual':
          return '#2a1a30';
        case 'medium':
          return '#321a2e';
        case 'spicy':
          return '#3a1a26';
        case 'extreme':
          return '#3f1520';
        default:
          return '#2a1a30';
      }
    }};
    color: #fff;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    margin-top: 2rem;
    width: 100%;
    max-width: 300px;
  }

  .button-truth, .button-dare {
    font-weight: bold;
    padding: 0.8rem 1.5rem;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 
      6px 6px 12px rgba(0, 0, 0, 0.25),
      -6px -6px 12px rgba(255, 255, 255, 0.1),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
  }

  .button-truth {
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return 'linear-gradient(135deg, #3a2045 0%, #4e2a5a 100%)';
        case 'medium': return 'linear-gradient(135deg, #4e2045 0%, #602a58 100%)';
        case 'spicy': return 'linear-gradient(135deg, #5e2035 0%, #702a45 100%)';
        case 'extreme': return 'linear-gradient(135deg, #601525 0%, #7a1f35 100%)';
        default: return 'linear-gradient(135deg, #3a2045 0%, #4e2a5a 100%)';
      }
    }};
    color: ${props => {
      switch (props.intensity) {
        case 'casual': return '#d8a0ff';
        case 'medium': return '#e8a0ff';
        case 'spicy': return '#ff9fb5';
        case 'extreme': return '#ff8daa';
        default: return '#d8a0ff';
      }
    }};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        8px 8px 16px rgba(0, 0, 0, 0.3),
        -8px -8px 16px rgba(255, 255, 255, 0.1),
        inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 
        2px 2px 4px rgba(0, 0, 0, 0.3),
        -2px -2px 4px rgba(255, 255, 255, 0.05),
        inset 2px 2px 4px rgba(0, 0, 0, 0.2),
        inset -2px -2px 4px rgba(255, 255, 255, 0.05);
    }
  }

  .button-dare {
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return 'linear-gradient(135deg, #3a2045 0%, #4e2a5a 100%)';
        case 'medium': return 'linear-gradient(135deg, #4e2045 0%, #602a58 100%)';
        case 'spicy': return 'linear-gradient(135deg, #5e2035 0%, #702a45 100%)';
        case 'extreme': return 'linear-gradient(135deg, #601525 0%, #7a1f35 100%)';
        default: return 'linear-gradient(135deg, #3a2045 0%, #4e2a5a 100%)';
      }
    }};
    color: ${props => {
      switch (props.intensity) {
        case 'casual': return '#d8a0ff';
        case 'medium': return '#e8a0ff';
        case 'spicy': return '#ff9fb5';
        case 'extreme': return '#ff8daa';
        default: return '#d8a0ff';
      }
    }};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        8px 8px 16px rgba(0, 0, 0, 0.3),
        -8px -8px 16px rgba(255, 255, 255, 0.1),
        inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 
        2px 2px 4px rgba(0, 0, 0, 0.3),
        -2px -2px 4px rgba(255, 255, 255, 0.05),
        inset 2px 2px 4px rgba(0, 0, 0, 0.2),
        inset -2px -2px 4px rgba(255, 255, 255, 0.05);
    }
  }

  .magic-text {
    animation: magicTextIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes magicTextIn {
    0% {
      opacity: 0;
      filter: blur(15px);
      transform: scale(1.2);
      text-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
    }
    100% {
      opacity: 1;
      filter: blur(0);
      transform: scale(1);
      text-shadow: 0 0 0 transparent;
    }
  }

  .magic-question-in {
    animation: magicCardIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes magicCardIn {
    0% {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
      filter: brightness(1.5) contrast(1.2);
    }
    20% {
      filter: brightness(1.3) contrast(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
      filter: brightness(1) contrast(1);
    }
  }

  @keyframes buttonShine {
    0% {
      transform: rotate(30deg) translate(-100%, -100%);
    }
    100% {
      transform: rotate(30deg) translate(100%, 100%);
    }
  }
  
  @keyframes liquid-spin {
    0% {
      transform: rotate(0deg);
      border-radius: 40%;
    }
    25% {
      border-radius: 45% 35% 40% 40%;
    }
    50% {
      transform: rotate(180deg);
      border-radius: 35% 45% 35% 45%;
    }
    75% {
      border-radius: 40% 40% 45% 35%;
    }
    100% {
      transform: rotate(360deg);
      border-radius: 40%;
    }
  }
  
  .player-indicator {
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return '#3a2045';
        case 'medium': return '#4e2045';
        case 'spicy': return '#5e2035';
        case 'extreme': return '#601525';
        default: return '#3a2045';
      }
    }};
    color: ${props => {
      switch (props.intensity) {
        case 'casual': return '#d8a0ff';
        case 'medium': return '#e8a0ff';
        case 'spicy': return '#ff9fb5';
        case 'extreme': return '#ff8daa';
        default: return '#d8a0ff';
      }
    }};
    padding: 0.8rem 1.8rem;
    border-radius: 24px;
    font-size: 1.1rem;
    font-weight: bold;
    box-shadow: 
      6px 6px 12px rgba(0, 0, 0, 0.25),
      -6px -6px 12px rgba(255, 255, 255, 0.1),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .player-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return '#2a1a30';
        case 'medium': return '#321a2e';
        case 'spicy': return '#3a1a26';
        case 'extreme': return '#3f1520';
        default: return '#2a1a30';
      }
    }};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      inset 2px 2px 4px rgba(0, 0, 0, 0.2),
      inset -2px -2px 4px rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .player-avatar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return 'radial-gradient(circle, #d8a0ff 0%, transparent 70%)';
        case 'medium': return 'radial-gradient(circle, #e8a0ff 0%, transparent 70%)';
        case 'spicy': return 'radial-gradient(circle, #ff9fb5 0%, transparent 70%)';
        case 'extreme': return 'radial-gradient(circle, #ff8daa 0%, transparent 70%)';
        default: return 'radial-gradient(circle, #d8a0ff 0%, transparent 70%)';
      }
    }};
    opacity: 0.5;
  }
  
  .player-avatar-container {
    position: relative;
  }
  
  .crown {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    color: ${props => {
      switch (props.intensity) {
        case 'casual': return '#FFD700';
        case 'medium': return '#FFD700';
        case 'spicy': return '#FFD700';
        case 'extreme': return '#FFD700';
        default: return '#FFD700';
      }
    }};
    font-size: 14px;
    text-shadow: 0 0 3px rgba(0,0,0,0.5);
    animation: float 2s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-3px);
    }
  }
  
  .player-avatar span {
    font-size: 15px;
    color: #ffffff;
    z-index: 1;
  }
  
  @keyframes spotlight {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.05);
    }
  }
  
  .turn-text {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
  }
  
  .back-button {
    background: ${props => {
      switch (props.intensity) {
        case 'casual': return '#3a2045';
        case 'medium': return '#4e2045';
        case 'spicy': return '#5e2035';
        case 'extreme': return '#601525';
        default: return '#3a2045';
      }
    }};
    color: ${props => {
      switch (props.intensity) {
        case 'casual': return '#d8a0ff';
        case 'medium': return '#e8a0ff';
        case 'spicy': return '#ff9fb5';
        case 'extreme': return '#ff8daa';
        default: return '#d8a0ff';
      }
    }};
    padding: 0.7rem;
    font-weight: bold;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 
      6px 6px 12px rgba(0, 0, 0, 0.25),
      -6px -6px 12px rgba(255, 255, 255, 0.1),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 1.2rem;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        8px 8px 16px rgba(0, 0, 0, 0.3),
        -8px -8px 16px rgba(255, 255, 255, 0.1),
        inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: 
        2px 2px 4px rgba(0, 0, 0, 0.3),
        -2px -2px 4px rgba(255, 255, 255, 0.05),
        inset 2px 2px 4px rgba(0, 0, 0, 0.2),
        inset -2px -2px 4px rgba(255, 255, 255, 0.05);
    }
  }

  .arrow-icon {
    display: block;
    width: 18px;
    height: 18px;
  }

  @keyframes pulse-icon {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  .icon-pulse {
    display: inline-block;
    animation: pulse-icon 2s infinite;
  }

  .truth-icon {
    animation-delay: 0.5s;
  }

  .dare-icon {
    animation-delay: 0s;
  }

  .magic-player-in {
    animation: magicPlayerIn 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  }
  
  @keyframes magicPlayerIn {
    0% {
      opacity: 0;
      transform: translateY(-15px) scale(0.9);
      filter: brightness(2);
      text-shadow: 0 0 20px currentColor;
    }
    50% {
      filter: brightness(1.5);
      text-shadow: 0 0 10px currentColor;
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: brightness(1);
      text-shadow: none;
    }
  }
`;

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [question, setQuestion] = useState<string>('');
  const [questionType, setQuestionType] = useState<QuestionType>('truth');
  const [playerTurn, setPlayerTurn] = useState<number>(1);
  const [animatePlayer, setAnimatePlayer] = useState<boolean>(true);
  const [colorCycle, setColorCycle] = useState<number>(0);
  const colorTimerRef = useRef<number | null>(null);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);
  
  // Get state from location or use defaults
  const intensity = (location.state?.intensity || 'casual') as IntensityLevel;
  const playerCount = location.state?.playerCount || 2;
  
  useEffect(() => {
    newQuestion('truth');
    
    // Start color cycle
    if (colorTimerRef.current) {
      window.clearInterval(colorTimerRef.current);
    }
    
    colorTimerRef.current = window.setInterval(() => {
      setColorCycle(prev => (prev + 1) % 6);
    }, 5000);
    
    return () => {
      if (colorTimerRef.current) {
        window.clearInterval(colorTimerRef.current);
      }
    };
  }, []);
  
  // Get color variations based on intensity and color cycle
  const getColorVariations = () => {
    const variations = {
      casual: [
        '#2a1a30', '#2d1b35', '#2f1c3a', '#311d3f', '#331e44', '#2d1b35'
      ],
      medium: [
        '#321a2e', '#371d33', '#3c2038', '#41233d', '#462642', '#371d33'
      ],
      spicy: [
        '#3a1a26', '#3f1c2a', '#441e2e', '#492032', '#4e2236', '#3f1c2a'
      ],
      extreme: [
        '#3f1520', '#461723', '#4d1926', '#541b29', '#5b1d2c', '#461723'
      ]
    };
    return variations[intensity][colorCycle];
  };
  
  const newQuestion = (type: QuestionType) => {
    setQuestionType(type);
    setQuestion(getRandomQuestion(type, intensity));
  };
  
  const nextPlayer = () => {
    setAnimatePlayer(false);
    // Small delay before changing player to allow animation to reset
    setTimeout(() => {
      setPlayerTurn(current => current < playerCount ? current + 1 : 1);
      setAnimatePlayer(true);
    }, 50);
  };
  
  const handleNextQuestion = (type: QuestionType) => {
    newQuestion(type);
    nextPlayer();
    // Advance color cycle on question change
    setColorCycle(prev => (prev + 1) % 6);
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  const getTurnMessage = () => {
    const messages = {
      casual: [
        "It's Your Turn!",
        "Your Move!",
        "Time to Play!",
        "Ready?",
      ],
      medium: [
        "Your Turn, Be Bold!",
        "Time to Shine!",
        "Show Us What You Got!",
        "The Stage is Yours!",
      ],
      spicy: [
        "Feeling Brave?",
        "Your Moment of Truth!",
        "Dare if You Dare!",
        "This Could Get Interesting...",
      ],
      extreme: [
        "Brace Yourself!",
        "No Holding Back Now!",
        "Go Big or Go Home!",
        "Make it Legendary!",
      ]
    };
    
    // Get the messages for current intensity
    const intensityMessages = messages[intensity] || messages.casual;
    
    // Choose a message based on player turn to make it somewhat consistent
    const messageIndex = (playerTurn - 1) % intensityMessages.length;
    return intensityMessages[messageIndex];
  };

  // Modified function to handle swipe directions
  const handleSwipe = (direction: 'left' | 'right') => {
    // Left swipe for Truth, Right swipe for Dare
    handleNextQuestion(direction === 'left' ? 'truth' : 'dare');
  };

  return (
    <StyledWrapper intensity={intensity}>
      <div className={`min-h-screen intensity-${intensity}`}>
        <div className="color-spot-1"></div>
        <div className="color-spot-2"></div>
        
        {/* Add hexagonal loader with matching intensity */}
        <HexLoader intensity={intensity} opacity={0.2} />
        
        <div className="container mx-auto pt-6 pb-16 relative z-10">
          <div className="flex flex-col items-center px-4">
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={handleBack}
              className="back-button"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Button>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-center mt-8 mb-8 magic-text"
            >
              {intensity.charAt(0).toUpperCase() + intensity.slice(1)} Mode
            </motion.h1>

            <div className="player-indicator mb-8">
              <div className="player-avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{getTurnMessage()}</span>
            </div>

            {/* SwipeHandler with improved UI */}
            <div className="w-full max-w-md">
              <SwipeHandler
                onSwipeLeft={() => handleSwipe('left')}
                onSwipeRight={() => handleSwipe('right')}
              >
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  {question ? (
                    <motion.div
                      key={question}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="magic-question-in relative"
                    >
                      <QuestionCard
                        type={questionType}
                        intensity={intensity}
                      >
                        {question}
                      </QuestionCard>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-center p-8 max-w-md bg-opacity-20 bg-black rounded-3xl backdrop-blur-sm border border-white/10 shadow-xl"
                    >
                      <h2 className="text-2xl font-semibold mb-4">Swipe for Questions</h2>
                      <p className="text-lg">Swipe left for Truth, right for Dare!</p>
                    </motion.div>
                  )}
                </div>
              </SwipeHandler>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Game;

