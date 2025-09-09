import React from 'react';

interface PlatformProps {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function Platform({ id, name, x, y, width, height }: PlatformProps) {
  return (
    <g>
      {/* Platform Surface */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#4B5563"
        stroke="#6B7280"
        strokeWidth="2"
        rx="4"
      />
      
      {/* Platform Edge */}
      <rect
        x={x + width - 5}
        y={y}
        width={5}
        height={height}
        fill="#F59E0B"
      />
      
      {/* Platform Label */}
      <text
        x={x + width / 2}
        y={y + height / 2 + 4}
        fill="#F3F4F6"
        fontSize="12"
        fontWeight="bold"
        textAnchor="middle"
      >
        {name}
      </text>
      
      {/* Platform Markings */}
      {Array.from({ length: Math.floor(width / 20) }, (_, i) => (
        <line
          key={i}
          x1={x + 10 + i * 20}
          y1={y}
          x2={x + 10 + i * 20}
          y2={y + height}
          stroke="#6B7280"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      ))}
    </g>
  );
}