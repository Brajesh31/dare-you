import React from 'react';
import styled from 'styled-components';

interface HexLoaderProps {
  intensity: 'casual' | 'medium' | 'spicy' | 'extreme';
  opacity?: number;
}

const HexLoader = ({ opacity = 0.3 }: HexLoaderProps) => {
  return (
    <StyledWrapper opacity={opacity}>
      <div className="hexagon-container">
        <div className="hexagon hex1"></div>
        <div className="hexagon hex2"></div>
        <div className="hexagon hex3"></div>
        <div className="hexagon hex4"></div>
        <div className="hexagon hex5"></div>
        <div className="hexagon hex6"></div>
        <div className="hexagon hex7"></div>
      </div>
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  opacity: number;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
  opacity: ${props => props.opacity};
  overflow: hidden;

  .hexagon-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    
    @media (min-width: 768px) {
      width: 400px;
      height: 400px;
    }
    
    @media (min-width: 1200px) {
      width: 500px;
      height: 500px;
    }
  }

  .hexagon {
    position: absolute;
    width: 100px;
    height: 57.74px; /* width * 0.5774 */
    background: linear-gradient(to bottom, #D3D3D3, #A9A9A9);
    margin: 28.87px 0; /* width * 0.2887 */
    border-left: solid 3px rgba(192, 192, 192, 0.7);
    border-right: solid 3px rgba(192, 192, 192, 0.7);
    border-radius: 10px;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
    opacity: 0.9;
    backdrop-filter: blur(2px);
    
    @media (min-width: 768px) {
      width: 120px;
      height: 69.28px;
      margin: 34.64px 0;
    }
  }

  .hexagon:before,
  .hexagon:after {
    content: "";
    position: absolute;
    width: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    
    @media (min-width: 768px) {
      border-left: 60px solid transparent;
      border-right: 60px solid transparent;
    }
  }

  .hexagon:before {
    bottom: 100%;
    border-bottom: 28.87px solid #D3D3D3; /* width * 0.2887 */
    
    @media (min-width: 768px) {
      border-bottom: 34.64px solid #D3D3D3;
    }
  }

  .hexagon:after {
    top: 100%;
    width: 0;
    border-top: 28.87px solid #A9A9A9; /* width * 0.2887 */
    
    @media (min-width: 768px) {
      border-top: 34.64px solid #A9A9A9;
    }
  }

  .hex1 {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    animation: pulse 3s infinite ease-in-out;
  }

  .hex2 {
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.7);
    animation: pulse 3s infinite ease-in-out 0.3s;
  }

  .hex3 {
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.7);
    animation: pulse 3s infinite ease-in-out 0.6s;
  }

  .hex4 {
    top: 35%;
    left: 25%;
    transform: translate(-50%, -50%) scale(0.6);
    animation: pulse 3s infinite ease-in-out 0.9s;
  }

  .hex5 {
    top: 35%;
    left: 75%;
    transform: translate(-50%, -50%) scale(0.6);
    animation: pulse 3s infinite ease-in-out 1.2s;
  }

  .hex6 {
    top: 65%;
    left: 25%;
    transform: translate(-50%, -50%) scale(0.6);
    animation: pulse 3s infinite ease-in-out 1.5s;
  }

  .hex7 {
    top: 65%;
    left: 75%;
    transform: translate(-50%, -50%) scale(0.6);
    animation: pulse 3s infinite ease-in-out 1.8s;
  }

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 0.5;
    }
    50% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.9;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 0.5;
    }
  }
`;

export default HexLoader; 