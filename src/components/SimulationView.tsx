import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Play, Pause, RotateCcw } from 'lucide-react';
import { TrackSystem } from './simulation/TrackSystem';
import { TrainModal } from './simulation/TrainModal';

export function SimulationView() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Control Panel */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-bold text-white">Station Simulation</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              
              <button className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-400">Speed:</label>
              <select 
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={5}>5x</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-400 min-w-[60px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
                className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simulation Area */}
      <div className="flex-1 overflow-hidden bg-gray-950 relative">
        <TrackSystem 
          zoomLevel={zoomLevel}
          isPlaying={isPlaying}
          simulationSpeed={simulationSpeed}
          onTrainClick={setSelectedTrain}
        />
      </div>
      
      {/* Train Details Modal */}
      {selectedTrain && (
        <TrainModal
          trainId={selectedTrain}
          onClose={() => setSelectedTrain(null)}
        />
      )}
    </div>
  );
}