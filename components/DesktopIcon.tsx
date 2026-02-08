import { motion } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';

interface DesktopIconProps {
  name: string;
  id: string;
  x: number;
  y: number;
  isSelected?: boolean;
  onDoubleClick: () => void;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  onDrag: (id: string, dx: number, dy: number) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  name, 
  id, 
  x, 
  y, 
  isSelected = false,
  onDoubleClick, 
  onMouseDown,
  onDrag
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Left click only
    if (e.button !== 0) return;
    
    // Call parent handler for selection
    onMouseDown(e, id);
    
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStartRef.current) return;
      const dx = moveEvent.clientX - dragStartRef.current.x;
      const dy = moveEvent.clientY - dragStartRef.current.y;
      
      // Update starting point for next delta
      dragStartRef.current = { x: moveEvent.clientX, y: moveEvent.clientY };
      
      onDrag(id, dx, dy);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ 
        position: 'absolute',
        left: x, 
        top: y,
        cursor: 'default',
        zIndex: isDragging ? 1000 : 10,
        touchAction: 'none'
      }}
      className="flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 select-none group pointer-events-auto"
    >
      <div className={`relative p-2 rounded-lg transition-all duration-200 ${isSelected ? 'bg-blue-500/30' : ''}`}>
        <svg
          className={`w-12 h-12 sm:w-16 sm:h-16 folder-icon-glow ${isSelected ? 'text-blue-300' : (isDragging ? 'text-blue-200' : 'text-blue-400')} group-hover:text-blue-300 transition-colors`}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 4L12 6H20C21.1 6 22 6.9 22 8V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H10Z" />
        </svg>
      </div>
      <span className={`mt-1 text-[11px] sm:text-[13px] font-medium text-center px-1.5 py-0.5 rounded drop-shadow-md break-words max-w-full leading-tight pointer-events-none whitespace-pre-line transition-all duration-200 ${isSelected ? 'bg-blue-600 text-white' : 'text-white group-hover:bg-blue-600/40'}`}>
        {name}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;
