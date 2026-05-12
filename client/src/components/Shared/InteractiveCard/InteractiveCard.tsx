import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import "./InteractiveCard.css";

interface InteractiveCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({ 
  children, 
  className = "", 
  glowColor = "rgba(124, 58, 237, 0.25)", 
  style, 
  ...motionProps 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // 3D tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`interactive-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        ...style,
        transition: isHovering ? 'none' : 'transform 0.5s ease',
      }}
      {...motionProps}
    >
      {isHovering && (
        <div 
          className="interactive-card-spotlight"
          style={{
            position: 'absolute',
            top: mousePos.y,
            left: mousePos.x,
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '400px',
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.6,
          }}
        />
      )}
      <div className="interactive-card-content">
        {children}
      </div>
    </motion.div>
  );
};
