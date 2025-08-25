import React, { useEffect, useState, useRef } from 'react';
import './SwipeHandler.css';

interface SwipeHandlerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
}

const SwipeHandler: React.FC<SwipeHandlerProps> = ({ 
  onSwipeLeft, 
  onSwipeRight, 
  children 
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isNewUser, setIsNewUser] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // The minimum swipe distance (in px) required for the swipe to trigger the action
  const minSwipeDistance = 50;

  // Remove the new user flag after a delay
  useEffect(() => {
    if (isNewUser) {
      const timer = setTimeout(() => {
        setIsNewUser(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isNewUser]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setSwipeDirection(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    setTouchEnd(e.targetTouches[0].clientX);
    const currentDistance = touchStart - e.targetTouches[0].clientX;
    
    // Update the swipe direction for visual feedback
    if (Math.abs(currentDistance) > 10) {
      setSwipeDirection(currentDistance > 0 ? 'left' : 'right');
    } else {
      setSwipeDirection(null);
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    
    if (!touchStart || !touchEnd) {
      setSwipeDirection(null);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
    
    // Reset states
    setTouchStart(null);
    setTouchEnd(null);
    setSwipeDirection(null);
  };

  // For desktop - handle mouse events
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setMouseEnd(null);
    setMouseStart(e.clientX);
    setIsDragging(true);
    setSwipeDirection(null);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !mouseStart) return;
    
    setMouseEnd(e.clientX);
    const currentDistance = mouseStart - e.clientX;
    
    // Update the swipe direction for visual feedback
    if (Math.abs(currentDistance) > 10) {
      setSwipeDirection(currentDistance > 0 ? 'left' : 'right');
    } else {
      setSwipeDirection(null);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    
    if (!mouseStart || !mouseEnd) {
      setSwipeDirection(null);
      return;
    }
    
    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
    
    // Reset states
    setMouseStart(null);
    setMouseEnd(null);
    setSwipeDirection(null);
  };

  // If the mouse leaves the element while dragging, cancel the drag operation
  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setMouseStart(null);
      setMouseEnd(null);
      setSwipeDirection(null);
    }
  };

  // Combine all the class names
  const containerClassNames = [
    'swipe-container',
    isDragging ? 'dragging' : '',
    isNewUser ? 'swipe-container-new' : '',
    swipeDirection ? `swiping-${swipeDirection}` : ''
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={containerRef}
      className={containerClassNames}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {children}
      
      {/* Swipe hint indicators */}
      <div className="swipe-hint swipe-hint-left">
        <span className="swipe-hint-arrow"></span>
      </div>
      <div className="swipe-hint swipe-hint-right">
        <span className="swipe-hint-arrow"></span>
      </div>
      
      {/* Swipe instructions text */}
      <div className="swipe-instructions">
        <div className="swipe-instruction-text">← Truth</div>
        <div className="swipe-instruction-text">Dare →</div>
      </div>
    </div>
  );
};

export default SwipeHandler; 