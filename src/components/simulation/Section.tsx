import React from 'react';

interface SectionProps {
  id: string;
  name: string;
  startX: number;
  endX: number;
  y: number;
  color: string;
}

export function Section({ id, name, startX, endX, y, color }: SectionProps) {
  return (
    <g>
      {/* Section boundary markers */}
      <line 
        x1={startX} 
        y1={y - 20} 
        x2={startX} 
        y2={y + 20} 
        stroke={color} 
        strokeWidth="2" 
        strokeDasharray="5,5"
      />
      <line 
        x1={endX} 
        y1={y - 20} 
        x2={endX} 
        y2={y + 20} 
        stroke={color} 
        strokeWidth="2" 
        strokeDasharray="5,5"
      />
      
      {/* Section background */}
      <rect 
        x={startX} 
        y={y - 25} 
        width={endX - startX} 
        height="50" 
        fill={color} 
        opacity="0.1" 
        rx="5"
      />
      
      {/* Section distance markers */}
      {Array.from({ length: Math.floor((endX - startX) / 100) }, (_, i) => (
        <g key={i}>
          <line 
            x1={startX + (i + 1) * 100} 
            y1={y - 10} 
            x2={startX + (i + 1) * 100} 
            y2={y + 10} 
            stroke={color} 
            strokeWidth="1" 
            opacity="0.5"
          />
          <text 
            x={startX + (i + 1) * 100} 
            y={y + 25} 
            fill={color} 
            fontSize="8" 
            textAnchor="middle"
            opacity="0.7"
          >
            {i + 1}km
          </text>
        </g>
      ))}
    </g>
  );
}