import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutContentProps {
  onViewCV?: () => void;
  onOpenCertification?: () => void;
}

const PROFILE_IMAGES = [
  "https://lh3.googleusercontent.com/d/17nVRNSgv5x0LIgPAcQpuyVFDXkX5QRYy",
  "https://lh3.googleusercontent.com/d/1hfuo7WOfc_h84dE3xlPtPiOYjZs6WSd_",
  "https://lh3.googleusercontent.com/d/1fBD3fzlfdCNHX1NcERvKoFI2fSTSC1mo",
  "https://lh3.googleusercontent.com/d/1HruJYf-DOL80WYHQYtgw6X_62dENqRu7",
  "https://lh3.googleusercontent.com/d/1GHAiuvNNPzvrDQDEhfkeGu3lkxmOJLk3"
];

const AboutContent: React.FC<AboutContentProps> = ({ onViewCV, onOpenCertification }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % PROFILE_IMAGES.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-full flex flex-col items-center bg-transparent text-[#e5e5e5] p-6 sm:p-8 select-none overflow-visible font-sans">
      {/* Background Gradient - Rounded to match macOS window */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3c3c3c] to-[#1e1e1e] -z-10 rounded-b-xl" />

      <div className="w-full flex flex-col items-center text-center max-w-[340px] relative">
        {/* Profile Image with Faster, Seamless Flip Animation */}
        <div className="mb-6 sm:mb-10 w-full flex justify-center perspective-[1200px]">
           <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
             <AnimatePresence initial={false}>
               <motion.div
                key={currentIdx}
                initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: -90, opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeInOut" 
                }}
                className="w-full h-full absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 drop-shadow-[0_20px_40_rgba(0,0,0,0.5)] bg-[#2a2a2a] backface-hidden"
               >
                 <img 
                  src={PROFILE_IMAGES[currentIdx]} 
                  alt="Rakey Yang"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://api.a0.dev/assets/image?text=professional%20headshot%20asian%20woman&aspect=1:1";
                  }}
                 />
               </motion.div>
             </AnimatePresence>
           </div>
        </div>

        {/* Name Title with Side-Aligned Segmented Tooltips */}
        <div className="mb-6 sm:mb-8 w-full relative">
          <h1 className="text-2xl sm:text-[32px] font-bold text-white leading-tight">Rakey Yang</h1>
          <div className="text-[#a1a1a1] text-xs sm:text-[13px] font-medium mt-1 flex justify-center gap-1.5 flex-wrap">
            
            {/* HCI Researcher with Tooltip popping to the LEFT */}
            <div className="group relative inline-block cursor-help">
              <span className="hover:text-white transition-colors">HCI Researcher</span>
              <div className="absolute top-0 right-[calc(100%+20px)] w-48 sm:w-64 p-4 bg-white text-gray-900 text-[10px] sm:text-[11px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[200] font-serif normal-case tracking-normal leading-relaxed border border-black/5 text-left italic">
                <p className="mb-2">My background is in human–computer interaction.</p>
                <p>My research focuses on wearable technologies and immersive experiences for mental health and accessible support.</p>
                {/* Arrow pointing to the text from the right */}
                <div className="absolute top-4 left-full -ml-1 border-[6px] border-transparent border-l-white"></div>
              </div>
            </div>

            <span>&</span>

            {/* Designer with Tooltip popping to the Right */}
            <div className="group relative inline-block cursor-help">
              <span className="hover:text-white transition-colors">Designer</span>
              <div className="absolute top-0 left-[calc(100%+20px)] w-48 sm:w-64 p-4 bg-white text-gray-900 text-[10px] sm:text-[11px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[200] font-serif normal-case tracking-normal leading-relaxed border border-black/5 text-left italic">
                <p className="mb-2">Design is a natural part of my practice.</p>
                <p>I learn through making and enjoy the process of creating. My research is also primarily design-led.</p>
                {/* Arrow pointing to the text from the left */}
                <div className="absolute top-4 right-full -mr-1 border-[6px] border-transparent border-r-white"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Specs Table */}
        <div className="w-full space-y-2 mb-8 sm:mb-10 px-2 sm:px-4">
          <div className="flex justify-center text-[12px] sm:text-[13px] gap-3">
            <span className="text-white text-right w-[42%] font-semibold">Instagram</span>
            <a 
              href="https://www.instagram.com/rakeyang" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 hover:underline text-left w-[58%] transition-colors truncate"
            >
              @rakeyang
            </a>
          </div>
          <div className="flex justify-center text-[12px] sm:text-[13px] gap-3">
            <span className="text-white text-right w-[42%] font-semibold">LinkedIn</span>
            <a 
              href="https://www.linkedin.com/in/rakey-yang/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 hover:underline text-left w-[58%] truncate transition-colors"
            >
              Rakey Yang
            </a>
          </div>
        </div>

        {/* View CV Button */}
        <button 
          onClick={onViewCV}
          className="px-5 py-1.5 bg-[#4d4d4d] hover:bg-[#5a5a5a] active:bg-[#3a3a3a] border border-[#666666] text-white transition-all text-[12px] sm:text-[13px] font-medium rounded-lg shadow-sm mb-10 sm:mb-12"
        >
          View CV...
        </button>

        {/* Footer */}
        <div className="text-[10px] sm:text-[11px] text-[#888888] space-y-1.5 leading-tight font-medium">
          <p 
            onClick={onOpenCertification}
            className="underline cursor-pointer hover:text-white transition-colors"
          >
            Regulatory Certification
          </p>
          <p className="opacity-70 font-sans">™ and © 1999 Rakey Yang</p>
          <p className="opacity-70 font-sans">All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
