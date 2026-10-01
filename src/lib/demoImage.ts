// A colorful demo image (a gradient scene with a mountain-like shape)
export const DEMO_IMAGE = `data:image/svg+xml;base64,${btoa(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#87CEEB"/>
      <stop offset="100%" style="stop-color:#E0F7FA"/>
    </linearGradient>
    <linearGradient id="mountain1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4A7C59"/>
      <stop offset="100%" style="stop-color:#2D5016"/>
    </linearGradient>
    <linearGradient id="mountain2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#5B8C5A"/>
      <stop offset="100%" style="stop-color:#3A6B35"/>
    </linearGradient>
    <linearGradient id="water" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4A90D9"/>
      <stop offset="100%" style="stop-color:#2C5F8A"/>
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#FFD700"/>
      <stop offset="100%" style="stop-color:#FFA500"/>
    </radialGradient>
  </defs>
  
  <!-- Sky -->
  <rect width="800" height="600" fill="url(#sky)"/>
  
  <!-- Sun -->
  <circle cx="600" cy="120" r="50" fill="url(#sun)" opacity="0.9"/>
  
  <!-- Clouds -->
  <ellipse cx="200" cy="100" rx="60" ry="20" fill="white" opacity="0.7"/>
  <ellipse cx="240" cy="90" rx="40" ry="15" fill="white" opacity="0.7"/>
  <ellipse cx="500" cy="80" rx="50" ry="18" fill="white" opacity="0.6"/>
  
  <!-- Far mountains -->
  <polygon points="0,400 150,200 300,400" fill="url(#mountain1)" opacity="0.6"/>
  <polygon points="200,400 400,150 600,400" fill="url(#mountain2)" opacity="0.7"/>
  <polygon points="500,400 650,220 800,400" fill="url(#mountain1)" opacity="0.5"/>
  
  <!-- Near mountains -->
  <polygon points="0,450 200,280 400,450" fill="url(#mountain2)"/>
  <polygon points="300,450 500,250 700,450" fill="url(#mountain1)"/>
  
  <!-- Snow caps -->
  <polygon points="400,150 380,190 420,190" fill="white" opacity="0.8"/>
  <polygon points="500,250 480,280 520,280" fill="white" opacity="0.6"/>
  
  <!-- Water -->
  <rect y="450" width="800" height="150" fill="url(#water)"/>
  
  <!-- Water reflections -->
  <ellipse cx="400" cy="500" rx="200" ry="10" fill="white" opacity="0.1"/>
  <ellipse cx="400" cy="530" rx="150" ry="8" fill="white" opacity="0.08"/>
  
  <!-- Trees -->
  <g fill="#2D5016">
    <polygon points="100,450 110,400 120,450"/>
    <polygon points="130,450 140,410 150,450"/>
    <polygon points="160,450 170,395 180,450"/>
    <polygon points="650,450 660,405 670,450"/>
    <polygon points="680,450 690,415 700,450"/>
    <polygon points="710,450 720,400 730,450"/>
  </g>
  
  <!-- Birds -->
  <g stroke="#333" stroke-width="2" fill="none" opacity="0.6">
    <path d="M300,150 Q305,145 310,150 Q315,145 320,150"/>
    <path d="M340,170 Q345,165 350,170 Q355,165 360,170"/>
    <path d="M280,180 Q285,175 290,180 Q295,175 300,180"/>
  </g>
</svg>
`)}`;