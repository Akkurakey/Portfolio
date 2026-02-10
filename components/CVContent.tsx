import React, { useState } from 'react';
import { Download, Mail, Phone, Globe, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WindowID } from '../types';
import { PROJECTS } from '../constants';

interface CVContentProps {
  onOpenFolder?: (id: WindowID) => void;
  onOpenProjectById?: (id: string) => void;
}

interface QuickLookPreviewProps {
  projectId: string;
  isVisible: boolean;
}

// Quick Look Preview Component for Project Snapshots
const QuickLookPreview = ({ 
  projectId, 
  isVisible
}: QuickLookPreviewProps) => {
  const allProjects = Object.values(PROJECTS).flat();
  const project = allProjects.find(p => p.id === projectId);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 12px)',
            right: '0',
            zIndex: 3000,
            pointerEvents: 'none',
          }}
          className="w-[260px] overflow-hidden rounded-[20px] bg-white/95 backdrop-blur-3xl shadow-[0_15px_45px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.05)] border border-white/20 flex flex-col"
        >
          {/* Project Snapshot Image */}
          <div className="w-full aspect-video bg-gray-100 overflow-hidden relative">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
          {/* Project Details */}
          <div className="p-5 flex flex-col bg-white/40">
            <h4 className="text-[10px] font-black uppercase tracking-tight text-gray-950 mb-1.5 leading-tight">
              {project.title}
            </h4>
            <p className="text-[10px] text-gray-500 font-serif italic leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CVContent: React.FC<CVContentProps> = ({ onOpenFolder, onOpenProjectById }) => {
  const pdfUrl = "https://drive.google.com/file/d/1XJmqgCbdfOjyt9DO1MjjNL1_9wJEGjjQ/view?usp=sharing";
  
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setHoveredProjectId(id);
  };

  const handleMouseLeave = () => {
    setHoveredProjectId(null);
  };

  // Safe cleanup: if mouse moves rapidly and misses the LinkSpan's own leave event,
  // this container-level check will catch it and reset the state.
  const handleContainerMouseMove = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isOverTrigger = target.closest('.preview-trigger');
    if (!isOverTrigger && hoveredProjectId !== null) {
      setHoveredProjectId(null);
    }
  };

  const handleFolderClick = (id: WindowID) => {
    if (onOpenFolder) onOpenFolder(id);
  };

  const handleProjectLink = (id: string) => {
    if (onOpenProjectById) onOpenProjectById(id);
  };

  const LinkSpan = ({ children, id }: { children?: React.ReactNode; id: string }) => (
    <span 
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleProjectLink(id)}
      className="preview-trigger underline decoration-gray-300 hover:decoration-blue-500 hover:text-blue-600 cursor-pointer transition-colors relative"
    >
      {children}
    </span>
  );

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-10 max-w-4xl mx-auto bg-white shadow-inner min-h-full font-serif text-gray-900 overflow-visible relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-gray-900 pb-8 mb-10 gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2 uppercase break-words leading-[0.9]">RAKEY / RUOQING YANG</h1>
          <p className="text-sm sm:text-base md:text-lg font-medium text-gray-400 italic">HCI Researcher • XR Interaction Designer</p>
        </div>
        <div className="text-left md:text-right text-xs sm:text-sm space-y-1.5 font-sans font-medium text-gray-400 shrink-0">
          <div className="flex items-center md:justify-end gap-2"><Mail size={12} className="shrink-0" /> rakeyyang@gmail.com</div>
          <div className="flex items-center md:justify-end gap-2"><Phone size={12} className="shrink-0" /> +44(0) 735 539 9713</div>
          <div className="flex items-center md:justify-end gap-2"><Globe size={12} className="shrink-0" /> United Kingdom</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-16 items-start">
        <div className="lg:col-span-8 space-y-16">
          {/* Education */}
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 mb-6 border-b border-gray-100 pb-2">Education</h2>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">University of Nottingham</h3>
                  <span className="text-gray-400 font-sans text-[10px]">2023 — 2024</span>
                </div>
                <p className="text-gray-700 font-medium italic text-sm">MSc Human-Computer Interaction (Distinction)</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">Ningbo University</h3>
                  <span className="text-gray-400 font-sans text-[10px]">2018 — 2022</span>
                </div>
                <p className="text-gray-700 font-medium italic text-sm">BSc Logistics and Supply Chain Management</p>
              </div>
            </div>
          </section>

          {/* ACADEMIC PAPERS */}
          <section onMouseLeave={() => setHoveredProjectId(null)}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 mb-6 border-b border-gray-100 pb-2">ACADEMIC PAPERS</h2>
            <div className="space-y-8" onMouseMove={handleContainerMouseMove}>
              <div className="group relative">
                <QuickLookPreview 
                  projectId="hci-1" 
                  isVisible={hoveredProjectId === 'hci-1'} 
                />
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold">R. Yang</span> and C. Greenhalgh. <LinkSpan id="hci-1">"Comparative Effectiveness of Virtual Reality and Augmented Reality for Virtual Exposure Therapy Applications."</LinkSpan> <span className="italic">Virtual Reality</span>, under review, 2025.
                </p>
              </div>
              <div className="group relative">
                <QuickLookPreview 
                  projectId="hci-2" 
                  isVisible={hoveredProjectId === 'hci-2'} 
                />
                <p className="text-sm text-gray-700 leading-relaxed">
                  S. Jin, <span className="font-bold">R. Yang</span>, W. Tong, and L. H. Lee. <LinkSpan id="hci-2">"AIs or Humans in Luxury Shopping? A Design Study of VR Shopping Assistants."</LinkSpan> <span className="italic">IEEE Conference on Virtual Reality and 3D User Interfaces (IEEE VR)</span>, poster accepted, 2026.
                </p>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 mb-6 border-b border-gray-100 pb-2">Professional Experience</h2>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-base uppercase tracking-tight">AI Video Specialist</h3>
                <span className="text-gray-400 font-sans text-[10px]">Aug 2024 — Nov 2024</span>
              </div>
              <p className="text-gray-700 italic text-[13px]">
                <a href="https://oshaped.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors underline decoration-gray-300 underline-offset-2">O Shaped</a> • London, UK
              </p>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-16">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6 border-b border-gray-50 pb-2">Expertise</h2>
            <div className="space-y-6 font-sans text-[11px] leading-relaxed">
              <div>
                <h4 className="font-black text-gray-300 mb-1.5 tracking-widest text-[9px] uppercase">Hci</h4>
                <p className="text-gray-700">Experimental Design / User Studies / Questionnaire Design / Semi-structured Interview / Ethnographic Methods</p>
              </div>
              <div>
                <h4 className="font-black text-gray-300 mb-1.5 tracking-widest text-[9px] uppercase">Implement</h4>
                <p className="text-gray-700">XR Prototyping (Unity, C#; Spark AR) / Git & Version Control</p>
              </div>
              <div>
                <h4 className="font-black text-gray-300 mb-1.5 tracking-widest text-[9px] uppercase">Research</h4>
                <p className="text-gray-700">Mixed-methods Research (Qual/Quant) / Data Analysis (SPSS) / Academic Writing / Data Visualisation (Academic Poster)</p>
              </div>
              <div>
                <h4 className="font-black text-gray-300 mb-2 tracking-widest text-[9px] uppercase">Design</h4>
                <div className="space-y-2 relative">
                  <div className="group cursor-help relative inline-block w-full">
                    <p className="text-gray-700 underline decoration-dotted decoration-gray-300 underline-offset-4 tracking-wider font-bold">User-Centred Design Methods</p>
                    <div className="absolute left-0 lg:left-auto lg:right-full top-full lg:top-0 mt-2 lg:mt-0 lg:mr-4 w-56 p-3 bg-gray-900 text-white text-[10px] rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[110] font-sans normal-case tracking-normal leading-normal border border-white/10">
                      User Research, Personas, Empathy Mapping, Stakeholder Mapping, User Journey Mapping, Task Analysis, Storyboarding
                    </div>
                  </div>
                  <div className="group cursor-help relative inline-block w-full">
                    <p className="text-gray-700 underline decoration-dotted decoration-gray-300 underline-offset-4 tracking-wider font-bold">UI/Visual Design Tools</p>
                    <div className="absolute left-0 lg:left-auto lg:right-full top-full lg:top-0 mt-2 lg:mt-0 lg:mr-4 w-56 p-3 bg-gray-900 text-white text-[10px] rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[110] font-sans normal-case tracking-normal leading-normal border border-white/10">
                      Figma, Blender, C4D, Adobe Suite (Ps, Ai), Comfy UI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6 border-b border-gray-50 pb-2">Recognition</h2>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold font-sans uppercase tracking-tight text-gray-900 hover:text-blue-600 transition-colors cursor-pointer leading-tight mb-1" onClick={() => handleProjectLink('ai-5')}>
                  Cambridge EduX Hackathon '25
                </p>
                <span className="block text-[10px] text-rose-600 font-black uppercase tracking-wider">First Prize: AI Education</span>
              </div>
              <div>
                <p className="text-xs font-bold font-sans uppercase tracking-tight text-gray-900 hover:text-blue-600 transition-colors cursor-pointer leading-tight mb-1" onClick={() => handleProjectLink('gd-album')}>
                  Kan Tai-Keung Design Award '21
                </p>
                <span className="block text-[10px] text-rose-600 font-black uppercase tracking-wider">Winning Work</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6 border-b border-gray-50 pb-2">Interests</h2>
            <div className="w-full">
              <p 
                onClick={() => handleFolderClick('web_ai')}
                className="text-xs font-bold font-sans uppercase tracking-tight text-gray-900 leading-tight mb-1 cursor-pointer hover:text-blue-600 transition-colors inline-flex items-center gap-1 group whitespace-nowrap"
              >
                Web & AI Dev <ArrowUpRight size={10} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
              </p>
              <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">Experimental Projects</span>
            </div>
          </section>
        </div>
      </div>

      <div className="flex justify-center pt-20 no-print">
        <a 
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-10 py-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-xl font-sans text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <Download size={14} />
          Full Resume PDF
        </a>
      </div>
    </div>
  );
};

export default CVContent;
