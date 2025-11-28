
import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const CandyCornIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 L85 90 H15 L50 10Z" fill="#FFD700"/>
        <path d="M50 36.6 L75 90 H25 L50 36.6Z" fill="#FFA500"/>
        <path d="M50 63.3 L65 90 H35 L50 63.3Z" fill="#FFFFFF"/>
    </svg>
);

export const SwirlIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
);

export const SpiderwebIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/>
        <path d="M2 12a10 10 0 0 1 2.93-7.07M12 2a10 10 0 0 1 7.07 2.93"/>
        <path d="M19.07 4.93A10 10 0 0 1 22 12m-2.93 7.07A10 10 0 0 1 12 22"/>
    </svg>
);

export const PotionIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5V2m0 3c-3.33-2-6.67 0-6.67 0S8.67 3 12 5zm0 0c3.33-2 6.67 0 6.67 0S15.33 3 12 5zM7 5.08A7 7 0 0 0 5 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6a7 7 0 0 0-2-6.92"/>
    </svg>
);

export const SkullIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9c-.83 0-1.5.67-1.5 1.5S9.17 14 10 14s1.5-.67 1.5-1.5S10.83 11 10 11zm4 0c-.83 0-1.5.67-1.5 1.5S13.17 14 14 14s1.5-.67 1.5-1.5S14.83 11 14 11zm-2 4h-4v2h4v-2z"/>
    </svg>
);

export const GhostIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-4.42 0-8 3.58-8 8v10h16V10c0-4.42-3.58-8-8-8zm-3 10c-.83 0-1.5.67-1.5 1.5S8.17 15 9 15s1.5-.67 1.5-1.5S9.83 12 9 12zm6 0c-.83 0-1.5.67-1.5 1.5S14.17 15 15 15s1.5-.67 1.5-1.5S15.83 12 15 12zm-3 8h-2v-2h2v2z"/>
    </svg>
);

export const LightningIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 6h14m-7 0v12m-4-8h8"/>
    </svg>
);

export const CauldronIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 2.21-.89 4.21-2.34 5.66L16 19h-8l-1.66-1.34A8.01 8.01 0 0 1 4 12zm-2 4h20m-16 4h12"/>
    </svg>
);

export const BatIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l-10 6v10h20V8l-10-6zm-8 7.5l8-4.5 8 4.5V18h-2v-5h-4v5H6v-4.5H4v-1z"/>
    </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const StarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
);
