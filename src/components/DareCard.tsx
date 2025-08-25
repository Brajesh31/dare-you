import React from 'react';
import styled from 'styled-components';

interface DareCardProps {
  children: React.ReactNode;
  rotation: { x: number, y: number };
  intensity: 'casual' | 'medium' | 'spicy';
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

const DareCard = ({ children, rotation, intensity, onMouseMove, onMouseLeave }: DareCardProps) => {
  const getGlowColor = () => {
    switch (intensity) {
      case 'casual':
        return 'rgba(74, 192, 252, 0.7)';
      case 'medium':
        return 'rgba(188, 74, 252, 0.7)';
      case 'spicy':
        return 'rgba(220, 33, 136, 0.7)';
      default:
        return 'rgba(74, 192, 252, 0.7)';
    }
  };

  const getIntensityColors = () => {
    switch (intensity) {
      case 'casual':
        return {
          bg: '#4ac0fc',
          light: '#82d3ff',
          svg: { fill: '#4ac0fc', secondary: '#2e5289' }
        };
      case 'medium':
        return {
          bg: '#bc4afc',
          light: '#d48fff',
          svg: { fill: '#bc4afc', secondary: '#5f2e89' }
        };
      case 'spicy':
        return {
          bg: '#dc2188',
          light: '#f355aa',
          svg: { fill: '#dc2188', secondary: '#892e52' }
        };
      default:
        return {
          bg: '#ceb2fc',
          light: '#f0e7ff',
          svg: { fill: '#ceb2fc', secondary: '#6A5297' }
        };
    }
  };

  const colors = getIntensityColors();
  const glowColor = getGlowColor();

  return (
    <StyledWrapper 
      bgColor={colors.bg} 
      lightColor={colors.light} 
      glowColor={glowColor}
      style={{ 
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="card wallet">
        <div className="overlay" />
        <div className="circle">
          <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="23 29 78 60" height="60px" width="78px">
            <defs />
            <g transform="translate(23.000000, 29.500000)" fillRule="evenodd" fill="none" strokeWidth={1} stroke="none" id="icon">
              <rect rx="4.70247832" height="21.8788565" width="9.40495664" y="26.0333433" x="67.8357511" fill={colors.bg} id="Rectangle-3" />
              <rect rx="4.70247832" height="10.962961" width="9.40495664" y="38.776399" x="67.8357511" fill={colors.svg.secondary} id="Rectangle-3" />
              <polygon points="57.3086772 0 67.1649301 26.3776902 14.4413177 45.0699507 4.58506484 18.6922605" fill={colors.svg.secondary} id="Rectangle-2">
              </polygon>
              <path fill={colors.bg} id="Rectangle" d="M0,19.6104296 C0,16.2921718 2.68622235,13.6021923 5.99495032,13.6021923 L67.6438591,13.6021923 C70.9547788,13.6021923 73.6388095,16.2865506 73.6388095,19.6104296 L73.6388095,52.6639057 C73.6388095,55.9821635 70.9525871,58.672143 67.6438591,58.672143 L5.99495032,58.672143 C2.68403068,58.672143 0,55.9877847 0,52.6639057 L0,19.6104296 Z" />
              <path fill="#FFFFFF" id="Fill-12" d="M47.5173769,27.0835169 C45.0052827,24.5377699 40.9347162,24.5377699 38.422622,27.0835169 L36.9065677,28.6198808 L35.3905134,27.0835169 C32.8799903,24.5377699 28.8078527,24.5377699 26.2957585,27.0835169 C23.7852354,29.6292639 23.7852354,33.7559532 26.2957585,36.3001081 L36.9065677,47.0530632 L47.5173769,36.3001081 C50.029471,33.7559532 50.029471,29.6292639 47.5173769,27.0835169" />
              <rect height="12.863158" width="15.6082259" y="26.1162588" x="58.0305835" fill={colors.bg} id="Rectangle-4" />
              <ellipse ry="2.23319575" rx="2.20116007" cy="33.0919007" cx="65.8346965" fill="#FFFFFF" id="Oval">
              </ellipse>
            </g>
          </svg>
        </div>
        <p>{children}</p>
      </div>
      <div className="card-glow"></div>
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  bgColor: string;
  lightColor: string;
  glowColor: string;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  position: relative;
  transform-style: preserve-3d;
  width: 100%;
  min-height: 300px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 0 15px ${props => props.glowColor};
  
  .card-glow {
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: radial-gradient(circle at center, ${props => props.glowColor}55 0%, transparent 70%);
    opacity: 0.5;
    pointer-events: none;
    z-index: 1;
  }

  .wallet {
    --bg-color: ${props => props.bgColor};
    --bg-color-light: ${props => props.lightColor};
    --text-color-hover: #fff;
    --box-shadow-color: ${props => props.glowColor};
  }

  .card {
    width: 100%;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease-out;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .card:hover {
    transform: translateY(-5px) scale(1.005) translateZ(0);
    box-shadow: 0 24px 36px rgba(0, 0, 0, 0.11),
      0 24px 46px var(--box-shadow-color);
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
    color: #ffffff;
  }

  .card p {
    font-size: 17px;
    color: #ffffff;
    margin-top: 30px;
    z-index: 1000;
    transition: color 0.3s ease-out;
    padding: 0 20px;
    text-align: center;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .circle {
    width: 131px;
    height: 131px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
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
    width: 118px;
    position: absolute;
    height: 118px;
    border-radius: 50%;
    background: var(--bg-color);
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    transition: transform 0.3s ease-out;
  }
`;

export default DareCard; 