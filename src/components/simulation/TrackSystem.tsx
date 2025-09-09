import React, { useEffect, useState } from 'react';
import { TrainComponent } from './TrainComponent';
import { SignalLight } from './SignalLight';
import { Platform } from './Platform';
import { Junction } from './Junction';
import { Section } from './Section';

interface TrackSystemProps {
  zoomLevel: number;
  isPlaying: boolean;
  simulationSpeed: number;
  onTrainClick: (trainId: string) => void;
}

const trains = [
  { id: '12951', x: 100, y: 150, direction: 'right', platform: 'PF1', status: 'moving', speed: 3.2, priority: 'High', route: 'BCT-NDLS' },
  { id: '12627', x: 400, y: 200, direction: 'right', platform: 'PF2', status: 'waiting', speed: 0, priority: 'Medium', route: 'NDLS-KCG' },
  { id: '12019', x: 200, y: 250, direction: 'left', platform: 'PF3', status: 'moving', speed: 2.8, priority: 'High', route: 'BDTS-DLI' },
  { id: '12423', x: 600, y: 300, direction: 'right', platform: 'PF4', status: 'moving', speed: 2.5, priority: 'High', route: 'NDLS-ADI' },
  { id: '12001', x: 150, y: 350, direction: 'right', platform: 'PF5', status: 'moving', speed: 3.5, priority: 'Medium', route: 'NDLS-LKO' },
  { id: '12311', x: 750, y: 400, direction: 'left', platform: 'PF6', status: 'boarding', speed: 0, priority: 'Low', route: 'HWH-NDLS' },
  { id: '12002', x: 300, y: 450, direction: 'right', platform: 'PF7', status: 'moving', speed: 2.2, priority: 'Medium', route: 'LKO-NDLS' },
  { id: '12952', x: 500, y: 500, direction: 'left', platform: 'PF8', status: 'moving', speed: 3.0, priority: 'High', route: 'NDLS-BCT' },
];

const signals = [
  { id: 'S1A', x: 280, y: 140, state: 'green' as const, section: 'A', type: 'main' as const },
  { id: 'S1B', x: 320, y: 140, state: 'green' as const, section: 'A', type: 'distant' as const },
  { id: 'S2A', x: 450, y: 190, state: 'red' as const, section: 'B', type: 'main' as const },
  { id: 'S2B', x: 490, y: 190, state: 'yellow' as const, section: 'B', type: 'shunt' as const },
  { id: 'S3A', x: 180, y: 240, state: 'yellow' as const, section: 'C', type: 'main' as const },
  { id: 'S3B', x: 220, y: 240, state: 'green' as const, section: 'C', type: 'calling_on' as const },
  { id: 'S4A', x: 650, y: 290, state: 'green' as const, section: 'D', type: 'main' as const },
  { id: 'S4B', x: 690, y: 290, state: 'green' as const, section: 'D', type: 'distant' as const },
  { id: 'S5A', x: 380, y: 340, state: 'red' as const, section: 'E', type: 'main' as const },
  { id: 'S5B', x: 420, y: 340, state: 'red' as const, section: 'E', type: 'shunt' as const },
  { id: 'S6A', x: 580, y: 390, state: 'yellow' as const, section: 'F', type: 'main' as const },
  { id: 'S6B', x: 620, y: 390, state: 'green' as const, section: 'F', type: 'calling_on' as const },
  { id: 'S7A', x: 250, y: 440, state: 'green' as const, section: 'G', type: 'main' as const },
  { id: 'S7B', x: 290, y: 440, state: 'green' as const, section: 'G', type: 'distant' as const },
  { id: 'S8A', x: 520, y: 490, state: 'green' as const, section: 'H', type: 'main' as const },
  { id: 'S8B', x: 560, y: 490, state: 'yellow' as const, section: 'H', type: 'shunt' as const },
];

const platforms = [
  { id: 'PF1', name: 'Platform 1', x: 50, y: 130, width: 220, height: 40, section: 'A' },
  { id: 'PF2', name: 'Platform 2', x: 50, y: 180, width: 220, height: 40, section: 'B' },
  { id: 'PF3', name: 'Platform 3', x: 50, y: 230, width: 220, height: 40, section: 'C' },
  { id: 'PF4', name: 'Platform 4', x: 50, y: 280, width: 220, height: 40, section: 'D' },
  { id: 'PF5', name: 'Platform 5', x: 50, y: 330, width: 220, height: 40, section: 'E' },
  { id: 'PF6', name: 'Platform 6', x: 50, y: 380, width: 220, height: 40, section: 'F' },
  { id: 'PF7', name: 'Platform 7', x: 50, y: 430, width: 220, height: 40, section: 'G' },
  { id: 'PF8', name: 'Platform 8', x: 50, y: 480, width: 220, height: 40, section: 'H' },
];

