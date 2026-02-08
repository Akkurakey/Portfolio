import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  zIndex: number;
  onFocus: () => void;
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  isOpen,
  onClose,
  onMinimize,
  zIndex,
  onFocus,
  children,
  initialWidth,
  initialHeight,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const isAbout = id === 'about';
  const isCertification = id === 'certification';
  const isCV = id === 'cv';
  
  const getResponsiveSize = () => {
    if (typeof window === 'undefined') return { width: 800, height: 500 };
    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;
    const isMobile = wWidth < 640;
    const isTablet = wWidth >= 640 && wWidth < 1024;

    if (isMobile) {
      if (isAbout) return { width: wWidth * 0.9, height: Math.min(480, wHeight * 0.7) };
      if (isCertification) return { width: 180, height: 240 };
      // Mobile takes near full screen
      return { 
        width: wWidth - 16, 
        height: wHeight - 120 
      };
    }

    if (isTablet) {
      if (isAbout) return { width: 340, height: 520 };
      if (isCV) return { width: Math.min(800, wWidth - 60), height: wHeight - 120 };
      const baseW = initialWidth || 700;
      const baseH = initialHeight || 550;
      return {
        width: Math.min(baseW, wWidth - 40),
        height: Math.min(baseH, wHeight - 120)
      };
    }
    
    // Desktop sizing
    let w = initialWidth || (isAbout ? 340 : (isCV ? 800 : 850));
    let h = initialHeight || (isAbout ? 520 : (isCV ? Math.min(850, wHeight - 80) : 600));
    
    // Safety check for viewport
    w = Math.min(w, wWidth - 40);
    h = Math.min(h, wHeight - 60);
    
    return { width: w, height: h };
  };

  const [size, setSize] = useState(getResponsiveSize);
  
  const getCenterPos = () => {
    if (typeof window === 'undefined') return { x: 100, y: 100 };
    const currentSize = getResponsiveSize();
    const isMobile = window.innerWidth < 640;
    
    const centerX = (window.innerWidth - currentSize.width) / 2;
    const centerY = (window.innerHeight - currentSize.height) / 2;

    // Special case: About window should be perfectly centered
    if (isAbout) {
      return {
        x: centerX,
        y: Math.max(40, centerY)
      };
    }

    // Special case: CV window should be vertically centered but shifted to the right
    if (isCV && !isMobile) {
      return {
        x: window.innerWidth - currentSize.width - 40, // 40px padding from the right edge
        y: centerY
      };
    }
    
    const staggerIndex = Math.max(0, zIndex - 10);
    const offset = isMobile ? 0 : (staggerIndex % 6) * 25; 

    // For other windows, we apply the staggering logic
    return {
      x: centerX + offset,
      y: Math.max(isMobile ? 40 : 40, centerY + offset)
    };
  };

  const [position, setPosition] = useState(getCenterPos);
  const hasBeenMoved = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (!hasBeenMoved.current && !isMaximized) {
        const newSize = getResponsiveSize();
        setSize(newSize);
        setPosition(getCenterPos());
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMaximized, initialWidth, isAbout, isCV]);

  const interactionRef = useRef<{ 
    type: 'resize' | 'drag' | null; 
    startX: number; 
    startY: number; 
    startW: number; 
    startH: number;
    startXPos: number;
    startYPos: number;
  } | null>(null);

  const startResizing = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setIsInteracting(true);
    interactionRef.current = {
      type: 'resize',
      startX: clientX,
      startY: clientY,
      startW: size.width,
      startH: size.height,
      startXPos: position.x,
      startYPos: position.y
    };
    onFocus();
  };

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMaximized) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setIsInteracting(true);
    hasBeenMoved.current = true;
    interactionRef.current = {
      type: 'drag',
      startX: clientX,
      startY: clientY,
      startW: size.width,
      startH: size.height,
      startXPos: position.x,
      startYPos: position.y
    };
    onFocus();
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!interactionRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      const deltaX = clientX - interactionRef.current.startX;
      const deltaY = clientY - interactionRef.current.startY;
      
      if (interactionRef.current.type === 'resize') {
        setSize({
          width: Math.max(200, interactionRef.current.startW + deltaX),
          height: Math.max(150, interactionRef.current.startH + deltaY)
        });
      } else if (interactionRef.current.type === 'drag') {
        const nextX = interactionRef.current.startXPos + deltaX;
        const nextY = Math.max(32, interactionRef.current.startYPos + deltaY);
        
        setPosition({
          x: nextX,
          y: nextY
        });
      }
    };

    const handleEnd = () => {
      interactionRef.current = null;
      setIsInteracting(false);
    };

    if (isInteracting) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isInteracting]);

  const windowStyles = isMaximized
    ? { top: '32px', left: 0, width: '100%', height: 'calc(100% - 32px)', borderRadius: 0 }
    : { 
        width: size.width, 
        height: size.height, 
        top: position.y,
        left: position.x
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onMouseDown={onFocus}
          onTouchStart={onFocus}
          style={{ 
            zIndex, 
            ...windowStyles,
            transition: isInteracting ? 'none' : 'width 0.25s cubic-bezier(0.2, 0, 0, 1), height 0.25s cubic-bezier(0.2, 0, 0, 1), top 0.25s cubic-bezier(0.2, 0, 0, 1), left 0.25s cubic-bezier(0.2, 0, 0, 1), border-radius 0.2s ease, opacity 0.2s ease'
          }}
          className={`fixed flex flex-col macos-glass macos-shadow rounded-xl border border-white/20 select-none touch-none ${isAbout ? 'overflow-visible' : 'overflow-hidden'}`}
        >
          {/* Header Bar */}
          <div 
            onMouseDown={startDragging}
            onTouchStart={startDragging}
            className="window-header h-10 flex items-center px-4 bg-gray-100/80 border-b border-black/10 cursor-default shrink-0 rounded-t-xl"
          >
            <div className="flex gap-1.5 w-14">
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center"
              >
                <X className="w-2 h-2 text-black/40 opacity-0 hover:opacity-100 transition-opacity" />
              </button>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                className="w-3 h-3 rounded-full bg-[#FEBC2E] flex items-center justify-center"
              >
                <Minus className="w-2 h-2 text-black/40 opacity-0 hover:opacity-100 transition-opacity" />
              </button>
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                className="w-3 h-3 rounded-full bg-[#28C840] flex items-center justify-center"
              >
                <Maximize2 className="w-2 h-2 text-black/40 opacity-0 hover:opacity-100 transition-opacity" />
              </button>
            </div>
            <div className="flex-grow text-center text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700 opacity-80 truncate px-2 pointer-events-none">
              {title}
            </div>
            <div className="w-14" />
          </div>

          {/* Content Area */}
          <div className={`flex-grow select-text touch-auto ${isAbout ? 'overflow-visible' : 'overflow-y-auto custom-scrollbar bg-white'}`}>
            {children}
          </div>

          {/* Resize Handle */}
          {!isMaximized && window.innerWidth >= 1024 && !isAbout && (
            <div 
              onMouseDown={startResizing}
              onTouchStart={startResizing}
              className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-[100] bg-transparent flex items-end justify-end p-1"
            >
              <div className="w-3 h-3 border-r-2 border-b-2 border-black/10 rounded-br-[2px]" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;
