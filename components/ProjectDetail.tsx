import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { Loader2, ExternalLink, Music, ArrowUpRight, FileText, ChevronDown, Link as LinkIcon, Image as ImageIcon, LayoutGrid } from 'lucide-react';

// Moved helper component outside to ensure stable reference and explicit children prop typing
const ScholarlySectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">{children}</h3>
);

// Moved logic outside of the main component for better organization
const renderAbstractContent = (text: string) => {
  const keywordMarkers = ['Keywords:', 'Index Terms:'];
  let markerFound = keywordMarkers.find(marker => text.includes(marker));
  
  if (!markerFound) return text;
  
  const parts = text.split(markerFound);
  return (
    <>
      {parts[0]}
      <span className="font-bold not-italic">{markerFound}</span>
      {parts[1]}
    </>
  );
};

interface ProjectDetailProps {
  project: Project;
  onTagClick?: (tag: string) => void;
  onOpenProjectById?: (id: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onTagClick, onOpenProjectById }) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const isDualPhobia = project.id === 'hci-1';
  const isShoppingAssistants = project.id === 'hci-2';
  const isArGallery = project.id === 'xr-2';
  const isRhythmGame = project.id === 'xr-1';

  // Enhanced helper to convert standard video links to embeddable ones
  const getEmbedUrl = (url?: string) => {
    if (!url) return '';
    
    // Google Drive
    if (url.includes('drive.google.com')) {
      return url.replace(/\/view(\?.*)?$/, '/preview').replace(/\/sharing(\?.*)?$/, '/preview').replace(/\?usp=drive_link$/, '/preview');
    }
    
    // YouTube (using youtube-nocookie for better compatibility)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split(/[?#]/)[0];
      } else if (url.includes('v=')) {
        videoId = url.split('v=')[1].split(/[&?#]/)[0];
      } else if (url.includes('embed/')) {
        videoId = url.split('embed/')[1].split(/[?#]/)[0];
      }
      
      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`;
      }
    }

    // Vimeo
    if (url.includes('vimeo.com')) {
      if (url.includes('player.vimeo.com')) return url;
      const videoId = url.split('vimeo.com/')[1].split(/[?#]/)[0];
      if (videoId) return `https://player.vimeo.com/video/${videoId}`;
    }

    return url;
  };

  // Convert Spotify link to embed URL
  const getSpotifyEmbedUrl = (url?: string) => {
    if (!url) return '';
    // Expected format: https://open.spotify.com/album/ID or https://open.spotify.com/track/ID
    return url.replace('open.spotify.com/', 'open.spotify.com/embed/');
  };

  const isIframeMode = project.externalUrl && project.images.length <= 1;

  useEffect(() => {
    if (!isIframeMode) return;

    const calculateScale = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const referenceWidth = 1440;
      const referenceHeight = 900;
      const scaleW = width / referenceWidth;
      const scaleH = height / referenceHeight;
      setScale(Math.min(scaleW, scaleH, 1));
    };

    window.addEventListener('resize', calculateScale);
    calculateScale();
    return () => window.removeEventListener('resize', calculateScale);
  }, [isIframeMode, project.externalUrl]);

  if (isIframeMode && project.externalUrl) {
    const displayUrl = project.externalUrl.replace(/^https?:\/\//, '');
    return (
      <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden flex flex-col">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 text-center px-4">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Connecting to {displayUrl}...
            </p>
          </div>
        )}
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          {project.galleryUrl && (
            <a href={project.galleryUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white/90 backdrop-blur shadow-md rounded-full text-gray-500 hover:text-blue-500 transition-colors border border-gray-100 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              <LayoutGrid size={12} />
              <span>Digital Gallery</span>
            </a>
          )}
          <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/90 backdrop-blur shadow-md rounded-full text-gray-400 hover:text-blue-500 transition-colors border border-gray-100 flex items-center justify-center">
            <ExternalLink size={14} />
          </a>
        </div>
        <div className="flex-grow flex items-center justify-center bg-[#f0f0f0] overflow-hidden">
          <div style={{ width: '1440px', height: '900px', transform: `scale(${scale})`, transformOrigin: 'center center', flexShrink: 0 }} className="shadow-2xl bg-white">
            <iframe 
              src={project.externalUrl} 
              className="w-full h-full border-none" 
              onLoad={() => setIsLoading(false)} 
              title={project.title} 
              allowFullScreen 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
        </div>
      </div>
    );
  }

  let coordinates = '52.9548° N, 1.1581° W';
  if (isArGallery) coordinates = '52.9392° N, 1.1947° W'; 
  else if (isDualPhobia) coordinates = '52.9533° N, 1.1874° W'; // Nottingham Jubilee Campus CS Building
  else if (isShoppingAssistants) coordinates = '52.9533° N, 1.1874° W\n52.2110° N, 0.0917° E'; // Nottingham / Cambridge
  else if (project.id === 'gd-album' || project.id === 'gd-msi') coordinates = '29.7740° N, 121.9050° E';
  else if (project.id === 'gd-5') coordinates = '34.6197° N, 112.4545° E';
  else if (project.id === 'gd-live-show') coordinates = '29.8942° N, 121.5516° E';

  const scrollToPdf = () => pdfRef.current?.scrollIntoView({ behavior: 'smooth' });

  const renderSpecsBar = (specs?: { label: string; value: string }[]) => {
    if (!specs || specs.length === 0) return null;
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-gray-100 mb-8">
        {specs.map((spec, i) => (
          <div key={i}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">{spec.label}</h4>
            <p className="text-xs font-bold text-gray-900">{spec.value}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderProjectImages = () => {
    if (isDualPhobia) return null;

    if (isArGallery && project.images.length >= 2) {
      return (
        <div className="space-y-12 md:space-y-24 flex flex-col items-center w-full">
          {/* Side-by-Side Images */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full md:w-[95%] lg:w-[90%] items-center justify-center mx-auto px-4 md:px-0">
            <div className="flex-[4] flex overflow-hidden rounded-xl shadow-lg border border-black/5 h-[22vh] sm:h-[28vh] md:h-[32vh] lg:h-[38vh]">
              <img src={project.images[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-[6] flex overflow-hidden rounded-xl shadow-lg border border-black/5 h-[22vh] sm:h-[28vh] md:h-[32vh] lg:h-[38vh]">
              <img src={project.images[1]} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Remaining Images */}
          {project.images.slice(2).map((img, i) => (
            <div key={i + 2} className="group w-full md:w-[90%] lg:w-[85%] xl:w-[80%] overflow-hidden rounded-xl">
              <img src={img} alt="" className="w-full h-auto max-h-[80vh] object-contain shadow-md border border-black/[0.03]" loading="lazy" />
            </div>
          ))}
        </div>
      );
    }

    if (isShoppingAssistants) {
      const captions = [
        'Overall Experimental Procedure',
        'Interaction Details between Consumers and Shopping Assistants'
      ];
      return (
        <div className="space-y-16 md:space-y-24 flex flex-col items-center w-full">
          {project.images.map((img, i) => (
            <div key={i} className="w-full md:w-[90%] lg:w-[85%] xl:w-[80%] flex flex-col items-center gap-4">
              <div className="group w-full overflow-hidden rounded-xl flex justify-center">
                <img src={img} alt={captions[i] || ''} className="w-full h-auto max-h-[80vh] object-contain shadow-md border border-black/[0.03] transition-all" loading="lazy" />
              </div>
              {captions[i] && (
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 text-center max-w-lg">
                  {captions[i]}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (project.id === 'gd-msi' && project.images.length >= 3) {
      return (
        <div className="space-y-12 md:space-y-20 lg:space-y-28 flex flex-col items-center w-full">
          <div className="group w-full md:w-[90%] lg:w-[85%] xl:w-[80%] overflow-hidden rounded-xl flex justify-center">
            <img src={project.images[0]} alt="" className="w-full h-auto max-h-[80vh] object-contain shadow-md border border-black/[0.03] transition-all duration-700" loading="lazy" />
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-[90%] lg:w-[85%] xl:w-[80%] items-stretch">
            <div className="flex-1 overflow-hidden rounded-xl flex justify-center bg-gray-50/50">
              <img src={project.images[1]} alt="" className="w-full h-full min-h-[30vh] md:min-h-[40vh] object-cover shadow-md border border-black/[0.03] transition-all duration-700" loading="lazy" />
            </div>
            <div className="flex-1 overflow-hidden rounded-xl flex justify-center bg-gray-50/50">
              <img src={project.images[2]} alt="" className="w-full h-full min-h-[30vh] md:min-h-[40vh] object-cover shadow-md border border-black/[0.03] transition-all duration-700" loading="lazy" />
            </div>
          </div>
          {project.images.slice(3).map((img, i) => (
            <div key={i + 3} className="group w-full md:w-[90%] lg:w-[85%] xl:w-[80%] overflow-hidden rounded-xl flex justify-center">
              <img src={img} alt="" className="w-full h-auto max-h-[80vh] object-contain shadow-md border border-black/[0.03] transition-all duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-12 md:space-y-20 lg:space-y-28 flex flex-col items-center w-full">
        {project.images.map((img, i) => (
          <div key={i} className="group w-full md:w-[90%] lg:w-[85%] xl:w-[80%] overflow-hidden rounded-xl flex justify-center">
            <img src={img} alt="" className="w-full h-auto max-h-[70vh] md:max-h-[80vh] object-contain shadow-md md:shadow-xl border border-black/[0.03] transition-all duration-700 ease-in-out" loading="lazy" />
          </div>
        ))}
      </div>
    );
  };

  const renderExperimentalFlow = () => {
    if (!isDualPhobia) return null;
    const lines = (project.fullContent || '').split('\n').filter(l => l.trim());

    return (
      <div className="space-y-16 md:space-y-24">
        {/* Step 1: Text + NEW Prototype Image + Jump Link */}
        <div className="space-y-6">
          <p className="text-gray-600 font-serif italic text-sm sm:text-[15px] leading-[1.8] font-light">
            {lines[0]}
          </p>
          <img src={project.images[0]} alt="Exposure Prototype" className="w-full h-auto block rounded-xl border border-black/[0.03]" />
          {project.prototypeUrl ? (
            <a 
              href={project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
            >
              <ArrowUpRight size={12} />
              {project.relatedProjectTitle || 'Open Paper'}
            </a>
          ) : project.relatedProjectId && (
            <button 
              onClick={() => onOpenProjectById?.(project.relatedProjectId!)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
            >
              <LinkIcon size={12} />
              {project.relatedProjectTitle || 'View Related Project'}
            </button>
          )}
        </div>

        {/* Step 2: Text + Dual Images (STACKED Vertically) */}
        <div className="space-y-12">
          <p className="text-gray-600 font-serif italic text-sm sm:text-[15px] leading-[1.8] font-light">
            {lines[1]}
          </p>
          <div className="space-y-6">
             <img src={project.images[1]} alt="Experimental Task Participant" className="w-full h-auto block rounded-xl border border-black/[0.03]" />
             <img src={project.images[2]} alt="Experimental Task Recorded Session" className="w-full h-auto block rounded-xl border border-black/[0.03]" />
          </div>
        </div>

        {/* Step 3: Text + Single Image (Analysis) */}
        <div className="space-y-8">
          <p className="text-gray-600 font-serif italic text-sm sm:text-[15px] leading-[1.8] font-light">
            {lines[2]}
          </p>
          <img src={project.images[3]} alt="Data Analysis Results" className="w-full h-auto block rounded-xl border border-black/[0.03]" />
        </div>
      </div>
    );
  };

  const renderVideo = () => {
    if (!project.videoUrl) return null;
    return (
      <div className="flex justify-center mb-8">
        <div className="relative aspect-video w-full lg:w-[95%] rounded-xl overflow-hidden shadow-2xl bg-black border border-black/5">
          <iframe 
            src={getEmbedUrl(project.videoUrl)} 
            className="absolute inset-0 w-full h-full border-none" 
            allowFullScreen 
            title={project.title} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      </div>
    );
  };

  const videoAtTop = !isDualPhobia && project.videoPosition !== 'bottom';
  const videoAtBottom = !isDualPhobia && project.videoPosition === 'bottom';

  const renderRhythmGameLayout = () => {
    if (!isRhythmGame) return null;
    
    return (
      <div className="space-y-20 md:space-y-32">
        <div className="w-full overflow-hidden rounded-2xl shadow-xl bg-gray-100 border border-black/[0.03]">
          <img 
            src={project.images[0]} 
            alt="Gameplay Hero" 
            className="w-full h-auto max-h-[85vh] object-contain mx-auto"
          />
        </div>

        {renderSpecsBar(project.specs)}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
          <div className="w-full lg:flex-1 flex min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]">
            <div className="w-full h-full overflow-hidden rounded-2xl shadow-xl bg-gray-100 border border-black/[0.03]">
              <img src={project.images[1]} alt="Gameplay Detail A" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]">
             <div className="w-full h-full overflow-hidden rounded-2xl shadow-xl bg-gray-100 border border-black/[0.03]">
               <img src={project.images[2]} alt="Gameplay Detail B" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>

        <div className="py-16 md:py-24 border-t border-gray-100">
          <div className="max-w-3xl mx-auto space-y-12 px-4 sm:px-0">
            <div className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Technical Foundation</h2>
              <p className="text-gray-600 font-serif italic text-sm sm:text-[15px] leading-[1.8] font-light">
                Developed immersive VR environments in Unity with Spatial Audio and dynamic VFX. Designed gesture-based interactions using Perceptual-Motor Coupling theory to minimise latency and enhance flow.
              </p>
            </div>
            
            <div className="p-8 bg-gray-900 rounded-2xl text-white shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-4">Core Innovation</h3>
              <ul className="space-y-4 text-sm font-light text-gray-300">
                <li className="flex gap-4">
                  <span className="text-rose-500 font-bold shrink-0">01</span>
                  <span>Custom Hand-to-Sound synchronization logic to ensure zero-perceived latency.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-rose-500 font-bold shrink-0">02</span>
                  <span>Spatial audio mapping for predictive gameplay cues in 360-degree environments.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-rose-500 font-bold shrink-0">03</span>
                  <span>Dynamic VFX systems reacting to user's rhythmic accuracy and heart-rate flow.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {project.images.slice(3).map((img, i) => (
             <div key={i} className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 bg-gray-50 flex justify-center">
                <img src={img} alt="" className="w-full h-auto max-h-[80vh] object-contain transition-all duration-700" loading="lazy" />
             </div>
          ))}
        </div>

        {renderVideo()}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-full p-4 sm:p-6 md:p-12 lg:p-20 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 md:mb-16 lg:mb-24">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[1] sm:leading-[0.85] tracking-tighter uppercase mb-4 break-words">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6 md:mb-10">
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {project.tags.map(tag => (
                <button key={tag} onClick={() => onTagClick?.(tag)} className="text-[9px] md:text-xs text-gray-400 hover:text-blue-500 font-bold uppercase tracking-[0.2em] border-b border-gray-100 pb-1 transition-all duration-300">
                  # {tag}
                </button>
              ))}
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2 sm:gap-3">
              {project.galleryUrl && (
                <a href={project.galleryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 border border-blue-100 text-blue-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded hover:bg-blue-50 transition-all active:scale-95">
                  <LayoutGrid size={11} className="shrink-0" />
                  <span className="hidden xs:inline">Digital Gallery</span>
                </a>
              )}
              {/* Header prototype button */}
              {!isDualPhobia && (project.prototypeUrl || project.relatedProjectId) && (
                <button onClick={() => project.prototypeUrl ? window.open(project.prototypeUrl, '_blank') : onOpenProjectById?.(project.relatedProjectId!)} className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 border border-blue-100 text-blue-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded hover:bg-blue-50 transition-all active:scale-95">
                  <LinkIcon size={11} className="shrink-0" />
                  <span className="hidden xs:inline">{project.relatedProjectTitle || 'Related Project'}</span>
                </button>
              )}
              {project.spotifyUrl && (
                <a href={project.spotifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 border border-green-100 text-green-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded hover:bg-green-50 transition-all active:scale-95">
                  <Music size={11} className="shrink-0" />
                  <span className="hidden xs:inline">VIEW ON SPOTIFY</span>
                </a>
              )}
              {/* VIEW PAPER Button (External Link) */}
              {project.paperUrl && (
                <a href={project.paperUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 border border-rose-100 text-rose-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded hover:bg-rose-50 transition-all active:scale-95">
                  <FileText size={11} className="shrink-0" />
                  <span className="hidden xs:inline">VIEW PAPER</span>
                </a>
              )}
              {/* Note: View Poster scroll button was removed per user request for HCI projects */}
            </div>
          </div>
        </div>

        <div className="space-y-12 md:space-y-24 lg:space-y-32">
          {/* Scholarly Headers (Abstract & Research Questions) with unified spacing */}
          {project.abstract || (project.researchQuestions && project.researchQuestions.length > 0) ? (
            <div className="space-y-16 pb-12 border-b border-gray-100">
              {project.abstract && (
                <div>
                  <ScholarlySectionHeading>Abstract</ScholarlySectionHeading>
                  <div className="text-gray-600 font-serif italic text-xs sm:text-[13px] leading-relaxed whitespace-pre-line">
                    {renderAbstractContent(project.abstract)}
                  </div>
                </div>
              )}
              
              {project.researchQuestions && project.researchQuestions.length > 0 && (
                <div>
                  <ScholarlySectionHeading>Research Questions</ScholarlySectionHeading>
                  <div className="space-y-4">
                    {project.researchQuestions.map((rq, idx) => (
                      <p key={idx} className="text-gray-800 font-serif font-bold italic text-sm sm:text-base leading-snug">
                        {rq}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {isDualPhobia && (
                <div>
                  <ScholarlySectionHeading>Research Details</ScholarlySectionHeading>
                  <div className="mt-8">
                    {renderExperimentalFlow()}
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {!isDualPhobia && !isRhythmGame && (
             <>
               {renderSpecsBar(project.specs)}
               <div className="py-2 sm:py-6">{videoAtTop && renderVideo()}</div>
               <div className="py-2 sm:py-6">
                 {renderProjectImages()}
                 {videoAtBottom && renderVideo()}
               </div>
             </>
          )}

          {isRhythmGame && renderRhythmGameLayout()}

          {project.spotifyUrl && (
            <div className="py-12 border-t border-gray-100">
               <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-black">
                 <iframe src={getSpotifyEmbedUrl(project.spotifyUrl)} width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify Album Embed" />
               </div>
            </div>
          )}

          {project.pdfUrl && (
            <div ref={pdfRef} className="py-12 border-t border-gray-100">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <ScholarlySectionHeading>{(isDualPhobia || isShoppingAssistants) ? 'Poster' : 'Paper'}</ScholarlySectionHeading>
                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-serif italic">Scholarly publication for {project.title}</p>
                </div>
                <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-500 transition-colors self-start sm:self-auto">
                  <ExternalLink size={16} />
                </a>
              </div>
              <div className="relative w-full aspect-[1/1.414] sm:aspect-[3/4] md:aspect-[210/297] rounded-xl overflow-hidden shadow-2xl bg-gray-50 border border-gray-100">
                <iframe 
                  src={getEmbedUrl(project.pdfUrl)} 
                  className="absolute inset-0 w-full h-full border-none" 
                  title="PDF Document Viewer" 
                  allow="fullscreen"
                />
              </div>
            </div>
          )}

          {!isRhythmGame && (
            <div className="py-12 md:py-24 lg:py-32 border-t border-gray-100">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
                <div className="lg:w-1/3 shrink-0 flex flex-col gap-4">
                  <p className="text-[10px] text-gray-300 font-mono uppercase tracking-[0.2em] whitespace-pre-line">{coordinates}</p>
                  {project.award && (
                    <div className="pt-4 border-t border-gray-50 max-w-[160px]">
                      <p className="text-[10px] sm:text-[11px] text-rose-400 font-serif italic tracking-wide leading-relaxed">{project.award}</p>
                    </div>
                  )}
                </div>
                {project.fullContent && project.fullContent.trim() && !isDualPhobia && (
                  <div className="lg:w-2/3">
                    <div className="text-gray-600 font-serif italic text-sm sm:text-[15px] leading-[1.8] font-light">
                      <span className="block text-xl font-bold not-italic mb-2 text-gray-900">*</span>
                      {(project.fullContent || project.description).split('\n').map((para, idx) => (
                        para.trim() && <p key={idx} className="whitespace-pre-line">{para}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-12 pt-10 pb-6 border-t border-gray-50 flex justify-center items-center opacity-30">
          <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">RAKEY YANG ©</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