const junctions = [
  { id: 'J1', x: 350, y: 175, type: 'crossover' as const, connects: ['A', 'B'] },
  { id: 'J2', x: 550, y: 225, type: 'diamond' as const, connects: ['B', 'C'] },
  { id: 'J3', x: 450, y: 315, type: 'crossover' as const, connects: ['D', 'E'] },
  { id: 'J4', x: 650, y: 415, type: 'diamond' as const, connects: ['F', 'G'] },
  { id: 'J5', x: 400, y: 465, type: 'crossover' as const, connects: ['G', 'H'] },
];

const sections = [
  { id: 'A', name: 'Section A', startX: 50, endX: 400, y: 150, color: '#10B981' },
  { id: 'B', name: 'Section B', startX: 50, endX: 600, y: 200, color: '#F59E0B' },
  { id: 'C', name: 'Section C', startX: 50, endX: 700, y: 250, color: '#3B82F6' },
  { id: 'D', name: 'Section D', startX: 50, endX: 800, y: 300, color: '#EF4444' },
  { id: 'E', name: 'Section E', startX: 50, endX: 500, y: 350, color: '#8B5CF6' },
  { id: 'F', name: 'Section F', startX: 50, endX: 750, y: 400, color: '#F97316' },
  { id: 'G', name: 'Section G', startX: 50, endX: 600, y: 450, color: '#06B6D4' },
  { id: 'H', name: 'Section H', startX: 50, endX: 650, y: 500, color: '#84CC16' },
];

