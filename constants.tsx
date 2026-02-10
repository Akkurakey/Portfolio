import { Project, WindowID } from './types';

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
      title: 'Dual-Phobia Virtual Exposure Therapy',
      description: 'A comparative analysis of VR and AR efficacy in treating spider phobia and contamination fear.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1TJBm7pWFinDbsoNBoc3gtbRQJdgxTqsN',
      abstract: 'This paper compares the experience intensity of virtual exposure situations in Virtual Reality (VR) and Augmented Reality (AR) to explore the applicability of these technologies in simulating various phobia stimuli for virtual exposure therapy (VET). The paper considers two classic phobias: spider phobia and contamination fears, for which both VR and AR prototypes were developed. A within-subjects experimental design was employed, involving 31 general population participants who reported their intensity of experience and other feedback following virtual exposure using both VR and AR technologies for both phobias. The type of technology significantly affected the intensity of experience: VR was generally more intense than AR, although the strength of this effect varied depending on the type of phobia. VR was significantly more effective in eliciting contamination fears, while AR showed some unique advantages for spider phobia. We suggest that future virtual exposure therapies could integrate both AR and VR components. AR may be more suitable for early-stage or animal-focused exposure therapy, whereas VR is more effective for scenarios that demand complete environmental control.\n\nKeywords: Virtual Reality (VR), Augmented Reality (AR), Virtual Exposure Therapy (VET), Spider Phobia, Next-generation VET',
      researchQuestions: [
        'Q1. Is there a significant difference in the effectiveness of AR and VR when used in exposure therapy?',
        'Q2. If a difference exists, is one generally better than the other, or do the results vary depending on the specific task?'
      ],
      images: [
        'https://lh3.googleusercontent.com/d/1n0datZ3HOnEMBztutkygZ75kmMb-KAql', // Step 1 image (Prototype Photo)
        'https://lh3.googleusercontent.com/d/1niH5BksliHV_lHOJ9HbLty_XR_hxBqSG', // Step 2 image 1 (Flowchart)
        'https://lh3.googleusercontent.com/d/1ss8u_1-pPemB4oNiViznHJzn5aR8T5eq', // Step 2 image 2 (GIF)
        'https://lh3.googleusercontent.com/d/1UNfOuUXN9JuEAR_N4IzkhwqCEOONPM0p'  // Step 3 image (Results)
      ],
      tags: ['VR/AR', 'Therapy', 'Unity', 'Research'],
      pdfUrl: 'https://drive.google.com/file/d/1N8q-FQPBZuGJ3abKhta-45LO1T_5tVaL/view?usp=sharing',
      paperUrl: 'https://drive.google.com/file/d/1H3Y6Fp2sUAMwfmFM2Zx_yeBes3oQW8yl/view?usp=drive_link',
      relatedProjectId: 'xr-3',
      relatedProjectTitle: 'View Prototype Application',
      fullContent: 'Designed and developed AR and VR exposure prototypes using the Unity engine.\nGuided participants (N=31) through AR and VR tasks and supervised the experimental sessions.\nCollected questionnaire data, think-aloud feedback, and follow-up interviews; analysed and interpreted the results using SPSS.'
    },
    {
      id: 'hci-2',
      title: 'VR Shopping Assistants',
      description: 'Research collaboration on user perception of shopping assistants in luxury VR retail.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1DDSR_tOSqblsH6g2KYUQo8a8epuJVSbY',
      abstract: 'This study investigates four shopping assistant types (3D avatar, webcam, AI, voice) in VR luxury environments through user studies with 20 participants using NASA-TLX, questionnaires, and interviews. Results show 3D avatar assistants excelled in immersion, trust, and satisfaction, while human-operated assistants outperformed AI in realism and satisfaction. Webcam achieved 50% immersion preference versus 75% for 3D avatars despite strong trustworthiness. The study pioneers PC-VR asymmetric interaction systems, providing design insights and optimization strategies for luxury retail VR shopping assistants.\n\nIndex Terms: Virtual Shopping, Avatars, Cross-device user interaction, Social Virtual Reality, Shopper-Buyer Communication.',
      images: [
        'https://lh3.googleusercontent.com/d/1ZITYK5YndP91_CFAA75St9K-mV1jwJBv', // Overall Experimental Procedure
        'https://lh3.googleusercontent.com/d/1zNbA_fYDNIGcQhaj2q3bWOmzJVujJ407'  // Interaction Details
      ],
      tags: ['VR', 'UX Research', 'IEEE VR'],
      videoUrl: 'https://drive.google.com/file/d/1jkhZcqimAopjautEqvR7inLAwMxGPyxb/view?usp=sharing',
      pdfUrl: 'https://drive.google.com/file/d/1BA3xCgUM4LA3EJ_cB2R1Th4IpTUW2brm/view?usp=sharing',
      paperUrl: 'https://drive.google.com/file/d/1ydCFQwiHJ510xp7xROZdUfxuiNK31poE/view?usp=drive_link',
      fullContent: ''
    }
  ],
  game_xr: [
    {
      id: 'xr-3',
      title: 'Virtual Exposure Therapy Application',
      description: 'A therapeutic VR-MR application designed to treat specific phobias through controlled exposure.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1NIB5q5WqGYwghfJqbPPStVeGEN8FsSFr',
      images: [
        'https://lh3.googleusercontent.com/d/1w5ijcrv_GJpydL-U9_h6d2G5hlNEo9DY',
        'https://lh3.googleusercontent.com/d/1NIB5q5WqGYwghfJqbPPStVeGEN8FsSFr'
      ],
      tags: ['VR/MR', 'Healthcare', 'Unity'],
      videoUrl: 'https://www.youtube.com/embed/r-H0cZzmMKs', 
      specs: [
        { label: 'Platform', value: 'Meta Quest 3' },
        { label: 'Engine', value: 'Unity 2022 LTS' },
        { label: 'Tracking', value: 'Hand-tracking' },
        { label: 'Input', value: 'Direct Manipulation' }
      ],
      fullContent: 'Designed and developed AR and VR exposure prototypes using the Unity engine.\nAn application utilizing VR and MR technologies to provide a safe, controlled environment for exposure therapy. The system allows clinicians to adjust intensity levels in real-time while monitoring patient response, specifically targeting arachnophobia and mysophobia.'
    },
    {
      id: 'xr-2',
      title: 'AR Gallery Treasure Hunt',
      description: 'A gamified AR exploration experience for interactive gallery engagement.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1BtopQ24IstLikgqu5Sk8v7l8cZwMDbud',
      images: [
        'https://lh3.googleusercontent.com/d/1WMXIrGcqWONAFNR2Kak3DYNGbnHW0mLC',
        'https://lh3.googleusercontent.com/d/14gOjuMwekz4Jo_VN4STSLR9Qlu7Vev33',
        'https://lh3.googleusercontent.com/d/1BtopQ24IstLikgqu5Sk8v7l8cZwMDbud',
        'https://lh3.googleusercontent.com/d/1shj0m-Ro6Nb70yiDv3_2KjdCGfRbBqBk',
        'https://lh3.googleusercontent.com/d/1-jfNJN7dPpl5I3pxNBHEh9JXPBDKqWP-'
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
      imageUrl: 'https://lh3.googleusercontent.com/d/1OFYmhWydPJUwgmmS27ASiQMfnsvzqi2X',
      images: [
        'https://lh3.googleusercontent.com/d/1nE_fz3fnSGdgpZWLtFtRtaRa5egRIvYr',
        'https://lh3.googleusercontent.com/d/1oDTGBVwYsuYvv9Ml76eoFS4GjmddoL9Q',
        'https://lh3.googleusercontent.com/d/1eboh50ie5YAAeDFJC6kV-8fMcTrLj-ED'
      ],
      tags: ['Unity', 'Hand-tracking', 'VFX', 'Rhythm'],
      videoUrl: 'https://drive.google.com/file/d/1eECKfrIxwjILku0zPCFZ69X1vZa3GsZp/preview',
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
      imageUrl: 'https://lh3.googleusercontent.com/d/12CEbL25YHkmiLFdWDliJvx-zes0v2PsG',
      images: [
        'https://lh3.googleusercontent.com/d/12CEbL25YHkmiLFdWDliJvx-zes0v2PsG'
      ],
      tags: ['3D Game', 'Unity', 'Stealth', 'Level Design'],
      videoUrl: 'https://player.vimeo.com/video/943596089',
      specs: [
        { label: 'Platform', value: 'PC / Mac' },
        { label: 'Engine', value: 'Unity 2022 LTS' },
        { label: 'Tracking', value: 'Keyboard / Mouse' },
        { label: 'Input', value: 'Third-person Control' }
      ],
      fullContent: 'In this third-person 3D game, you will play as a little kitten, abandoned in a mysterious abandoned laboratory. This place was once the site of various animal experiments, but now the researchers have left, leaving only automated robot patrollers and constantly scanning surveillance beams. These robots and beams are the security system of the laboratory, and they will initiate a capture program if any animal is detected. Your goal is to cleverly avoid these security devices and find a way to escape from the laboratory. Utilize the props inside the laboratory to help the little kitten escape from this high-tech cage.'
    }
  ],
  graphic: [
    {
      id: 'gd-album',
      title: 'Album Design',
      description: 'A visual homage to the "Dash Line" band, capturing the solitude of youth on an isolated island.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1v61SjkT6wjbmD5nfg9YERQPwYqFVinZf',
      images: [
        'https://lh3.googleusercontent.com/d/1v61SjkT6wjbmD5nfg9YERQPwYqFVinZf',
        'https://lh3.googleusercontent.com/d/1VfF2zl4TJdKKwcg8xbld48IyOoMYII5j',
        'https://lh3.googleusercontent.com/d/1dsQijKKnxSpX1WX_qO4zCluViw3lHLe5',
        'https://lh3.googleusercontent.com/d/1nnLIHdPX0mWYpCs_Tzxl7YRQasRyOgym'
      ],
      tags: ['Graphic', 'Album', 'Branding', 'Typography'],
      award: 'Awarded 2021 Kan Tai-Keung Design Award',
      spotifyUrl: 'https://open.spotify.com/album/6UCxcboIcO6TBOqQnYCJVk?si=rVOWaTYVTMi7WtYvHa648A',
      fullContent: 'The university is situated on an isolated island, with only one bus line, the Dash Line, connecting it to the mainland. To pay homage to the youthful experience of being separated from the city life, a band with the same name as Dash Line was formed on the island, which later gave birth to an album. The album commences with a bus announcement and concludes with the sound of the island\'s waves.\n\nMy design features a letterpress map of the bus route, with a light-inspired motif that resembles the street lights and signs seen through the windows of a bus during the night. The number 21 in the center symbolizes the pivotal year in which the album was created. It was the hardest year of all, but also a year that was like a new life.\n\nI hope my design will evoke feelings of solitude, nostalgia, and a sense of longing for the dreams of young people, through the depiction of the night, the lights, the rattling buses, and the lost souls on the island.'
    },
    {
      id: 'gd-5',
      title: 'Stamp Set Design',
      description: 'A conceptual philatelic exploration focused on geometry and cultural narrative.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1elmQt9cuke8UIpMPa9Eb5ex9tHJBcIhW',
      images: [
        'https://lh3.googleusercontent.com/d/1HM5gvaQBCzkVbW1H9AcBE0hByAVZ_j0L',
        'https://lh3.googleusercontent.com/d/1YHPeLN1K9K2PtKIMirlnqWT6nwfeaVQQ',
        'https://lh3.googleusercontent.com/d/1SbXeC417ONCfAZIVKOY1VdtVn8wlvvnt',
        'https://lh3.googleusercontent.com/d/1Odii_323GrsUEhgjthmXPTp8xZ7MNeck',
        'https://lh3.googleusercontent.com/d/1LPiGtiKiWmQ-RNsTfgzA2y539jQEdCT1'
      ],
      tags: ['Graphic', 'Illustration', 'Motion', 'Stamp Design'],
      fullContent: 'This project investigates the intersection of traditional philately and modern digital motion. By applying geometric abstraction to cultural narratives, the resulting stamp set functions both as a static artifact and a kinetic visual experience.'
    },
    {
      id: 'gd-msi',
      title: 'MSI FULFILLMENT',
      description: 'A visual identity and logistics design system focusing on industrial aesthetic clarity.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1_9mXXQ-vOMBg5JjiI7k6Z9ZYrrpHpYFr',
      images: [
        'https://lh3.googleusercontent.com/d/1a5iJYw2XMQDtGZOXxfyY5t06oTFnV3If',
        'https://lh3.googleusercontent.com/d/1_9mXXQ-vOMBg5JjiI7k6Z9ZYrrpHpYFr',
        'https://lh3.googleusercontent.com/d/1OjrK0fQ6uShOX_fRyPsdbeQWzaN-M6Vb',
        'https://lh3.googleusercontent.com/d/1LLYfLbb_cLoaF4EXg-FX4RBfPGnj6L4g',
        'https://lh3.googleusercontent.com/d/1Rk1maKdfkFWonMHhnXhwO7zGnvEGTZv6'
      ],
      tags: ['Graphic', 'Branding', 'Logistics', 'Industrial'],
      fullContent: 'MSI FULFILLMENT is a visual exploration of logistics efficiency and industrial design. The project focuses on creating a robust identity that communicates reliability while maintaining a high level of aesthetic sophistication. The design language utilizes bold grids and structured color palettes to reflect the precision required in modern fulfillment operations.'
    },
    {
      id: 'gd-live-show',
      title: 'Live Show Poster',
      description: 'Experimental poster designs for underground live music events, blending bold typography with raw textures.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1CzQRxfTWNXiY5hAjx01dJkKBltMNbGmd',
      images: [
        'https://lh3.googleusercontent.com/d/1BmcPz4rD45myKxlIAzZUxbsJvNTWfd3Z',
        'https://lh3.googleusercontent.com/d/1g0fcLKlWFbTEIO2x3MpichZvDFI2tII',
        'https://lh3.googleusercontent.com/d/16_txnQOjcuIFemxTXiPI2SGhwD6a633j'
      ],
      tags: ['Graphic', 'Poster', 'Live Show', 'Branding'],
      externalUrl: 'https://wap.showstart.com/pages/activity/detail/detail?ssfrom=user-8688&activityId=174046',
      fullContent: 'This series explores the raw energy of live performances. Each poster is a translation of a specific musical atmosphere into a visual identity, utilizing experimental layouts and distressed textures to echo the intensity of the scene.'
    }
  ],
  web_ai: [
    {
      id: 'ai-1',
      title: 'AR Warehouse System',
      description: 'Next-generation AR logistics management system for enhancing warehouse efficiency.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1-7FY6zYBdy5SnX4tLw42YcStf7SmveUw',
      images: ['https://lh3.googleusercontent.com/d/1-7FY6zYBdy5SnX4tLw42YcStf7SmveUw'],
      tags: ['AR', 'Logistics', 'Efficiency'],
      externalUrl: 'https://lumina-ar-logistics.vercel.app/'
    },
    {
      id: 'ai-2',
      title: 'Scholar Stream',
      description: 'AI-enhanced academic streaming and knowledge sharing platform for global education.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1UK_0-jnPwyTLv4HhN8fC51CpPxk82ylC',
      images: ['https://lh3.googleusercontent.com/d/1UK_0-jnPwyTLv4HhN8fC51CpPxk82ylC'],
      tags: ['Education', 'AI', 'Streaming'],
      externalUrl: 'https://scholar-stream-ten.vercel.app/'
    },
    {
      id: 'ai-3',
      title: 'Dream Core Generator',
      description: 'Experimental AI visual generator for creative storytelling and conceptual visual design.',
      imageUrl: 'https://lh3.googleusercontent.com/d/1rGhNX2ysGyVALhg40gW2zG8TecFPIEAe',
      images: ['https://lh3.googleusercontent.com/d/1rGhNX2ysGyVALhg40gW2zG8TecFPIEAe'],
      tags: ['Creative AI', 'Generation', 'Visuals'],
      externalUrl: 'https://sz-one.vercel.app/'
    },
    {
      id: 'ai-4',
      title: 'Mandarin FM',
      description: 'Digital platform for Mandarin language learning and curated cultural audio content.',
      imageUrl: 'https://lh3.googleusercontent.com/d/121NS1c6EPRDz3iFFBWYEYslR4SJfufs3',
      images: ['https://lh3.googleusercontent.com/d/121NS1c6EPRDz3iFFBWYEYslR4SJfufs3'],
      tags: ['Audio', 'Language', 'Culture'],
      externalUrl: 'https://mandarin-fm.com/'
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
      imageUrl: 'https://lh3.googleusercontent.com/d/12qUqTPT4CcNdOqipw0_dWDUPOQKRtSCK',
      images: ['https://lh3.googleusercontent.com/d/12qUqTPT4CcNdOqipw0_dWDUPOQKRtSCK'],
      tags: ['AI', 'Education', 'Video Gen', 'Hackathon'],
      externalUrl: 'https://xiao-shan-ai-slides.vercel.app/',
      galleryUrl: 'https://cambridge-edtech-society.org/digital-gallery.html'
    }
  ]
};
