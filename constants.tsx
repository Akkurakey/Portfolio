
import { Project, WindowID } from './types';

// Horizontal position of the desktop icon column, as a fraction of viewport width
export const DESKTOP_ICON_COLUMN_RATIO = 0.82;

export const FOLDERS: { id: WindowID; name: string }[] = [
  { id: 'hci', name: 'HCI Research' },
  { id: 'game_xr', name: 'Game_XR' },
  { id: 'graphic', name: 'Graphic_\nBranding' },
  { id: 'web_ai', name: 'Web_AI' },
];

export const PROJECTS: Record<WindowID, Project[]> = {
  hci: [
    {
      id: 'hci-1',
      title: 'VR/AR Phobia Stimuli',
      description: 'A comparative analysis of VR and AR efficacy in treating spider phobia and contamination fear.',
      detailIntro: 'MSc dissertation at the University of Nottingham, accepted by the Virtual Reality journal.\nI developed VR and AR exposure scenarios using Unity, conducted a mixed-methods user study (n = 31), applying hypothesis testing to quantitative data and reflexive thematic analysis to qualitative data.',
      imageUrl: '/images/hci/dual-phobia-cover.png',
      abstract: 'Exposure therapy is a common psychological intervention for phobias and anxiety disorders, and immersive exposure simulations using virtual reality (VR) and augmented reality (AR) have been evaluated as a practical extension of this method, producing similar experience through simulated stimuli. This study compares participants’ responses to VR and AR exposure simulations under different types of stimuli. The study investigates two types of fear-based stimuli: spiders and contamination, for which both VR and AR prototypes were developed. A within-subjects experimental design was employed, involving 31 participants drawn from a healthy adult student population who reported their experience intensity and qualitative feedback following exposure to virtual stimuli across both modalities. The type of technology significantly affected the experience intensity: VR elicited a significantly higher experience intensity overall, although the strength of this effect varied depending on the stimulus type. Specifically, VR produced a much stronger experience in the contamination scenario, while AR performed comparably and showed ecological advantages in the spider scenario. We suggest that future virtual exposure system designs could integrate both AR and VR components in a staged approach. AR may be more suitable for early-stage or animal-focused exposure simulations, whereas VR is better suited for scenarios that demand complete environmental control.',
      researchQuestions: [
        'Q1. Is there a significant difference in the effectiveness of AR and VR when used in exposure therapy?',
        'Q2. If a difference exists, is one generally better than the other, or do the results vary depending on the specific task?'
      ],
      images: [
        '/images/hci/dual-phobia-spider-ar.mp4', // Step 1 grid: Virtual Spider AR
        '/images/hci/dual-phobia-spider-vr.mp4', // Step 1 grid: Virtual Spider VR
        '/images/hci/dual-phobia-contamination-ar.mp4', // Step 1 grid: Contamination AR
        '/images/hci/dual-phobia-contamination-vr.mp4', // Step 1 grid: Contamination VR
        '/images/hci/dual-phobia-flowchart.png', // Step 2 image 1 (Flowchart)
        '/images/hci/dual-phobia-demo.mp4', // Step 2 image 2 (GIF)
        '/images/hci/dual-phobia-results.png'  // Step 3 image (Results)
      ],
      tags: ['VR', 'AR', 'Therapy', 'Unity', 'Research'],
      pdfUrl: '/docs/dual-phobia-poster.pdf',
      pdfAspect: '756/1008',
      paperUrl: '/docs/vet-paper.pdf',
      relatedProjectId: 'xr-3',
      relatedProjectTitle: 'More Prototype Details',
      fullContent: 'Designed and developed AR and VR exposure prototypes using the Unity engine.\n\nGuided 31 participants through a within-subjects session of about 40 minutes, covering spider and contamination scenarios in both AR and VR (four conditions, randomised order), with hand-tracked tasks that scaled from observing a static stimulus to picking it up, triggering its movement, and interacting more closely.\nParticipants completed an initial questionnaire, then a questionnaire after each scenario, thinking aloud throughout, and closed with a follow-up interview.\n\nCollected questionnaire data, think-aloud feedback, and follow-up interviews; analysed and interpreted the results using SPSS.'
    },
    {
      id: 'hci-2',
      title: 'VR Shopping Assistants',
      description: 'Research collaboration on user perception of shopping assistants in luxury VR retail.',
      detailIntro: 'A research collaboration in which I helped design a within-subjects study comparing four shopping-assistant modes (3D avatar, webcam, voice, and AI) in a luxury VR retail setting, defining the experimental conditions, participant tasks, and interaction protocols. I co-built the VR retail scenes in Unity and ran the user study (n=20), collecting and cleaning the multi-source perceptual and behavioural data.',
      imageUrl: '/images/hci/vr-shopping-cover.jpg',
      abstract: 'This study investigates four shopping assistant types (3D avatar, webcam, AI, voice) in VR luxury environments through user studies with 20 participants using NASA-TLX, questionnaires, and interviews. Results show 3D avatar assistants excelled in immersion, trust, and satisfaction, while human-operated assistants outperformed AI in realism and satisfaction. Webcam achieved 50% immersion preference versus 75% for 3D avatars despite strong trustworthiness. The study pioneers PC-VR asymmetric interaction systems, providing design insights and optimization strategies for luxury retail VR shopping assistants.',
      researchQuestions: [
        'Q1. How do different types of shopping assistants (3D avatar, webcam video chat, AI, and voice) influence consumers’ shopping attitudes in VR luxury shopping environments?',
        'Q2. How do human sales assistants and AI sales assistants differ in their impact on consumer trust and shopping experience?',
        'Q3. What is the impact of design aspects on user acceptability in webcam-based real-person video chat inside PC-VR asymmetric interaction?'
      ],
      images: [
        '/images/hci/vr-shopping-procedure.png', // Overall Experimental Procedure
        '/images/hci/vr-shopping-interaction.png', // Interaction Details (assistant types x task stages)
        '/images/hci/vr-shopping-example-3d.jpg', // Example condition: 3D avatar assistant (paper Fig. 2)
        '/images/hci/vr-shopping-example-webcam.jpg' // Example condition: webcam assistant (paper Fig. 3)
      ],
      tags: ['VR', 'Research', 'IEEE VR'],
      videoUrl: 'https://www.youtube.com/watch?v=SYEaoQmagoc',
      pdfUrl: '/docs/vr-shopping-poster.pdf',
      pdfAspect: '2440.8/3427.2',
      paperUrl: 'https://doi.org/10.1109/VRW70859.2026.00252'
    }
  ],
  game_xr: [
    {
      id: 'xr-oor',
      title: "One's Own Room",
      description: 'A self-created virtual safe room built with Gaussian splatting and WebXR.',
      imageUrl: '/images/game_xr/oor-cover.jpg',
      images: [
        '/images/game_xr/oor-listen.mp4',
        '/images/game_xr/oor-into-room.mp4',
        '/images/game_xr/oor-room.mp4',
        '/images/game_xr/oor-scale-valence.jpg',
        '/images/game_xr/oor-scale-arousal.jpg',
        '/images/game_xr/oor-console.mp4'
      ],
      tags: ['VR', 'WebXR', 'Emotional Design', 'Research'],
      githubUrl: 'https://github.com/Akkurakey/Ones-Own-Room',
      specs: [
        { label: 'Platform', value: 'Meta Quest 3 / WebXR' },
        { label: 'Engine', value: 'Three.js + Spark' },
        { label: 'Rendering', value: 'Gaussian Splatting' },
        { label: 'Voice', value: 'LLM + TTS Pipeline' }
      ],
      fullContent: "The name is inspired by A Room of One's Own by Virginia Woolf: the idea that everyone needs a space of their own, free from interruption. In the context of an emotional safe zone, this room is a self-governed virtual space created through the user's own agency.\n\nThe project deliberately avoids framing itself as therapy, meditation, or a guided wellbeing experience, because those imply that the room is a service that does something to the user. Instead, the room does nothing. It simply exists. Everything is determined by the person who inhabits it. The voice you converse with is the room itself, and the space gradually reveals itself through your own input.\n\nThe system is built in three layers: AI-generated Gaussian splat rooms from Marble world-model prompts, real-time atmosphere shader parameters driven by a Valence × Arousal check-in (Russell's Circumplex Model, assessed with SAM), and a turn-based voice pipeline (LLM + TTS). Inside, holding the orb begins a conversation; ignoring it means solitude. The room will never initiate conversation."
    },
    {
      id: 'xr-3',
      title: 'Virtual Exposure Therapy Application',
      description: "An AR/VR application for exposure therapy, targeting spider and contamination phobia. Designed with future clinical use in mind: each stimulus is available in both AR (passthrough) and VR modes, allowing exposure to be staged from real-world overlays to fully controlled virtual environments.",
      imageUrl: '/images/game_xr/exposure-therapy-cover.png',
      images: [
        // Four scenario clips (2×2 grid: spider / contamination × AR / VR).
        // Drop the .mp4 files into public/images/game_xr/ and uncomment, the grid layout activates automatically.
        // '/images/game_xr/vet-ar-spider.mp4',
        // '/images/game_xr/vet-vr-spider.mp4',
        // '/images/game_xr/vet-ar-contamination.mp4',
        // '/images/game_xr/vet-vr-contamination.mp4',
        '/images/game_xr/vet-spider-ar.png',
        '/images/game_xr/vet-spider-vr.png',
        '/images/game_xr/vet-spider-movement.mp4',
        '/images/game_xr/vet-contamination-ar.png',
        '/images/game_xr/vet-contamination-vr.jpg',
        '/images/game_xr/vet-instructions.png',
        '/images/game_xr/vet-menu-access.png',
        '/images/game_xr/vet-menu-scenario.png',
        '/images/game_xr/vet-menu-mode.png'
      ],
      tags: ['VR', 'AR', 'Healthcare', 'Unity'],
      githubUrl: 'https://github.com/Akkurakey/VET',
      videoUrl: 'https://www.youtube.com/embed/r-H0cZzmMKs',
      specs: [
        { label: 'Platform', value: 'Meta Quest 3' },
        { label: 'Engine', value: 'Unity 2022.3 LTS' },
        { label: 'Tracking', value: 'Hand-tracking' },
        { label: 'Modes', value: 'AR ↔ VR' }
      ],
      fullContent: "Four scenarios (AR spider, VR spider, AR contamination, and VR contamination) are integrated in a single Unity project for Meta Quest 3, using colour passthrough to switch between AR and VR within one session.\nAll interaction is controller-free: bare-hand contact with fear-inducing stimuli feels closer to the everyday situations exposure therapy recreates, whereas controllers invite a 'gaming mindset' that breaks immersion."
    },
    {
      id: 'ai-1',
      title: 'AR Warehouse System',
      description: 'PC + AR-based 3D warehouse management and navigation system designed to enhance inventory management efficiency.',
      imageUrl: '/images/game_xr/ar-logistics-interface.jpg',
      images: [
        '/images/game_xr/ar-logistics-interface.jpg', // System Interface
        '/images/game_xr/ar-logistics-sketch.png'  // Design Sketch
      ],
      tags: ['AR', 'Logistics', 'Interface Design'],
      specs: [
        { label: 'Platform', value: 'PC + AR' },
        { label: 'Engine', value: 'Unity 2021' },
        { label: 'Tracking', value: 'Device Tracking' },
        { label: 'Input', value: 'Touchscreen' }
      ],
      prototypeUrl: 'https://lumina-ar-logistics.vercel.app/',
      relatedProjectTitle: 'Live Demo Link',
      fullContent: 'Design and development of a PC + AR-based 3D warehouse management and navigation system, created as an undergraduate thesis project in collaboration with frontline warehouse workers.\n\nThe system integrates spatial visualisation and route guidance to support efficient inventory management and item retrieval. Through participatory design with warehouse employees, the project explored how augmented reality can enhance situational awareness and reduce cognitive load in complex industrial environments.'
    },
    {
      id: 'xr-2',
      title: 'AR Gallery Treasure Hunt',
      description: 'A gamified AR exploration experience for interactive gallery engagement.',
      imageUrl: '/images/game_xr/ar-gallery-cover.jpg',
      images: [
        '/images/game_xr/ar-gallery-1.png',
        '/images/game_xr/ar-gallery-2.jpg',
        '/images/game_xr/ar-gallery-cover.jpg',
        '/images/game_xr/ar-gallery-3.jpg',
        '/images/game_xr/ar-gallery-4.jpg'
      ],
      tags: ['AR', 'Gamification', '3D Modelling'],
      videoUrl: 'https://player.vimeo.com/video/1142529054',
      specs: [
        { label: 'Platform', value: 'Mobile (iOS / Android)' },
        { label: 'Engine', value: 'Spark AR' },
        { label: 'Tracking', value: 'Image Tracking' },
        { label: 'Input', value: 'Screen Interaction' }
      ],
      fullContent: 'Implemented a treasure hunt mechanism enabling users to interact with gallery materials. Modelled 3D content based on UoN Lakeside Arts exhibit materials. Achieving a 90% task completion rate.'
    },
    {
      id: 'xr-1',
      title: 'VR Hand-gesture Rhythm Game',
      description: 'An immersive VR environment using hand-tracking and spatial audio for an enhanced flow state.',
      imageUrl: '/images/game_xr/rhythm-game-cover.png',
      images: [
        '/images/game_xr/rhythm-game-1.mp4',
        '/images/game_xr/rhythm-game-2.png',
        '/images/game_xr/rhythm-game-3.jpg'
      ],
      tags: ['Unity', 'Hand-tracking', 'VFX', 'Rhythm'],
      videoUrl: 'https://vimeo.com/1209937847',
      externalUrl: 'https://gesture.dance/',
      videoPosition: 'bottom',
      specs: [
        { label: 'Platform', value: 'Meta Quest 2 / Pro' },
        { label: 'Engine', value: 'Unity 6' },
        { label: 'Tracking', value: 'Hand-Tracking 2.0' },
        { label: 'Input', value: 'Gestural Command' }
      ],
      fullContent: 'Developed immersive VR environments in Unity with Spatial Audio and dynamic VFX. Designed gesture-based interactions using Perceptual-Motor Coupling theory to minimise latency and enhance flow. The project focuses on the intersection of rhythm, movement, and cognitive engagement in virtual space.'
    },
    {
      id: 'xr-4',
      title: 'Lab Cat Escape',
      description: 'Play as a kitten avoiding security robots in an abandoned high-tech laboratory.',
      imageUrl: '/images/game_xr/lab-cat-cover.jpg',
      images: [], // Cover only; no detail-page gallery
      tags: ['3D Game', 'Unity', 'Stealth', 'Level Design'],
      videoUrl: 'https://player.vimeo.com/video/943596089',
      specs: [
        { label: 'Platform', value: 'PC / Mac' },
        { label: 'Engine', value: 'Unity 2022 LTS' },
        { label: 'Tracking', value: 'Keyboard / Mouse' },
        { label: 'Input', value: 'Third-person Control' }
      ],
      fullContent: 'In this third-person 3D game, you will play as a little kitten, abandoned in a mysterious abandoned laboratory. This place was once the site of various animal experiments, but now the researchers have left, leaving only automated robot patrollers and constantly scanning surveillance beams. These robots and beams are the security system of the laboratory, and they will initiate a capture programme if any animal is detected. Your goal is to cleverly avoid these security devices and find a way to escape from the laboratory. Utilise the props inside the laboratory to help the little kitten escape from this high-tech cage.'
    }
  ],
  graphic: [
    {
      id: 'gd-album',
      title: 'Album Design',
      description: 'A visual homage to the "Dash Line" band, capturing the solitude of youth on an isolated island.',
      imageUrl: '/images/graphic/album-cover.jpg',
      images: [
        '/images/graphic/album-cover.jpg',
        '/images/graphic/album-2.jpg',
        '/images/graphic/album-3.jpg',
        '/images/graphic/album-4.jpg'
      ],
      tags: ['Graphic', 'Album', 'Branding', 'Typography'],
      award: 'Awarded 2021 Kan Tai-Keung Design Award',
      spotifyUrl: 'https://open.spotify.com/album/6UCxcboIcO6TBOqQnYCJVk?si=rVOWaTYVTMi7WtYvHa648A',
      fullContent: 'The university is situated on an isolated island, with only one bus line, the Dash Line, connecting it to the mainland. To pay homage to the youthful experience of being separated from the city life, a band with the same name as Dash Line was formed on the island, which later gave birth to an album. The album commences with a bus announcement and concludes with the sound of the island\'s waves.\n\nMy design features a letterpress map of the bus route, with a light-inspired motif that resembles the street lights and signs seen through the windows of a bus during the night. The number 21 in the centre symbolises the pivotal year in which the album was created. It was the hardest year of all, but also a year that was like a new life.\n\nI hope my design will evoke feelings of solitude, nostalgia, and a sense of longing for the dreams of young people, through the depiction of the night, the lights, the rattling buses, and the lost souls on the island.'
    },
    {
      id: 'gd-5',
      title: 'Stamp Set Design',
      description: 'A conceptual philatelic exploration focused on geometry and cultural narrative.',
      imageUrl: '/images/graphic/stamp-cover.jpg',
      images: [
        '/images/graphic/stamp-1.jpg',
        '/images/graphic/stamp-2.mp4',
        '/images/graphic/stamp-3.mp4',
        '/images/graphic/stamp-4.mp4',
        '/images/graphic/stamp-5.mp4'
      ],
      tags: ['Graphic', 'Illustration', 'Motion', 'Stamp Design'],
      fullContent: 'This project investigates the intersection of traditional philately and modern digital motion. By applying geometric abstraction to cultural narratives, the resulting stamp set functions both as a static artefact and a kinetic visual experience.'
    },
    {
      id: 'gd-msi',
      title: 'MSI FULFILLMENT',
      description: 'A visual identity and logistics design system focusing on industrial aesthetic clarity.',
      imageUrl: '/images/graphic/msi-cover.png',
      images: [
        '/images/graphic/msi-1.png',
        '/images/graphic/msi-cover.png',
        '/images/graphic/msi-2.png',
        '/images/graphic/msi-3.png',
        '/images/graphic/msi-4.jpg'
      ],
      tags: ['Graphic', 'Branding', 'Logistics', 'Industrial'],
      fullContent: 'MSI FULFILLMENT is a visual exploration of logistics efficiency and industrial design. The project focuses on creating a robust identity that communicates reliability while maintaining a high level of aesthetic sophistication. The design language utilises bold grids and structured colour palettes to reflect the precision required in modern fulfilment operations.'
    },
    {
      id: 'gd-live-show',
      title: 'Live Show Poster',
      description: 'Experimental poster designs for underground live music events, blending bold typography with raw textures.',
      imageUrl: '/images/graphic/live-show-cover.png',
      images: [
        '/images/graphic/live-show-1.jpg',
        '/images/graphic/live-show-2.jpg',
        '/images/graphic/live-show-3.jpg'
      ],
      tags: ['Graphic', 'Poster', 'Live Show', 'Branding'],
      externalUrl: 'https://wap.showstart.com/pages/activity/detail/detail?ssfrom=user-8688&activityId=174046',
      fullContent: 'This series explores the raw energy of live performances. Each poster is a translation of a specific musical atmosphere into a visual identity, utilising experimental layouts and distressed textures to echo the intensity of the scene.'
    }
  ],
  web_ai: [
    {
      id: 'ai-shrine',
      title: 'AI Shrine',
      description: 'Upload any image and AI distils its essence into a deity, then consult it with moon blocks.',
      imageUrl: '/images/web_ai/ai-shrine.jpg',
      images: ['/images/web_ai/ai-shrine.jpg'],
      tags: ['Creative AI', 'Web', 'Culture'],
      externalUrl: 'https://aishrine.space/'
    },
    {
      id: 'ai-4',
      title: 'Mandarin FM',
      description: 'A digital platform for learning Mandarin through music lyrics.',
      imageUrl: '/images/web_ai/mandarin-fm.png',
      images: ['/images/web_ai/mandarin-fm.png'],
      tags: ['Audio', 'Language', 'Culture'],
      externalUrl: 'https://mandarin-fm.com/'
    },
    {
      id: 'ai-2',
      title: 'Scholar Stream',
      description: 'A platform for following STEM papers through a personalised topic feed.',
      imageUrl: '/images/web_ai/scholar-stream.png',
      images: ['/images/web_ai/scholar-stream.png'],
      tags: ['Education', 'AI', 'Streaming'],
      externalUrl: 'https://scholar-stream-ten.vercel.app/'
    },
    {
      id: 'ai-3',
      title: 'Dream Core Generator',
      description: 'A website that turns three words into a dreamcore "safe zone" scene and mood.',
      imageUrl: '/images/web_ai/dream-core.png',
      images: ['/images/web_ai/dream-core.png'],
      tags: ['AI', 'Generation', 'Visuals'],
      externalUrl: 'https://sz-one.vercel.app/'
    }
  ],
  about: [],
  cv: [],
  // Projects that are not displayed in any folder but are linked from other sections (like CV)
  hidden: [
    {
      id: 'ai-5',
      title: "AI-Generated Educational Video",
      description: 'Award-winning AI project focusing on educational equality through powered video generation.',
      imageUrl: '/images/web_ai/ai-edu-video.jpg',
      images: ['/images/web_ai/ai-edu-video.jpg'],
      tags: ['AI', 'Education', 'Video Gen', 'Hackathon'],
      externalUrl: 'https://xiao-shan-ai-slides.vercel.app/',
      galleryUrl: 'https://cambridge-edtech-society.org/digital-gallery.html'
    }
  ]
};
