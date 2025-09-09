import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface TrainComponentProps {
  id: string;
  x: number;
  y: number;
  direction: 'left' | 'right';
  platform: string;
  status: 'moving' | 'waiting' | 'boarding';
  onClick: () => void;
}

export function TrainComponent({ id, x, y, direction, status, onClick }: TrainComponentProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'moving': return '#10B981'; // green
      case 'waiting': return '#F59E0B'; // yellow
      case 'boarding': return '#3B82F6'; // blue
      default: return '#6B7280'; // gray
    }
  };

  return (
    <g onClick={onClick} className="cursor-pointer">
      {/* Train Body */}
      <rect
        x={x}
        y={y - 8}
        width="60"
        height="16"
        fill={getStatusColor()}
        stroke="#1F2937"
        strokeWidth="2"
        rx="4"
        className="hover:brightness-110 transition-all"
      />
      
      {/* Train Number */}
      <text
        x={x + 30}
        y={y + 2}
        fill="white"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
      >
        {id}
      </text>
      
      {/* Direction Arrow */}
      <g transform={`translate(${x + (direction === 'right' ? 65 : -10)}, ${y})`}>
        {direction === 'right' ? (
          <polygon
            points="0,-4 8,0 0,4"
            fill={getStatusColor()}
            stroke="#1F2937"
            strokeWidth="1"
          />
        ) : (
          <polygon
            points="0,0 -8,-4 -8,4"
            fill={getStatusColor()}
            stroke="#1F2937"
            strokeWidth="1"
          />
        )}
      </g>
      
      {/* Status Indicator */}
      <circle
        cx={x - 5}
        cy={y}
        r="3"
        fill={getStatusColor()}
        className={status === 'waiting' ? 'animate-pulse' : ''}
      />
      
      {/* Wheels */}
      <circle cx={x + 12} cy={y + 10} r="3" fill="#374151" stroke="#6B7280" strokeWidth="1" />
      <circle cx={x + 48} cy={y + 10} r="3" fill="#374151" stroke="#6B7280" strokeWidth="1" />
    </g>
  );
}