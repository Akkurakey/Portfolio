import React from 'react';
import { Download, Mail, Phone, Globe, ArrowUpRight } from 'lucide-react';
import { WindowID } from '../types';

interface CVContentProps {
  onOpenFolder?: (id: WindowID) => void;
  onOpenProjectById?: (id: string) => void;
}

const CVContent: React.FC<CVContentProps> = ({ onOpenFolder, onOpenProjectById }) => {
  const pdfUrl = "https://drive.google.com/file/d/1XJmqgCbdfOjyt9DO1MjjNL1_9wJEGjjQ/view?usp=sharing";

  const handleFolderClick = (id: WindowID) => {
    if (onOpenFolder) {
      onOpenFolder(id);
    }
  };

  const handleProjectLink = (id: string) => {
    if (onOpenProjectById) {
      onOpenProjectById(id);
    }
  };

  const LinkSpan = ({ children, id }: { children?: React.ReactNode; id: string }) => (
    <span 
      onClick={() => handleProjectLink(id)}
      className="underline decoration-gray-300 hover:decoration-blue-500 hover:text-blue-600 cursor-pointer transition-colors"
    >
      {children}
    </span>
  );

  return (
    <div className="p-6 sm:p-8 md:p-10 lg:p-10 max-w-4xl mx-auto bg-white shadow-inner min-h-full font-serif text-gray-900 overflow-x-hidden">
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

      {/* Main Grid: 8/12 and 4/12 split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-16 items-start">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 space-y-16">
          {/* Education */}
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 mb-6 border-b border-gray-100 pb-2">Education</h2>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg">University of Nottingham</h3>
                  <span className="text-gray-400 font-sans text-[10px]">2023 — 2024</span>
                </div>
                <p className="text-gray-700 font-medium italic">MSc Human-Computer Interaction (Distinction)</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg">Ningbo University</h3>
                  <span className="text-gray-400 font-sans text-[10px]">2018 — 2022</span>
                </div>
                <p className="text-gray-700 font-medium italic">BSc Logistics and Supply Chain Management</p>
              </div>
            </div>
          </section>

          {/* Publications & Research */}
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 mb-6 border-b border-gray-100 pb-2">Publications & Research</h2>
            <div className="space-y-8">
              <div className="group">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold">R. Yang</span> and C. Greenhalgh. <LinkSpan id="hci-1">"Comparative Effectiveness of Virtual Reality and Augmented Reality for Virtual Exposure Therapy Applications."</LinkSpan> <span className="italic">Virtual Reality</span>, under review, 2025.
                </p>
              </div>
              <div className="group">
                <p className="text-sm text-gray-700 leading-relaxed">
                  S. Jin, <span className="font-bold">R. Yang</span>, W. Tong, and L. H. Lee. <LinkSpan id="hci-2">"AIs or Humans in Luxury Shopping? A Design Study of VR Shopping Assistants."</LinkSpan> <span className="italic">IEEE Conference on Virtual Reality and 3D User Interfaces (IEEE VR)</span>, poster accepted, 2026.
                </p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 mb-6 border-b border-gray-100 pb-2">Experience</h2>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg uppercase tracking-tight">AI Video Specialist</h3>
                <span className="text-gray-400 font-sans text-[10px]">Aug 2024 — Nov 2024</span>
              </div>
              <p className="text-gray-700 italic text-sm">
                <a href="https://oshaped.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors underline decoration-gray-300 underline-offset-2">O Shaped</a> • London, UK
              </p>
            </div>
          </section>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4 space-y-16">
          {/* Expertise */}
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6 border-b border-gray-50 pb-2">Expertise</h2>
            <div className="space-y-6 font-sans text-[11px] leading-relaxed">
              <div>
                <h4 className="font-black text-gray-300 mb-1.5 tracking-widest text-[9px] uppercase">Hci</h4>
                <p className="text-gray-700">Experimental Design / User Studies / Questionnaire Design / Semi-structured Interviewing / Ethnographic Methods</p>
              </div>
              <div>
                <h4 className="font-black text-gray-300 mb-1.5 tracking-widest text-[9px] uppercase">Implement</h4>
                <p className="text-gray-700">
                  XR Prototyping (Unity, C#) / Spark AR / Git & Version Control
                </p>
              </div>
              <div>
                <h4 className="font-black text-gray-300 mb-1.5 tracking-widest text-[9px] uppercase">Research</h4>
                <p className="text-gray-700">
                  Mixed-methods Research (Qual/Quant) / Data Analysis (SPSS) / Academic Writing / Data Visualisation (Academic Poster)
                </p>
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

          {/* Recognition */}
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6 border-b border-gray-50 pb-2">Recognition</h2>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold font-sans uppercase tracking-tight text-gray-900 leading-tight mb-1">
                  <LinkSpan id="ai-5">Cambridge EduX Hackathon '25</LinkSpan>
                </p>
                <span className="block text-[10px] text-rose-600 font-black uppercase tracking-wider">First Prize: AI Education</span>
              </div>
              <div>
                <p className="text-xs font-bold font-sans uppercase tracking-tight text-gray-900 leading-tight mb-1">
                  <LinkSpan id="gd-album">Kan Tai-Keung Design Award '21</LinkSpan>
                </p>
                <span className="block text-[10px] text-rose-600 font-black uppercase tracking-wider">Winning Work</span>
              </div>
            </div>
          </section>

          {/* Interests */}
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

      {/* Footer / CTA */}
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
