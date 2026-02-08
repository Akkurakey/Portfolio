export type WindowID = 'hci' | 'game_xr' | 'graphic' | 'web_ai' | 'about' | 'cv' | string;

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Featured image (static)
  hoverImageUrl?: string; // Image to show on hover (e.g. GIF)
  images: string[]; // Gallery images
  tags: string[];
  fullContent?: string; // Long-form content for the "full page"
  abstract?: string; // Scholarly abstract
  researchQuestions?: string[]; // Research questions
  externalUrl?: string; // Optional URL for external project sites
  galleryUrl?: string; // Optional secondary gallery URL
  videoUrl?: string; // Optional URL for embedded videos
  videoPosition?: 'top' | 'bottom'; // Control where the video appears
  spotifyUrl?: string; // Optional URL for Spotify albums/tracks
  pdfUrl?: string; // Optional URL for academic PDF files (often used as posters in this portfolio)
  paperUrl?: string; // New field for direct links to research papers
  prototypeUrl?: string; // Optional URL for prototype applications/demos
  award?: string; // Optional award mention
  relatedProjectId?: string; // Link to another project ID
  relatedProjectTitle?: string; // Display name for the related project link
  specs?: { label: string; value: string }[]; // Technical specifications
}

export interface WindowState {
  id: WindowID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  type?: 'folder' | 'project' | 'about' | 'cv';
  projectData?: Project;
}