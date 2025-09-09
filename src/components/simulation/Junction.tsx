import React from 'react';

interface JunctionProps {
  id: string;
  x: number;
  y: number;
  type: 'crossover' | 'diamond' | 'turnout';
  connects: string[];
}

export function Junction({ id, x, y, type, connects }: JunctionProps) {
  const renderCrossover = () => (
    <g>
      {/* Main crossing lines */}
      <line x1={x - 20} y1={y - 15} x2={x + 20} y2={y + 15} stroke="#F59E0B" strokeWidth="3" />
      <line x1={x - 20} y1={y + 15} x2={x + 20} y2={y - 15} stroke="#F59E0B" strokeWidth="3" />
      
      {/* Junction box */}
      <rect x={x - 8} y={y - 8} width="16" height="16" fill="#374151" stroke="#F59E0B" strokeWidth="2" rx="2" />
      
      {/* Center indicator */}
      <circle cx={x} cy={y} r="3" fill="#F59E0B" className="animate-pulse" />
    </g>
  );

  const renderDiamond = () => (
    <g>
      {/* Diamond shape */}
      <polygon 
        points={`${x},${y-15} ${x+15},${y} ${x},${y+15} ${x-15},${y}`}
        fill="#3B82F6" 
        stroke="#1E40AF" 
        strokeWidth="2"
        opacity="0.8"
      />
      
      {/* Crossing tracks */}
      <line x1={x - 25} y1={y} x2={x + 25} y2={y} stroke="#6B7280" strokeWidth="3" />
      <line x1={x} y1={y - 25} x2={x} y2={y + 25} stroke="#6B7280" strokeWidth="3" />
      
      {/* Center light */}
      <circle cx={x} cy={y} r="2" fill="#3B82F6" className="animate-pulse" />
    </g>
  );

  const renderTurnout = () => (
    <g>
      {/* Main line */}
      <line x1={x - 20} y1={y} x2={x + 20} y2={y} stroke="#6B7280" strokeWidth="3" />
      
      {/* Diverging line */}
      <path d={`M ${x - 10} ${y} Q ${x} ${y - 5} ${x + 10} ${y - 10}`} 
            stroke="#10B981" strokeWidth="3" fill="none" />
      
      {/* Switch mechanism */}
      <rect x={x - 5} y={y - 3} width="10" height="6" fill="#EF4444" stroke="#DC2626" strokeWidth="1" rx="1" />
      
      {/* Switch indicator */}
      <circle cx={x} cy={y} r="2" fill="#EF4444" className="animate-pulse" />
    </g>
  );

  return (
    <g>
      {type === 'crossover' && renderCrossover()}
      {type === 'diamond' && renderDiamond()}
      {type === 'turnout' && renderTurnout()}
      
      {/* Junction ID */}
      <text x={x} y={y + 25} fill="#9CA3AF" fontSize="10" fontWeight="bold" textAnchor="middle">
        {id}
      </text>
      
      {/* Connected sections */}
      <text x={x} y={y + 35} fill="#6B7280" fontSize="8" textAnchor="middle">
        {connects.join('-')}
      </text>
    </g>
  );
}