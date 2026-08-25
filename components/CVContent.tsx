import React, { useState } from 'react';
import { Mail, Globe, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';

interface CVContentProps {
  onOpenProjectById?: (id: string) => void;
}

interface QuickLookPreviewProps {
  projectId: string;
  isVisible: boolean;
  placement?: 'top' | 'bottom' | 'right';
}

// Quick Look Preview Component for Project Snapshots
const QuickLookPreview = ({
  projectId,
  isVisible,
  placement = 'top'
}: QuickLookPreviewProps) => {
  const allProjects = Object.values(PROJECTS).flat();
  const project = allProjects.find(p => p.id === projectId);

  if (!project) return null;

  const posStyle = placement === 'right'
    ? { left: 'calc(100% + 28px)', bottom: '-8px' }
    : placement === 'bottom'
      ? { top: 'calc(100% + 12px)', right: '0' }
      : { bottom: 'calc(100% + 12px)', right: '0' };

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
            ...posStyle,
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

const SECTION_HEADER = "text-[10px] font-black uppercase tracking-[0.3em] text-gray-900 mb-5";

// Defined at module scope so its identity stays stable across CVContent re-renders;
// an inline definition would remount the span on every hover and flicker the underline.
const LinkSpan: React.FC<{
  id: string;
  children?: React.ReactNode;
  onEnter: (id: string) => void;
  onLeave: () => void;
  onOpen: (id: string) => void;
}> = ({ id, children, onEnter, onLeave, onOpen }) => (
  <span
    onMouseEnter={() => onEnter(id)}
    onMouseLeave={onLeave}
    onClick={() => onOpen(id)}
    className="preview-trigger text-gray-900 no-underline hover:underline decoration-gray-600 decoration-2 underline-offset-4 cursor-pointer transition-colors relative"
  >
    {children}
  </span>
);

const CVContent: React.FC<CVContentProps> = ({ onOpenProjectById }) => {
  const pdfUrl = "/docs/rakey-yang-cv.pdf";

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

  const handleProjectLink = (id: string) => {
    if (onOpenProjectById) onOpenProjectById(id);
  };

  return (
    <div className="px-6 sm:px-8 md:px-10 py-12 sm:py-16 md:py-20 max-w-2xl mx-auto bg-white shadow-inner min-h-full text-gray-900 overflow-visible relative">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight uppercase leading-none mb-3.5">RAKEY / RUOQING YANG</h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-sans font-medium text-gray-400">
          <span className="flex items-center gap-1.5"><Mail size={12} className="shrink-0" /> rakeyyang[at]gmail.com</span>
          <span className="flex items-center gap-1.5"><Globe size={12} className="shrink-0" /> United Kingdom</span>
        </div>
      </div>

      <div className="space-y-24">
        <div className="space-y-12">
        {/* Background */}
        <section>
          <h2 className={SECTION_HEADER}>Background</h2>
          <div className="space-y-3 text-sm text-gray-500 font-light leading-[1.7]">
            <p>I hold an MSc in Human-Computer Interaction (Distinction) from the University of Nottingham.</p>
            <p>I've worked at <a href="https://oshaped.com/" target="_blank" rel="noopener noreferrer" className="text-gray-900 no-underline hover:underline decoration-gray-600 decoration-2 underline-offset-4 transition-all">O Shaped<ArrowUpRight size={10} className="inline-block align-[-0.12em] ml-px text-gray-400" /></a> in London as an AI Specialist Intern, and previously as a freelance visual designer.</p>
          </div>
        </section>

        {/* What I'm interested in */}
        <section>
          <h2 className={SECTION_HEADER}>What I'm interested in</h2>
          <p className="text-sm text-gray-500 font-light leading-[1.7]">
            I'm interested in what it takes for a technology to hold someone. My work is about what a system can make room for. That usually means moments when a person needs space to think or feel, whether they are working through anxiety or in the middle of a decision.
          </p>
        </section>

        {/* What I do */}
        <section>
          <h2 className={SECTION_HEADER}>What I do</h2>
          <p className="text-sm text-gray-500 font-light leading-[1.7]">
            I work with extended reality and AI. I design and build the systems myself, then run mixed methods studies to find out what they actually did.
          </p>
        </section>
        </div>

        {/* Papers */}
        <section onMouseLeave={() => setHoveredProjectId(null)}>
          <h2 className={SECTION_HEADER}>Papers</h2>
          <div className="space-y-8" onMouseMove={handleContainerMouseMove}>
            <div className="group relative">
              <QuickLookPreview projectId="hci-1" isVisible={hoveredProjectId === 'hci-1'} />
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                <span className="font-bold">R. Yang</span> and C. Greenhalgh. <LinkSpan id="hci-1" onEnter={handleMouseEnter} onLeave={handleMouseLeave} onOpen={handleProjectLink}>"Comparing Experience Intensity of AR and VR for Contrasting Phobia Stimuli."</LinkSpan> <span className="italic">Virtual Reality</span>, in press, 2026.
              </p>
            </div>
            <div className="group relative">
              <QuickLookPreview projectId="hci-2" isVisible={hoveredProjectId === 'hci-2'} />
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                S. Jin, <span className="font-bold">R. Yang</span>, W. Tong, and L. H. Lee. <LinkSpan id="hci-2" onEnter={handleMouseEnter} onLeave={handleMouseLeave} onOpen={handleProjectLink}>"AIs or Humans in Luxury Shopping? A Design Study of VR Shopping Assistants."</LinkSpan> <span className="italic">2026 IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW)</span>, pp. 1155-1156, 2026.
              </p>
            </div>
            <div className="group relative">
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                S. Jin, <span className="font-bold">R. Yang</span>, and L. H. Lee. <span className="text-gray-900">"Who Should Serve You in Metaverse Luxury Stores? A Comparative Study of 3D Avatars, AI Agents, Webcam Staff, and Voice Assistants."</span> <span className="italic">Electronic Commerce Research and Applications</span>, under review, 2026.
              </p>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section onMouseLeave={() => setHoveredProjectId(null)}>
          <h2 className={SECTION_HEADER}>Activities</h2>
          <div className="relative border-l border-gray-200 pl-6 ml-1 space-y-7">
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
              <span className="block text-[10px] font-sans font-bold text-gray-400 tracking-widest mb-1">2026</span>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                GOSIM AI Spotlight, Paris <span className="text-gray-500">(Presenter)</span>
              </p>
              <div className="mt-3 w-full max-w-[480px] overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <img
                  src="/images/activities/gosim-paris.jpg"
                  alt="Presenting at GOSIM AI Spotlight, Paris 2026"
                  className="w-full block scale-[1.05] origin-[75%_50%]"
                />
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed mt-6">RealityX AI×XR Hackathon: Best AI Use Prize</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
              <span className="block text-[10px] font-sans font-bold text-gray-400 tracking-widest mb-1">2025</span>
              <p className="text-sm text-gray-500 font-light leading-relaxed">Cambridge EduX Hackathon: First Prize <span className="text-gray-500">(AI Education)</span></p>
            </div>
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
              <span className="block text-[10px] font-sans font-bold text-gray-400 tracking-widest mb-1">2021</span>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                <span className="relative inline-block">
                  <QuickLookPreview projectId="gd-album" isVisible={hoveredProjectId === 'gd-album'} placement="right" />
                  <LinkSpan id="gd-album" onEnter={handleMouseEnter} onLeave={handleMouseLeave} onOpen={handleProjectLink}>Kan Tai-Keung Design Award: Winning Work</LinkSpan>
                </span>
                <ArrowUpRight size={10} className="inline-block ml-1 text-gray-400 translate-y-[2px]" />
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-start pt-24 no-print">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-10 py-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-xl font-sans text-[10px] font-black uppercase tracking-[0.2em]"
        >
          Resume
          <ArrowUpRight size={11} />
        </a>
      </div>
    </div>
  );
};

export default CVContent;
