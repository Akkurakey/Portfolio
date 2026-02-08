import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectGridProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  title?: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onOpenProject, title }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-10 md:p-20 text-gray-300 italic font-light uppercase tracking-widest bg-white">
        Folder is empty
      </div>
    );
  }

  // Helper to extract the first complete sentence ending in . ! or ?
  const getFirstSentence = (text: string) => {
    if (!text) return '';
    const match = text.match(/^.*?[.!?](?:\s|$)/);
    const sentence = match ? match[0].trim() : text.trim();
    return sentence;
  };

  return (
    <div className="bg-[#e8e8e8] min-h-full font-sans relative">
      {/* Background Blueprint Grid Lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 md:grid-cols-8 h-full w-full">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border-r border-black/[0.03] h-full" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 relative z-10 border-l border-black/[0.08]">
        {projects.map((project) => {
          const isArGallery = project.id === 'xr-2';
          const isMsi = project.id === 'gd-msi';
          const isRhythmGame = project.id === 'xr-1';
          const isHci1 = project.id === 'hci-1';
          const isHci2 = project.id === 'hci-2';
          
          const useContain = isArGallery || isMsi || isHci1 || isHci2;
          const isHovered = hoveredId === project.id;
          
          return (
            <div 
              key={project.id} 
              onClick={() => onOpenProject(project)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex flex-col border-r border-b border-black/[0.08] bg-[#e8e8e8] hover:bg-white transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Image Section - Responsive Aspect Ratio */}
              <div className={`relative aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] overflow-hidden border-b border-black/[0.08] ${
                isArGallery ? 'bg-black p-6 sm:p-8' : 
                isMsi ? 'bg-gray-100/50 p-6 sm:p-8' : 
                isRhythmGame ? 'bg-zinc-900' : 
                isHci1 ? 'bg-black/5 p-4 sm:p-6' : 
                isHci2 ? 'bg-black p-4 sm:p-6' : ''
              }`}>
                <img
                  src={isHovered && project.hoverImageUrl ? project.hoverImageUrl : project.imageUrl}
                  alt={project.title}
                  className={`absolute inset-0 w-full h-full transition-all duration-1000 grayscale-[20%] group-hover:grayscale-0 ${
                    isHci1 ? 'object-contain scale-[0.8]' : 
                    isHci2 ? 'object-contain scale-[0.9]' :
                    (useContain ? 'object-contain scale-[0.9]' : 'object-cover')
                  } ${
                    useContain && !isArGallery && !isHci1 && !isHci2 ? 'group-hover:scale-[0.95]' : ''
                  }`}
                  loading="lazy"
                />
                {!useContain && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                )}
              </div>

              {/* Information Section */}
              <div className="flex flex-col p-4 sm:p-5 md:p-7 lg:p-8 flex-grow relative">
                
                {/* 1. Technical Meta Text - Show first sentence fully without truncation dots */}
                <div className="mb-4 md:mb-6 max-w-[340px] min-h-[36px] sm:min-h-[44px]">
                  <p className="text-[10px] sm:text-[11px] leading-relaxed text-gray-900 font-medium italic font-serif">
                    {getFirstSentence(project.description)}
                  </p>
                </div>

                {/* 2. Status Bars */}
                <div className="mb-4 md:mb-6 flex items-center">
                  <div className="flex gap-[2px] sm:gap-[3px] opacity-70">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-[2px] h-2.5 sm:w-[3px] sm:h-3.5 bg-gray-950" />
                    ))}
                  </div>
                </div>

                {/* 3. Architectural Title */}
                <div className="mt-auto relative">
                  <div className="h-[1px] w-6 bg-black/10 mb-2 sm:mb-3 group-hover:w-full transition-all duration-700 ease-in-out" />
                  
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-[900] text-gray-950 leading-[1.1] tracking-[-0.04em] uppercase">
                    {project.title}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Footer Watermark */}
        <div className={`col-span-1 sm:col-span-2 flex items-center justify-between px-6 py-4 border-b border-black/[0.08] bg-[#e8e8e8]/50`}>
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-400">RAKEY YANG ARCHIVE</span>
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-400">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;