import React from 'react';

interface SignalLightProps {
  id: string;
  x: number;
  y: number;
  state: 'red' | 'yellow' | 'green';
}

export function SignalLight({ id, x, y, state }: SignalLightProps) {
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

  return (
    <g>
      {/* Signal Post */}
      <rect x={x} y={y - 30} width="4" height="40" fill="#6B7280" />
      <rect x={x - 8} y={y - 35} width="20" height="25" fill="#374151" stroke="#6B7280" strokeWidth="1" rx="2" />
      
      {/* Signal Lights */}
      <circle 
        cx={x + 2} 
        cy={y - 28} 
        r="3" 
        fill={getColor('red')} 
        stroke="#1F2937" 
        strokeWidth="1"
        className={state === 'red' ? 'animate-pulse' : ''}
        style={{
          filter: state === 'red' ? 'drop-shadow(0 0 6px #EF4444)' : 'none'
        }}
      />
      <circle 
        cx={x + 2} 
        cy={y - 20} 
        r="3" 
        fill={getColor('yellow')} 
        stroke="#1F2937" 
        strokeWidth="1"
        className={state === 'yellow' ? 'animate-pulse' : ''}
        style={{
          filter: state === 'yellow' ? 'drop-shadow(0 0 6px #F59E0B)' : 'none'
        }}
      />
      <circle 
        cx={x + 2} 
        cy={y - 12} 
        r="3" 
        fill={getColor('green')} 
        stroke="#1F2937" 
        strokeWidth="1"
        className={state === 'green' ? 'animate-pulse' : ''}
        style={{
          filter: state === 'green' ? 'drop-shadow(0 0 6px #10B981)' : 'none'
        }}
      />
      
      {/* Signal ID */}
      <text x={x + 15} y={y - 20} fill="#9CA3AF" fontSize="8" fontWeight="bold">
        {id}
      </text>
    </g>
  );
}