export function TrackSystem({ zoomLevel, isPlaying, simulationSpeed, onTrainClick }: TrackSystemProps) {
  const [trainPositions, setTrainPositions] = useState(trains);
  const [signalStates, setSignalStates] = useState(signals);
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);
  const [overrideText, setOverrideText] = useState('');
  const [showOverridePanel, setShowOverridePanel] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTrainPositions(prev => prev.map(train => {
        if (train.status === 'waiting' || train.status === 'boarding') return train;
        
        // Check for signal restrictions
        const nearbySignals = signalStates.filter(signal => 
          Math.abs(signal.x - train.x) < 50 && Math.abs(signal.y - train.y) < 30
        );
        
        const redSignal = nearbySignals.find(signal => signal.state === 'red');
        if (redSignal && train.direction === 'right' && train.x < redSignal.x) {
          return { ...train, status: 'waiting' as const, speed: 0 };
        }
        
        const actualSpeed = train.speed * simulationSpeed;
        const newX = train.direction === 'right' 
          ? (train.x + actualSpeed) % 1000
          : train.x - actualSpeed < 0 
            ? 1000 
            : train.x - actualSpeed;
        
        return { ...train, x: newX };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, simulationSpeed, signalStates]);

  const handleSignalClick = (signalId: string) => {
    setSelectedSignal(signalId);
    setShowOverridePanel(true);
  };

  const handleSignalOverride = (newState: 'red' | 'yellow' | 'green') => {
    if (selectedSignal) {
      setSignalStates(prev => prev.map(signal => 
        signal.id === selectedSignal 
          ? { ...signal, state: newState }
          : signal
      ));
      
      // Apply changes based on override text
      if (overrideText.toLowerCase().includes('hold')) {
        // Find trains near this signal and set them to waiting
        setTrainPositions(prev => prev.map(train => {
          const signal = signalStates.find(s => s.id === selectedSignal);
          if (signal && Math.abs(train.x - signal.x) < 100 && Math.abs(train.y - signal.y) < 50) {
            return { ...train, status: 'waiting' as const, speed: 0 };
          }
          return train;
        }));
      } else if (overrideText.toLowerCase().includes('clear')) {
        // Clear trains near this signal
        setTrainPositions(prev => prev.map(train => {
          const signal = signalStates.find(s => s.id === selectedSignal);
          if (signal && Math.abs(train.x - signal.x) < 100 && Math.abs(train.y - signal.y) < 50) {
            return { ...train, status: 'moving' as const, speed: train.speed || 2.5 };
          }
          return train;
        }));
      }
      
      setShowOverridePanel(false);
      setOverrideText('');
      setSelectedSignal(null);
    }
  };

  return (
    <div className="w-full h-full overflow-auto relative">
      <div 
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
      >
        <svg width="1200" height="600" className="w-full h-full">
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" />
            </pattern>
            <pattern id="tracks" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#1F2937" />
              <rect x="4" y="4" width="2" height="2" fill="#4B5563" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Sections */}
          {sections.map(section => (
            <Section key={section.id} {...section} />
          ))}
          
          {/* Railway Tracks */}
          <g stroke="#6B7280" strokeWidth="4" fill="none">
            {sections.map(section => (
              <g key={section.id}>
                <line 
                  x1={section.startX} 
                  y1={section.y} 
                  x2={section.endX} 
                  y2={section.y} 
                  stroke={section.color}
                  strokeWidth="3"
                />
                <line 
                  x1={section.startX} 
                  y1={section.y - 3} 
                  x2={section.endX} 
                  y2={section.y - 3} 
                  stroke="#4B5563"
                  strokeWidth="2"
                />
                <line 
                  x1={section.startX} 
                  y1={section.y + 3} 
                  x2={section.endX} 
                  y2={section.y + 3} 
                  stroke="#4B5563"
                  strokeWidth="2"
                />
              </g>
            ))}
            
            {/* Railway ties */}
            {Array.from({ length: 60 }, (_, i) => (
              <g key={i}>
                {sections.map(section => (
                  <line 
                    key={`${section.id}-${i}`}
                    x1={section.startX + i * 20} 
                    y1={section.y - 8} 
                    x2={section.startX + i * 20} 
                    y2={section.y + 8} 
                    stroke="#4B5563" 
                    strokeWidth="3"
                  />
                ))}
              </g>
            ))}
          </g>
          
          {/* Junctions */}
          {junctions.map(junction => (
            <Junction key={junction.id} {...junction} />
          ))}
          
          {/* Platforms */}
          {platforms.map(platform => (
            <Platform key={platform.id} {...platform} />
          ))}
          
          {/* Signals */}
          {signalStates.map(signal => (
            <SignalLight 
              key={signal.id} 
              {...signal} 
              onClick={() => handleSignalClick(signal.id)}
            />
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
          <text x="600" y="30" fill="#F3F4F6" fontSize="28" fontWeight="bold" textAnchor="middle">
            New Delhi Junction - Advanced Control
          </text>
          <text x="600" y="55" fill="#9CA3AF" fontSize="16" textAnchor="middle">
            Multi-Section Railway Control Center - Enhanced Simulation
          </text>
          
          {/* Section Labels */}
          {sections.map(section => (
            <text 
              key={`label-${section.id}`}
              x={section.startX + 20} 
              y={section.y - 15} 
              fill={section.color} 
              fontSize="12" 
              fontWeight="bold"
            >
              {section.name}
            </text>
          ))}
        </svg>
      </div>
      
      {/* Signal Override Panel */}
      {showOverridePanel && (
        <div className="absolute top-4 right-4 bg-gray-800 border border-gray-600 rounded-lg p-4 w-80 z-10">
          <h3 className="text-white font-bold mb-3">Signal Override: {selectedSignal}</h3>
          
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">Override Command:</label>
            <textarea
              value={overrideText}
              onChange={(e) => setOverrideText(e.target.value)}
              placeholder="e.g., Hold train 12951 at platform, Clear section for priority passage..."
              className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 text-sm"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">Set Signal State:</label>
            <div className="flex space-x-2">
              <button
                onClick={() => handleSignalOverride('red')}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm transition-colors"
              >
                🔴 Red
              </button>
              <button
                onClick={() => handleSignalOverride('yellow')}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded text-sm transition-colors"
              >
                🟡 Yellow
              </button>
              <button
                onClick={() => handleSignalOverride('green')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors"
              >
                🟢 Green
              </button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => {
                if (overrideText.trim()) {
                  handleSignalOverride('green');
                }
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors"
            >
              Apply Changes
            </button>
            <button
              onClick={() => {
                setShowOverridePanel(false);
                setOverrideText('');
                setSelectedSignal(null);
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}