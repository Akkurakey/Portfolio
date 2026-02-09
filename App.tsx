import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { WindowState, WindowID, Project } from './types';
import { FOLDERS, PROJECTS } from './constants';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import ProjectGrid from './components/ProjectGrid';
import AboutContent from './components/AboutContent';
import CVContent from './components/CVContent';
import ProjectDetail from './components/ProjectDetail';

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>(() => {
    const base = FOLDERS.map((f, idx) => ({
      id: f.id,
      title: f.name,
      isOpen: false,
      isMinimized: false,
      zIndex: idx + 10,
      type: 'folder' as const,
    }));
    return [
      ...base,
      { id: 'cv', title: 'Curriculum Vitae', isOpen: false, isMinimized: false, zIndex: 50, type: 'cv' as const },
      { id: 'about', title: 'About Rakey Yang', isOpen: false, isMinimized: false, zIndex: 51, type: 'about' as const },
      { id: 'certification', title: 'Regulatory Certification', isOpen: false, isMinimized: false, zIndex: 52, type: 'project' as const }
    ];
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection/Drag State
  const [selection, setSelection] = useState<{ startX: number; startY: number; endX: number; endY: number; active: boolean }>({
    startX: 0, startY: 0, endX: 0, endY: 0, active: false
  });
  const [selectedFolderIds, setSelectedFolderIds] = useState<string[]>([]);
  const desktopRef = useRef<HTMLDivElement>(null);

  const getInitialPositions = useCallback(() => {
    if (typeof window === 'undefined') return {};
    const isMobile = window.innerWidth < 768;
    const iconSize = isMobile ? 80 : 130; 
    const width = window.innerWidth;
    const height = window.innerHeight;
    const topBarHeight = 32;

    const positions: Record<string, { x: number; y: number }> = {};
    
    // Position folders clearly to the right side
    const startX = isMobile ? width * 0.75 : width * 0.82;
    const startY = isMobile ? topBarHeight + 40 : height * 0.22;
    
    FOLDERS.forEach((f, idx) => {
      positions[f.id] = { 
        x: startX, 
        y: startY + (idx * (isMobile ? iconSize + 10 : iconSize - 5)) 
      };
    });
    return positions;
  }, []);

  const [folderPositions, setFolderPositions] = useState<Record<string, { x: number; y: number }>>(getInitialPositions);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const handleResize = () => setFolderPositions(getInitialPositions());
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [getInitialPositions]);

  // Group Drag Logic
  const handleIconDrag = (id: string, dx: number, dy: number) => {
    setFolderPositions(prev => {
      const next = { ...prev };
      const idsToMove = selectedFolderIds.includes(id) ? selectedFolderIds : [id];
      
      idsToMove.forEach(targetId => {
        if (next[targetId]) {
          next[targetId] = {
            x: next[targetId].x + dx,
            y: next[targetId].y + dy
          };
        }
      });
      return next;
    });
  };

  const handleIconMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (e.shiftKey) {
      setSelectedFolderIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else if (!selectedFolderIds.includes(id)) {
      setSelectedFolderIds([id]);
    }
  };

  // Marquee Selection Logic
  const handleDesktopMouseDown = (e: React.MouseEvent) => {
    if (e.target !== desktopRef.current) return;
    
    setSelection({
      startX: e.clientX,
      startY: e.clientY,
      endX: e.clientX,
      endY: e.clientY,
      active: true
    });
    setSelectedFolderIds([]);
  };

  const handleDesktopMouseMove = (e: React.MouseEvent) => {
    if (!selection.active) return;
    
    const newEnd = { endX: e.clientX, endY: e.clientY };
    setSelection(prev => ({ ...prev, ...newEnd }));

    // Selection logic
    const rect = {
      l: Math.min(selection.startX, e.clientX),
      r: Math.max(selection.startX, e.clientX),
      t: Math.min(selection.startY, e.clientY),
      b: Math.max(selection.startY, e.clientY)
    };

    const isMobile = window.innerWidth < 768;
    const w = isMobile ? 80 : 110;
    const h = isMobile ? 80 : 110;

    const newlySelected = FOLDERS.filter(f => {
      const pos = folderPositions[f.id];
      if (!pos) return false;
      return !(rect.l > pos.x + w || rect.r < pos.x || rect.t > pos.y + h || rect.b < pos.y);
    }).map(f => f.id);

    setSelectedFolderIds(newlySelected);
  };

  const handleDesktopMouseUp = () => {
    setSelection(prev => ({ ...prev, active: false }));
  };

  const openWindow = (id: WindowID) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id
          ? { ...win, isOpen: true, isMinimized: false, zIndex: Math.max(...prev.map((w) => w.zIndex)) + 1 }
          : win
      )
    );
  };

  const openProjectWindow = (project: Project) => {
    setWindows((prev) => {
      const existingId = `project-${project.id}`;
      const existing = prev.find(w => w.id === existingId);
      if (existing) {
        return prev.map(w => w.id === existingId 
          ? { ...w, isOpen: true, zIndex: Math.max(...prev.map(win => win.zIndex)) + 1 } 
          : w
        );
      }
      const newWin: WindowState = {
        id: existingId,
        title: project.title,
        isOpen: true,
        isMinimized: false,
        zIndex: Math.max(...prev.map(win => win.zIndex)) + 1,
        type: 'project',
        projectData: project
      };
      return [...prev, newWin];
    });
  };

  const closeWindow = (id: WindowID) => {
    setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, isOpen: false } : win)));
  };

  const focusWindow = (id: WindowID) => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex));
      const target = prev.find(w => w.id === id);
      if (target && target.zIndex === maxZ) return prev;
      return prev.map((win) => (win.id === id ? { ...win, zIndex: maxZ + 1 } : win));
    });
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setIsSearchOpen(true);
  };

  const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const allProjects = useMemo(() => Object.values(PROJECTS).flat(), []);

  const openProjectById = (projectId: string) => {
    const project = allProjects.find(p => p.id === projectId);
    if (project) {
      openProjectWindow(project);
    }
  };

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allProjects.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, allProjects]);

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: '#111', backgroundImage: `radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%)` }}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>

      {/* Top Menu Bar */}
      <div className="absolute top-0 w-full h-8 macos-glass flex items-center justify-between px-4 z-[1000] border-b border-white/5 text-[11px] sm:text-[13px] font-medium text-gray-200">
        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11,16V17.5C11,18.33 11.67,19 12.5,19C13.33,19 14,18.33 14,17.5V16H18V17.5C18,18.33 18.67,19 19.5,19C20.33,19 21,18.33 21,17.5V16C22.66,16 24,14.66 24,13C24,11.34 22.66,10 21,10C21,8.34 19.66,7 18,7C17.75,7 17.5,7.03 17.26,7.09C16.32,5.26 14.41,4 12.2,4C9.99,4 8.08,5.26 7.14,7.09C6.9,7.03 6.65,7 6.4,7C4.74,7 3.4,8.34 3.4,10C1.74,10 0.4,11.34 0.4,13C0.4,14.66 1.74,16 3.4,16H11M15.5,10.5C16.05,10.5 16.5,10.95 16.5,11.5C16.5,12.05 16.05,12.5 15.5,12.5C14.95,12.5 14.5,12.05 14.5,11.5C14.5,10.95 14.95,10.5 15.5,10.5M8.9,10.5C9.45,10.5 9.9,10.95 9.9,11.5C9.9,12.05 9.45,12.5 8.9,12.5C8.35,12.5 7.9,12.05 7.9,11.5C7.9,10.95 8.35,10.5 8.9,10.5Z" />
            </svg>
            <span className="font-bold hidden sm:inline">Rakey Yang</span>
          </div>
          <button onClick={() => openWindow('about')} className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors">About</button>
          <button onClick={() => openWindow('cv')} className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors hidden xs:block">CV</button>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button onClick={() => setIsSearchOpen(true)} className="hover:bg-white/10 p-1 rounded transition-colors"><Search className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-90" /></button>
          <span className="opacity-70 hidden md:inline">{formatDate(currentTime)}</span>
          <span className="opacity-70">{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* Desktop Container */}
      <div 
        ref={desktopRef}
        onMouseDown={handleDesktopMouseDown}
        onMouseMove={handleDesktopMouseMove}
        onMouseUp={handleDesktopMouseUp}
        className="relative w-full h-full pt-12"
      >
        {/* Selection Box */}
        {selection.active && (
          <div 
            style={{
              position: 'fixed',
              left: Math.min(selection.startX, selection.endX),
              top: Math.min(selection.startY, selection.endY),
              width: Math.abs(selection.startX - selection.endX),
              height: Math.abs(selection.startY - selection.endY),
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              border: '1.5px solid rgba(59, 130, 246, 0.4)',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Folder Icons */}
        {FOLDERS.map((folder) => (
          <DesktopIcon 
            key={folder.id} 
            name={folder.name} 
            id={folder.id}
            isSelected={selectedFolderIds.includes(folder.id)}
            x={folderPositions[folder.id]?.x || 0} 
            y={folderPositions[folder.id]?.y || 0} 
            onDoubleClick={() => openWindow(folder.id)} 
            onMouseDown={handleIconMouseDown}
            onDrag={handleIconDrag}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          isOpen={win.isOpen}
          zIndex={win.zIndex}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => closeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          initialWidth={
            win.id === 'certification' ? 240 : 
            win.type === 'project' ? 950 : 
            win.type === 'about' ? 340 : 
            (win.id === 'cv' ? 900 : undefined)
          }
          initialHeight={
            win.id === 'certification' ? 240 : 
            win.type === 'project' ? 650 : 
            win.type === 'about' ? 520 : 
            (win.id === 'cv' ? 850 : undefined)
          }
        >
          {win.type === 'about' && <AboutContent onViewCV={() => openWindow('cv')} onOpenCertification={() => openWindow('certification')} />}
          {win.type === 'cv' && <CVContent onOpenFolder={openWindow} onOpenProjectById={openProjectById} />}
          {win.type === 'folder' && <ProjectGrid title={win.title} projects={PROJECTS[win.id as WindowID] || []} onOpenProject={openProjectWindow} />}
          {win.type === 'project' && win.projectData && (
            <ProjectDetail 
              project={win.projectData} 
              onTagClick={handleTagClick} 
              onOpenProjectById={openProjectById}
            />
          )}
          {win.id === 'certification' && (
            <div className="w-full h-full bg-white flex items-center justify-center p-3">
               <img 
                 src="https://lh3.googleusercontent.com/d/10dqGRhpL9swqxlGeAOWyanpSrLF9tgHs" 
                 alt="Regulatory Certification" 
                 className="max-w-full max-h-full object-contain shadow-md rounded-sm"
               />
            </div>
          )}
        </Window>
      ))}

      {/* Spotlight Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-[15%] px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setIsSearchOpen(false)} />
            <motion.div initial={{ scale: 0.92, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: -20 }} className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden border border-white/20">
              <div className="flex items-center p-4 md:p-5 border-b border-black/5">
                <Search className="w-5 h-5 md:w-6 md:h-6 text-blue-500 mr-3 md:mr-4" />
                <input autoFocus type="text" placeholder="Spotlight Search" className="bg-transparent border-none outline-none text-xl md:text-2xl text-gray-900 w-full placeholder:text-gray-300 font-light" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Escape' && setIsSearchOpen(false)} />
              </div>
              <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                {searchQuery.trim() !== '' && filteredResults.map((result) => (
                  <div key={result.id} className="flex items-center p-3 m-2 rounded-xl hover:bg-blue-600 group cursor-pointer" onClick={() => { openProjectWindow(result); setIsSearchOpen(false); setSearchQuery(''); }}>
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-white/20">
                       <svg className="w-6 h-6 text-blue-400 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4L12 6H20C21.1 6 22 6.9 22 8V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H10Z" /></svg>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-semibold text-gray-800 group-hover:text-white truncate text-sm">{result.title}</h4>
                      <p className="text-[11px] text-gray-500 group-hover:text-white/80 truncate">{result.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
