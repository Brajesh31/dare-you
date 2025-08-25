import React from 'react';
import styled from 'styled-components';

interface QuestionCardProps {
  children: React.ReactNode;
  type: 'truth' | 'dare';
  intensity: 'casual' | 'medium' | 'spicy' | 'extreme';
  onClick?: () => void;
}

const QuestionCard = ({ children, type, intensity, onClick }: QuestionCardProps) => {
  const getCardColors = () => {
    if (type === 'truth') {
      switch (intensity) {
        case 'casual':
          return { bg: '#4a2c84', light: '#6a41b0', boxShadow: 'rgba(74, 44, 132, 0.7)', accent: '#8a6cd9' };
        case 'medium':
          return { bg: '#8326a9', light: '#a53dd0', boxShadow: 'rgba(131, 38, 169, 0.7)', accent: '#c77df5' };
        case 'spicy':
          return { bg: '#aa2e43', light: '#d4384e', boxShadow: 'rgba(170, 46, 67, 0.7)', accent: '#ff6c82' };
        case 'extreme':
          return { bg: '#b61c30', light: '#e52338', boxShadow: 'rgba(182, 28, 48, 0.8)', accent: '#ff4a5f' };
        default:
          return { bg: '#4a2c84', light: '#6a41b0', boxShadow: 'rgba(74, 44, 132, 0.7)', accent: '#8a6cd9' };
      }
    } else {
      switch (intensity) {
        case 'casual':
          return { bg: '#4752c4', light: '#5a68e5', boxShadow: 'rgba(71, 82, 196, 0.7)', accent: '#7c8aff' };
        case 'medium':
          return { bg: '#7036b1', light: '#8b42dd', boxShadow: 'rgba(112, 54, 177, 0.7)', accent: '#b273ff' };
        case 'spicy':
          return { bg: '#b63547', light: '#db3d53', boxShadow: 'rgba(182, 53, 71, 0.7)', accent: '#ff7a8c' };
        case 'extreme':
          return { bg: '#cc1f2d', light: '#ef2334', boxShadow: 'rgba(204, 31, 45, 0.8)', accent: '#ff5a69' };
        default:
          return { bg: '#4752c4', light: '#5a68e5', boxShadow: 'rgba(71, 82, 196, 0.7)', accent: '#7c8aff' };
      }
    }
  };

  const colors = getCardColors();

  const getLevelIndicator = () => {
    const dots = [];
    let level = 1;
    
    switch(intensity) {
      case 'casual': level = 1; break;
      case 'medium': level = 2; break;
      case 'spicy': level = 3; break;
      case 'extreme': level = 4; break;
      default: level = 1;
    }
    
    for (let i = 0; i < 4; i++) {
      dots.push(
        <div 
          key={i} 
          className={`level-dot ${i < level ? 'active' : ''}`} 
          style={{ backgroundColor: i < level ? colors.accent : 'rgba(255, 255, 255, 0.2)' }}
        />
      );
    }
    
    return (
      <div className="level-indicator">
        {dots}
      </div>
    );
  };

  return (
    <StyledWrapper 
      bgColor={colors.bg} 
      lightColor={colors.light} 
      boxShadowColor={colors.boxShadow}
      accentColor={colors.accent}
      onClick={onClick}
      className={`card-${intensity}`}
    >
      <div className={`card card-${intensity}`}>
        <div className="overlay" />
        <div className="circle">
          <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="23 29 78 60" height="60px" width="78px">
            <defs />
            <g transform="translate(23.000000, 29.500000)" fillRule="evenodd" fill="none" strokeWidth={1} stroke="none" id="icon">
              <rect rx="4.70247832" height="21.8788565" width="9.40495664" y="26.0333433" x="67.8357511" fill={colors.bg} id="Rectangle-3" />
              <rect rx="4.70247832" height="10.962961" width="9.40495664" y="38.776399" x="67.8357511" fill="#4a3a66" id="Rectangle-3" />
              <polygon points="57.3086772 0 67.1649301 26.3776902 14.4413177 45.0699507 4.58506484 18.6922605" fill="#4a3a66" id="Rectangle-2">
              </polygon>
              <path fill={colors.bg} id="Rectangle" d="M0,19.6104296 C0,16.2921718 2.68622235,13.6021923 5.99495032,13.6021923 L67.6438591,13.6021923 C70.9547788,13.6021923 73.6388095,16.2865506 73.6388095,19.6104296 L73.6388095,52.6639057 C73.6388095,55.9821635 70.9525871,58.672143 67.6438591,58.672143 L5.99495032,58.672143 C2.68403068,58.672143 0,55.9877847 0,52.6639057 L0,19.6104296 Z" />
              <path fill="#d0cce0" id="Fill-12" d="M47.5173769,27.0835169 C45.0052827,24.5377699 40.9347162,24.5377699 38.422622,27.0835169 L36.9065677,28.6198808 L35.3905134,27.0835169 C32.8799903,24.5377699 28.8078527,24.5377699 26.2957585,27.0835169 C23.7852354,29.6292639 23.7852354,33.7559532 26.2957585,36.3001081 L36.9065677,47.0530632 L47.5173769,36.3001081 C50.029471,33.7559532 50.029471,29.6292639 47.5173769,27.0835169" />
              <rect height="12.863158" width="15.6082259" y="26.1162588" x="58.0305835" fill={colors.bg} id="Rectangle-4" />
              <ellipse ry="2.23319575" rx="2.20116007" cy="33.0919007" cx="65.8346965" fill="#d0cce0" id="Oval">
              </ellipse>
            </g>
          </svg>
        </div>
        
        {getLevelIndicator()}
        
        <div className="card-type-badge" style={{ backgroundColor: colors.accent }}>
          {type.toUpperCase()}
        </div>
        
        <p className="card-content">{children}</p>
      </div>
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  bgColor: string;
  lightColor: string;
  boxShadowColor: string;
  accentColor: string;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  .card {
    --bg-color: ${props => props.bgColor};
    --bg-color-light: ${props => props.lightColor};
    --text-color-hover: #fff;
    --box-shadow-color: ${props => props.boxShadowColor};
    --accent-color: ${props => props.accentColor};
  }

  .card {
    width: 280px;
    height: 370px;
    background: var(--bg-color);
    border-radius: 32px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 
      8px 8px 16px rgba(0, 0, 0, 0.3),
      -8px -8px 16px rgba(255, 255, 255, 0.05),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease-out;
    text-decoration: none;
    cursor: pointer;
    border: none;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .level-indicator {
    display: flex;
    margin: 12px 0;
    gap: 6px;
    z-index: 1000;
  }

  .level-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .level-dot.active {
    transform: scale(1.3);
    box-shadow: 0 0 10px var(--accent-color);
  }

  .card-type-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    letter-spacing: 1px;
  }

  .card::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    animation: shinyEffect 3s infinite;
    pointer-events: none;
    z-index: 1001;
  }

  @keyframes shinyEffect {
    0% {
      transform: rotate(30deg) translate(-100%, -100%);
    }
    100% {
      transform: rotate(30deg) translate(100%, 100%);
    }
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 
      10px 10px 20px rgba(0, 0, 0, 0.35),
      -10px -10px 20px rgba(255, 255, 255, 0.05),
      inset 1px 1px 1px rgba(255, 255, 255, 0.1);
  }

  .card:active {
    transform: scale(0.98);
    box-shadow: 
      5px 5px 10px rgba(0, 0, 0, 0.3),
      -5px -5px 10px rgba(255, 255, 255, 0.03),
      inset 2px 2px 4px rgba(0, 0, 0, 0.2),
      inset -2px -2px 4px rgba(255, 255, 255, 0.03);
  }

  .card:hover .overlay {
    transform: scale(4) translateZ(0);
  }

  .card:hover .circle {
    border-color: var(--bg-color-light);
    background: var(--bg-color);
  }

  .card:hover .circle:after {
    background: var(--bg-color-light);
  }

  .card:hover p {
    color: var(--text-color-hover);
  }

  .card-title {
    font-size: 26px;
    font-weight: bold;
    color: #ffffff;
    margin-top: 20px;
    z-index: 1000;
    transition: color 0.3s ease-out;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    animation: titleAppear 1s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes titleAppear {
    0% {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
      letter-spacing: 8px;
      text-shadow: 0 0 20px var(--bg-color), 0 0 40px var(--bg-color);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
      letter-spacing: normal;
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }
  }

  .card-content {
    font-size: 22px;
    font-weight: 500;
    color: #ffffff;
    margin-top: 10px;
    padding: 0 25px;
    text-align: center;
    z-index: 1000;
    transition: color 0.3s ease-out;
    max-height: 150px;
    overflow-y: auto;
    line-height: 1.4;
    animation: textAppear 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  @keyframes textAppear {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(10px);
      text-shadow: 0 0 20px var(--light-color), 0 0 40px var(--light-color);
      filter: blur(8px);
    }
    50% {
      opacity: 0.8;
      text-shadow: 0 0 10px var(--light-color), 0 0 20px var(--light-color);
      filter: blur(4px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
      text-shadow: 0 0 0 transparent;
      filter: blur(0);
    }
  }

  .circle {
    width: 131px;
    height: 131px;
    border-radius: 50%;
    background: #1a1a1a;
    border: 2px solid var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-out;
  }

  .circle:after {
    content: "";
    width: 118px;
    height: 118px;
    display: block;
    position: absolute;
    background: var(--bg-color);
    border-radius: 50%;
    top: 7px;
    left: 7px;
    transition: opacity 0.3s ease-out;
  }

  .circle svg {
    z-index: 10000;
    transform: translateZ(0);
  }

  .overlay {
    border-radius: 50%;
    height: 80px;
    width: 80px;
    background: var(--light-color);
    box-shadow: 
      inset 2px 2px 4px rgba(255, 255, 255, 0.2),
      inset -2px -2px 4px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: -30px;
    left: 140px;
    transform: scale(1);
    transition: transform 0.4s ease-out;
    z-index: 0;
  }
`;

export default QuestionCard; 