import React from 'react';

interface SignalLightProps {
  id: string;
  x: number;
  y: number;
  state: 'red' | 'yellow' | 'green';
  section?: string;
  type?: 'main' | 'distant' | 'shunt' | 'calling_on';
  onClick?: () => void;
}

export function SignalLight({ id, x, y, state, section, type = 'main', onClick }: SignalLightProps) {
  const getColor = (lightState: string) => {
    if (state === lightState) {
      switch (lightState) {
        case 'red': return '#EF4444';
        case 'yellow': return '#F59E0B';
        case 'green': return '#10B981';
      }
    }
    return '#374151';
  };

  const getSignalHeight = () => {
    switch (type) {
      case 'main': return 35;
      case 'distant': return 25;
      case 'shunt': return 20;
      case 'calling_on': return 15;
      default: return 35;
    }
  };

  const getSignalWidth = () => {
    switch (type) {
      case 'main': return 20;
      case 'distant': return 16;
      case 'shunt': return 12;
      case 'calling_on': return 10;
      default: return 20;
    }
  };

  return (
    <g onClick={onClick} className="cursor-pointer hover:opacity-80 transition-opacity">
      {/* Signal Post */}
      <rect 
        x={x} 
        y={y - getSignalHeight()} 
        width="4" 
        height={getSignalHeight() + 10} 
        fill="#6B7280" 
      />
      
      {/* Signal Box */}
      <rect 
        x={x - getSignalWidth()/2} 
        y={y - getSignalHeight()} 
        width={getSignalWidth()} 
        height={getSignalHeight() - 5} 
        fill="#374151" 
        stroke="#6B7280" 
        strokeWidth="1" 
        rx="2" 
      />
      
      {/* Signal Lights based on type */}
      {type === 'main' && (
        <>
          <circle 
            cx={x + 2} 
            cy={y - 28} 
            r="4" 
            fill={getColor('red')} 
            stroke="#1F2937" 
            strokeWidth="1"
            className={state === 'red' ? 'animate-pulse' : ''}
            style={{
              filter: state === 'red' ? 'drop-shadow(0 0 8px #EF4444)' : 'none'
            }}
          />
          <circle 
            cx={x + 2} 
            cy={y - 18} 
            r="4" 
            fill={getColor('yellow')} 
            stroke="#1F2937" 
            strokeWidth="1"
            className={state === 'yellow' ? 'animate-pulse' : ''}
            style={{
              filter: state === 'yellow' ? 'drop-shadow(0 0 8px #F59E0B)' : 'none'
            }}
          />
          <circle 
            cx={x + 2} 
            cy={y - 8} 
            r="4" 
            fill={getColor('green')} 
            stroke="#1F2937" 
            strokeWidth="1"
            className={state === 'green' ? 'animate-pulse' : ''}
            style={{
              filter: state === 'green' ? 'drop-shadow(0 0 8px #10B981)' : 'none'
            }}
          />
        </>
      )}
      
      {type === 'distant' && (
        <>
          <circle 
            cx={x + 2} 
            cy={y - 20} 
            r="3" 
            fill={getColor('yellow')} 
            stroke="#1F2937" 
            strokeWidth="1"
            className={state === 'yellow' ? 'animate-pulse' : ''}
          />
          <circle 
            cx={x + 2} 
            cy={y - 10} 
            r="3" 
            fill={getColor('green')} 
            stroke="#1F2937" 
            strokeWidth="1"
            className={state === 'green' ? 'animate-pulse' : ''}
          />
        </>
      )}
      
      {type === 'shunt' && (
        <circle 
          cx={x + 2} 
          cy={y - 12} 
          r="3" 
          fill={state === 'red' ? '#EF4444' : '#10B981'} 
          stroke="#1F2937" 
          strokeWidth="1"
          className="animate-pulse"
        />
      )}
      
      {type === 'calling_on' && (
        <rect
          x={x - 2}
          y={y - 10}
          width="8"
          height="4"
          fill={state === 'red' ? '#EF4444' : '#10B981'}
          stroke="#1F2937"
          strokeWidth="1"
          className="animate-pulse"
        />
      )}
      
      {/* Signal ID and Type */}
      <text x={x + 25} y={y - 20} fill="#9CA3AF" fontSize="8" fontWeight="bold">
        {id}
      </text>
      <text x={x + 25} y={y - 12} fill="#6B7280" fontSize="6">
        {type.toUpperCase()}
      </text>
      {section && (
        <text x={x + 25} y={y - 4} fill="#4B5563" fontSize="6">
          SEC-{section}
        </text>
      )}
    </g>
  );
}