import React, { useState } from 'react';
import { Download, Mail, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';

interface CVContentProps {
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

const SECTION_HEADER = "text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 mb-5 border-b border-gray-100 pb-2";

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
    <div className="p-6 sm:p-8 md:p-10 max-w-2xl mx-auto bg-white shadow-inner min-h-full font-serif text-gray-900 overflow-visible relative">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight uppercase leading-none mb-3.5">RAKEY / RUOQING YANG</h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-sans font-medium text-gray-400">
          <span className="flex items-center gap-1.5"><Mail size={12} className="shrink-0" /> rakeyyang@gmail.com</span>
          <span className="flex items-center gap-1.5"><Globe size={12} className="shrink-0" /> United Kingdom</span>
        </div>
      </div>

      <div className="space-y-14">
        {/* Education */}
        <section>
          <h2 className={SECTION_HEADER}>Education</h2>
          <p className="text-[15px] text-gray-700 leading-relaxed">
            I hold an MSc in Human-Computer Interaction (Distinction) from the University of Nottingham.
          </p>
        </section>

        {/* What I'm interested in */}
        <section>
          <h2 className={SECTION_HEADER}>What I'm interested in</h2>
          <p className="text-[15px] text-gray-700 leading-relaxed">
            I'm interested in what it takes for a technology to hold someone. Most of my work is with people in emotionally demanding or excluded situations, where the design question is less about what a system can do and more about what it can make room for.
          </p>
        </section>

        {/* What I do */}
        <section>
          <h2 className={SECTION_HEADER}>What I do</h2>
          <p className="text-[15px] text-gray-700 leading-relaxed">
            I work with extended reality and AI. I design and build the systems myself, then run mixed methods studies to find out what they actually did.
          </p>
        </section>

        {/* Papers */}
        <section onMouseLeave={() => setHoveredProjectId(null)}>
          <h2 className={SECTION_HEADER}>Papers</h2>
          <div className="space-y-8" onMouseMove={handleContainerMouseMove}>
            <div className="group relative">
              <QuickLookPreview projectId="hci-1" isVisible={hoveredProjectId === 'hci-1'} />
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-bold">R. Yang</span> and C. Greenhalgh. <LinkSpan id="hci-1">"Comparing Experience Intensity of AR and VR for Contrasting Phobia Stimuli."</LinkSpan> <span className="italic">Virtual Reality</span>, in press, 2026.
              </p>
            </div>
            <div className="group relative">
              <QuickLookPreview projectId="hci-2" isVisible={hoveredProjectId === 'hci-2'} />
              <p className="text-sm text-gray-700 leading-relaxed">
                S. Jin, <span className="font-bold">R. Yang</span>, W. Tong, and L. H. Lee. <LinkSpan id="hci-2">"AIs or Humans in Luxury Shopping? A Design Study of VR Shopping Assistants."</LinkSpan> <span className="italic">2026 IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW)</span>, pp. 1155-1156, 2026.
              </p>
            </div>
            <div className="group relative">
              <p className="text-sm text-gray-700 leading-relaxed">
                S. Jin, <span className="font-bold">R. Yang</span>, and L. H. Lee. "Who Should Serve You in Metaverse Luxury Stores? A Comparative Study of 3D Avatars, AI Agents, Webcam Staff, and Voice Assistants." <span className="italic">Electronic Commerce Research and Applications</span>, under review, 2026.
              </p>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section>
          <h2 className={SECTION_HEADER}>Activities</h2>
          <div className="relative border-l border-gray-200 pl-6 ml-1 space-y-7">
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-rose-600 ring-4 ring-white" />
              <span className="block text-[10px] font-sans font-bold text-gray-400 tracking-widest mb-1">2026</span>
              <p className="text-sm text-gray-800 leading-relaxed">
                GOSIM AI Spotlight, Paris <span className="text-gray-500">(Presenter)</span>
              </p>
              <div className="mt-3 w-full max-w-[480px] overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <img
                  src="/images/activities/gosim-paris.jpg"
                  alt="Presenting at GOSIM AI Spotlight, Paris 2026"
                  className="w-full block scale-[1.05] origin-[75%_50%]"
                />
              </div>
              <p className="text-sm text-gray-800 leading-relaxed mt-6">RealityX (AI×XR) Hackathon: Best AI Use Prize</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-rose-600 ring-4 ring-white" />
              <span className="block text-[10px] font-sans font-bold text-gray-400 tracking-widest mb-1">2025</span>
              <p className="text-sm text-gray-800 leading-relaxed">Cambridge EduX Hackathon: First Prize <span className="text-gray-500">(AI Education)</span></p>
            </div>
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-rose-600 ring-4 ring-white" />
              <span className="block text-[10px] font-sans font-bold text-gray-400 tracking-widest mb-1">2021</span>
              <p className="text-sm text-gray-800 leading-relaxed">
                <span
                  onClick={() => handleProjectLink('gd-album')}
                  className="underline decoration-gray-300 hover:decoration-blue-500 hover:text-blue-600 cursor-pointer transition-colors"
                >
                  Kan Tai-Keung Design Award
                </span>: Winning Work
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-center pt-16 no-print">
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
