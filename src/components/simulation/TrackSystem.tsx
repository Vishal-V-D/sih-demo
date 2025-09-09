import React, { useEffect, useState } from 'react';
import { TrainComponent } from './TrainComponent';
import { SignalLight } from './SignalLight';
import { Platform } from './Platform';

interface TrackSystemProps {
  zoomLevel: number;
  isPlaying: boolean;
  simulationSpeed: number;
  onTrainClick: (trainId: string) => void;
}

const trains = [
  { id: '12951', x: 100, y: 150, direction: 'right', platform: 'PF1', status: 'moving', speed: 2 },
  { id: '12627', x: 400, y: 200, direction: 'right', platform: 'PF2', status: 'waiting', speed: 0 },
  { id: '12019', x: 200, y: 250, direction: 'left', platform: 'PF3', status: 'moving', speed: 1.5 },
  { id: '12423', x: 600, y: 300, direction: 'right', platform: 'PF4', status: 'moving', speed: 2.2 },
];

const signals = [
  { id: 'S1', x: 350, y: 140, state: 'green' as const },
  { id: 'S2', x: 450, y: 190, state: 'red' as const },
  { id: 'S3', x: 150, y: 240, state: 'yellow' as const },
  { id: 'S4', x: 650, y: 290, state: 'green' as const },
];

const platforms = [
  { id: 'PF1', name: 'Platform 1', x: 50, y: 130, width: 200, height: 40 },
  { id: 'PF2', name: 'Platform 2', x: 50, y: 180, width: 200, height: 40 },
  { id: 'PF3', name: 'Platform 3', x: 50, y: 230, width: 200, height: 40 },
  { id: 'PF4', name: 'Platform 4', x: 50, y: 280, width: 200, height: 40 },
];

export function TrackSystem({ zoomLevel, isPlaying, simulationSpeed, onTrainClick }: TrackSystemProps) {
  const [trainPositions, setTrainPositions] = useState(trains);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTrainPositions(prev => prev.map(train => {
        if (train.status === 'waiting') return train;
        
        const newX = train.direction === 'right' 
          ? (train.x + train.speed * simulationSpeed) % 800
          : train.x - train.speed * simulationSpeed < 0 
            ? 800 
            : train.x - train.speed * simulationSpeed;
        
        return { ...train, x: newX };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, simulationSpeed]);

  return (
    <div 
      className="w-full h-full overflow-auto"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
    >
      <svg width="1000" height="500" className="w-full h-full">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Railway Tracks */}
        <g stroke="#6B7280" strokeWidth="3" fill="none">
          {/* Main tracks */}
          <line x1="50" y1="150" x2="950" y2="150" />
          <line x1="50" y1="200" x2="950" y2="200" />
          <line x1="50" y1="250" x2="950" y2="250" />
          <line x1="50" y1="300" x2="950" y2="300" />
          
          {/* Railway ties */}
          {Array.from({ length: 45 }, (_, i) => (
            <g key={i}>
              <line x1={50 + i * 20} y1="140" x2={50 + i * 20} y2="160" stroke="#4B5563" strokeWidth="2" />
              <line x1={50 + i * 20} y1="190" x2={50 + i * 20} y2="210" stroke="#4B5563" strokeWidth="2" />
              <line x1={50 + i * 20} y1="240" x2={50 + i * 20} y2="260" stroke="#4B5563" strokeWidth="2" />
              <line x1={50 + i * 20} y1="290" x2={50 + i * 20} y2="310" stroke="#4B5563" strokeWidth="2" />
            </g>
          ))}
          
          {/* Junction connections */}
          <path d="M 300 200 Q 320 180 340 150" strokeWidth="2" />
          <path d="M 500 200 Q 520 220 540 250" strokeWidth="2" />
          <path d="M 700 250 Q 720 270 740 300" strokeWidth="2" />
        </g>
        
        {/* Platforms */}
        {platforms.map(platform => (
          <Platform key={platform.id} {...platform} />
        ))}
        
        {/* Signals */}
        {signals.map(signal => (
          <SignalLight key={signal.id} {...signal} />
        ))}
        
        {/* Trains */}
        {trainPositions.map(train => (
          <TrainComponent 
            key={train.id} 
            {...train} 
            onClick={() => onTrainClick(train.id)}
          />
        ))}
        
        {/* Station Name */}
        <text x="500" y="30" fill="#F3F4F6" fontSize="24" fontWeight="bold" textAnchor="middle">
          New Delhi Junction
        </text>
        <text x="500" y="50" fill="#9CA3AF" fontSize="14" textAnchor="middle">
          Railway Control Center - Simulation View
        </text>
      </svg>
    </div>
  );
}