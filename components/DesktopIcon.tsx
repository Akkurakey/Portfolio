import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface DesktopIconProps {
  name: string;
  id: string;
  initialX?: number;
  initialY?: number;
  onDoubleClick: () => void;
  onPositionChange: (id: string, x: number, y: number) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ name, id, initialX = 0, initialY = 0, onDoubleClick, onPositionChange }) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPos: { x: number; y: number } } | null>(null);

  // Sync with initial position if it changes from outside (e.g. window resize)
  useEffect(() => {
    if (!isDragging) {
      setPos({ x: initialX, y: initialY });
    }
  }, [initialX, initialY, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left click
    if (e.button !== 0) return;
    
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: { x: pos.x, y: pos.y }
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current) return;
      
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;
      
      setPos({
        x: dragRef.current.startPos.x + deltaX,
        y: dragRef.current.startPos.y + deltaY
      });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (dragRef.current) {
          onPositionChange(id, pos.x, pos.y);
        }
        dragRef.current = null;
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, pos, id, onPositionChange]);

  return (
    <motion.div
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ 
        position: 'absolute',
        left: pos.x, 
        top: pos.y,
        cursor: 'default',
        zIndex: isDragging ? 100 : 10,
        // Disable transition during drag to feel responsive
        transition: isDragging ? 'none' : 'left 0.2s ease-out, top 0.2s ease-out'
      }}
      className="flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 select-none group pointer-events-auto"
    >
      <div className="relative pointer-events-none">
        <svg
          className={`w-12 h-12 sm:w-16 sm:h-16 folder-icon-glow ${isDragging ? 'text-blue-300' : 'text-blue-400'} group-hover:text-blue-300 transition-colors`}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 4L12 6H20C21.1 6 22 6.9 22 8V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H10Z" />
        </svg>
      </div>
      <span className="mt-1 text-[11px] sm:text-[13px] text-white font-medium text-center px-1.5 py-0.5 rounded group-hover:bg-blue-600/40 drop-shadow-md break-words max-w-full leading-tight pointer-events-none whitespace-pre-line">
        {name}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;