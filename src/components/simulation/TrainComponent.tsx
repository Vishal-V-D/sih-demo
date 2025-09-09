import React from 'react';

interface TrainComponentProps {
  id: string;
  x: number;
  y: number;
  direction: 'left' | 'right';
  platform: string;
  status: 'moving' | 'waiting' | 'boarding';
  speed: number;
  priority?: string;
  route?: string;
  onClick: () => void;
}

export function TrainComponent({ 
  id, x, y, direction, status, speed, priority, route, onClick 
}: TrainComponentProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'moving': return '#10B981'; // green
      case 'waiting': return '#F59E0B'; // yellow
      case 'boarding': return '#3B82F6'; // blue
      default: return '#6B7280'; // gray
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'High': return '#EF4444'; // red
      case 'Medium': return '#F59E0B'; // yellow
      case 'Low': return '#10B981'; // green
      default: return '#6B7280'; // gray
    }
  };

  const getTrainLength = () => {
    // Vary train length based on type (inferred from train number)
    if (id.includes('951') || id.includes('952')) return 80; // Rajdhani - longer
    if (id.includes('019') || id.includes('001') || id.includes('002')) return 70; // Shatabdi
    return 60; // Regular express
  };

  const trainLength = getTrainLength();

  return (
    <g onClick={onClick} className="cursor-pointer">
      {/* Train Body */}
      <rect
        x={x}
        y={y - 10}
        width={trainLength}
        height="20"
        fill={getStatusColor()}
        stroke="#1F2937"
        strokeWidth="2"
        rx="6"
        className="hover:brightness-110 transition-all"
      />
      
      {/* Train Sections (coaches) */}
      {Array.from({ length: Math.floor(trainLength / 20) }, (_, i) => (
        <line
          key={i}
          x1={x + (i + 1) * 20}
          y1={y - 8}
          x2={x + (i + 1) * 20}
          y2={y + 8}
          stroke="#1F2937"
          strokeWidth="1"
        />
      ))}
      
      {/* Engine (front) */}
      <rect
        x={direction === 'right' ? x + trainLength - 15 : x}
        y={y - 12}
        width="15"
        height="24"
        fill="#374151"
        stroke="#1F2937"
        strokeWidth="2"
        rx="3"
      />
      
      {/* Train Number */}
      <text
        x={x + trainLength / 2}
        y={y - 2}
        fill="white"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
      >
        {id}
      </text>
      
      {/* Speed indicator */}
      <text
        x={x + trainLength / 2}
        y={y + 8}
        fill="white"
        fontSize="8"
        textAnchor="middle"
      >
        {speed > 0 ? `${speed.toFixed(1)} km/h` : 'STOP'}
      </text>
      
      {/* Direction Arrow */}
      <g transform={`translate(${x + (direction === 'right' ? trainLength + 5 : -15)}, ${y})`}>
        {direction === 'right' ? (
          <polygon
            points="0,-6 12,0 0,6"
            fill={getStatusColor()}
            stroke="#1F2937"
            strokeWidth="1"
          />
        ) : (
          <polygon
            points="0,0 -12,-6 -12,6"
            fill={getStatusColor()}
            stroke="#1F2937"
            strokeWidth="1"
          />
        )}
      </g>
      
      {/* Priority Indicator */}
      <circle
        cx={x - 8}
        cy={y - 15}
        r="4"
        fill={getPriorityColor()}
        stroke="#1F2937"
        strokeWidth="1"
        className={priority === 'High' ? 'animate-pulse' : ''}
      />
      
      {/* Status Indicator */}
      <circle
        cx={x - 8}
        cy={y}
        r="3"
        fill={getStatusColor()}
        className={status === 'waiting' ? 'animate-pulse' : ''}
      />
      
      {/* Route indicator */}
      {route && (
        <text
          x={x + trainLength / 2}
          y={y - 18}
          fill="#9CA3AF"
          fontSize="8"
          textAnchor="middle"
        >
          {route}
        </text>
      )}
      
      {/* Wheels */}
      {Array.from({ length: Math.floor(trainLength / 15) }, (_, i) => (
        <circle 
          key={i}
          cx={x + 8 + i * 15} 
          cy={y + 12} 
          r="3" 
          fill="#374151" 
          stroke="#6B7280" 
          strokeWidth="1" 
        />
      ))}
      
      {/* Pantograph (for electric trains) */}
      {(id.includes('951') || id.includes('019')) && (
        <line
          x1={x + trainLength / 2}
          y1={y - 10}
          x2={x + trainLength / 2}
          y2={y - 20}
          stroke="#3B82F6"
          strokeWidth="2"
        />
      )}
    </g>
  );
}