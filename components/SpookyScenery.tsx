import React from 'react';

const SpookyScenery = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-halloween-dark">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
        <defs>
          <radialGradient id="skyGradient" cx="50%" cy="10%" r="90%">
            <stop offset="0%" stopColor="#4338ca" /> 
            <stop offset="60%" stopColor="#1e1b4b" /> 
            <stop offset="100%" stopColor="#1a1a1f" />
          </radialGradient>
          
          <linearGradient id="fogGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="70%" stopColor="#1e1b4b" stopOpacity="0" />
            <stop offset="95%" stopColor="#1e1b4b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="1" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="7" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
           <radialGradient id="jackoGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb700" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffb700" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: The background sky gradient */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#skyGradient)" />

        {/* Layer 2: A pale, glowing moon */}
        <circle cx="85" cy="18" r="6" fill="#e2e8f0" opacity="0.6" filter="url(#glow)" />

        {/* Layer 3: Bats */}
        <g fill="#0c0a1d" opacity="0.7">
            <path d="M 80 15 C 82 12, 85 12, 87 15 L 90 18 L 87 16 C 85 15, 82 15, 80 16 Z" />
            <path d="M 90 22 C 92 19, 95 19, 97 22 L 100 25 L 97 23 C 95 22, 92 22, 90 23 Z" />
            <path d="M 78 25 C 80 22, 83 22, 85 25 L 88 28 L 85 26 C 83 25, 80 25, 78 26 Z" />
        </g>
        
        {/* Layer 4: Distant gnarled trees */}
        <g fill="#1a1a1f" opacity="0.8">
            <path d="M 0 95 L 5 70 L 6 72 L 8 65 L 10 75 L 15 60 L 18 78 L 25 95 Z" />
            <path d="M 100 95 L 95 70 L 94 72 L 92 65 L 90 75 L 85 60 L 82 78 L 75 95 Z" />
        </g>
        
        {/* Layer 5: Characters */}
        <g opacity="0.9">
            {/* Left: Witch */}
            <path d="M 24 95 L 20 60 L 30 60 L 26 95 Z M 25 45 L 18 60 L 32 60 Z" fill="#111827" />
            {/* Right: Skeleton */}
            <g fill="#e2e8f0">
              <rect x="74.5" y="55" width="1" height="30" />
              <circle cx="75" cy="52" r="3" />
              <path d="M 72 60 H 78 V 65 H 72 Z M 72 67 H 78 V 72 H 72 Z" />
              <path d="M 79 45 L 75 95" stroke="#475569" strokeWidth="0.5" />
            </g>
        </g>

        {/* Layer 6: Central Gothic Arch */}
        <g fill="#212125">
             <path d="M 30 95 V 40 C 30 25, 40 15, 50 15 C 60 15, 70 25, 70 40 V 95 H 65 V 40 C 65 28, 57 20, 50 20 C 43 20, 35 28, 35 40 V 95 Z" />
            {/* Gargoyle/Skull on Arch */}
            <g fill="#333338">
                <path d="M 50 10 C 47 10, 45 13, 45 16 H 55 C 55 13, 53 10, 50 10 Z M 46 17 V 19 H 54 V 17 Z" />
                <circle cx="48" cy="14" r="1" fill="black" />
                <circle cx="52" cy="14" r="1" fill="black" />
            </g>
        </g>

        {/* Layer 7: Ground line and tombstones */}
        <g fill="#1a1a1f">
            <rect x="0" y="95" width="100%" height="5" />
            <path d="M 15 95 V 80 C 15 77, 18 77, 18 80 V 95 Z" />
            <path d="M 82 95 V 85 H 88 V 95 Z" />
        </g>

        {/* Layer 8: Jack O' Lanterns */}
        <g>
            <rect x="5" y="88" width="12" height="8" fill="url(#jackoGlow)" opacity="0.7" filter="url(#glow)" />
            <path d="M 6 96 C 6 90, 16 90, 16 96 Z M 6 96 C 4 92, 18 92, 16 96" fill="#8c3a00" />
            <path d="M 8 91 L 10 93 L 12 91 L 10 89 Z M 13 91 L 15 93 L 17 91 L 15 89 Z M 9 95 C 11 94, 13 94, 15 95 L 14 96 L 10 96 Z" fill="#ffb700" />
            
            <rect x="85" y="90" width="10" height="6" fill="url(#jackoGlow)" opacity="0.7" filter="url(#glow)" />
            <path d="M 86 97 C 86 92, 94 92, 94 97 Z M 86 97 C 84 94, 96 94, 94 97" fill="#8c3a00" />
            <path d="M 88 92 L 90 94 L 92 92 Z M 87 95 H 93 V 96 H 87 Z" fill="#ffb700" />
        </g>

        {/* Layer 9: The fog overlay */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#fogGradient)" />
      </svg>
    </div>
  );
};

export default SpookyScenery;