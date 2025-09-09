import React, { useState } from 'react';
import { X, Clock, MapPin, AlertCircle, CheckCircle, Zap, Settings } from 'lucide-react';

interface TrainModalProps {
  trainId: string;
  onClose: () => void;
}

const trainDetails = {
  '12951': {
    number: '12951',
    name: 'Mumbai Rajdhani Express',
    route: 'Bandra Terminus → New Delhi',
    currentLocation: 'Platform 1',
    delay: 0,
    priority: 'High',
    eta: '14:30',
    etd: '14:35',
    coach_count: 18,
    capacity: 1224,
    occupancy: 89,
    speed: 3.2,
    maxSpeed: 130,
    type: 'Electric'
  },
  '12627': {
    number: '12627',
    name: 'Karnataka Express',
    route: 'New Delhi → Kacheguda',
    currentLocation: 'Platform 2',
    delay: 15,
    priority: 'Medium',
    eta: '15:10',
    etd: '15:25',
    coach_count: 22,
    capacity: 1540,
    occupancy: 76,
    speed: 0,
    maxSpeed: 110,
    type: 'Electric'
  }
};

export function TrainModal({ trainId, onClose }: TrainModalProps) {
  const [overrideCommand, setOverrideCommand] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [showSimulation, setShowSimulation] = useState(false);
  
  const train = trainDetails[trainId as keyof typeof trainDetails] || trainDetails['12951'];

  const handleAcceptRecommendation = () => {
    console.log('Accepting AI recommendation for train:', trainId);
    // In real implementation, this would trigger the AI action
    onClose();
  };

  const handleOverride = () => {
    if (overrideCommand.trim()) {
      console.log('Override command:', overrideCommand, 'for train:', trainId);
      // In real implementation, this would execute the override
      onClose();
    }
  };

  const handleSimulateWhatIf = () => {
    setShowSimulation(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border border-gray-700 w-[600px] max-w-90vw max-h-90vh overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h3 className="text-xl font-bold text-white">Train Control Panel</h3>
            <p className="text-orange-400 font-mono font-bold text-lg">{train.number}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Train Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">{train.name}</h4>
              <p className="text-gray-400 text-sm mb-4">{train.route}</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Current Location</span>
                  <span className="text-white font-medium">{train.currentLocation}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Schedule</span>
                  <span className="text-white">ETA: {train.eta} | ETD: {train.etd}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">Speed</span>
                  <span className="text-white">{train.speed} km/h (Max: {train.maxSpeed} km/h)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">Status</span>
                  {train.delay === 0 ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  )}
                </div>
                <div className="text-white font-medium">
                  {train.delay === 0 ? 'On Time' : `Delayed by ${train.delay} minutes`}
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-300 text-sm mb-1">Priority Level</div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  train.priority === 'High' ? 'bg-red-900 text-red-200' : 
                  train.priority === 'Medium' ? 'bg-yellow-900 text-yellow-200' :
                  'bg-green-900 text-green-200'
                }`}>
                  {train.priority} Priority
                </span>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-300 text-sm mb-1">Occupancy</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${train.occupancy}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm">{train.occupancy}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-400" />
              <span>AI Control Options</span>
            </h4>
            
            <div className="space-y-4">
              {/* Current AI Recommendation */}
              <div className="bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg p-4">
                <h5 className="text-blue-400 font-medium mb-2">Current AI Recommendation</h5>
                <p className="text-gray-300 text-sm mb-3">
                  {train.delay > 0 
                    ? `Hold train at ${train.currentLocation} for ${Math.ceil(train.delay / 2)} minutes to optimize traffic flow`
                    : `Maintain current schedule and proceed to next section at optimal speed`
                  }
                </p>
                <button
                  onClick={handleAcceptRecommendation}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  ✓ Accept AI Recommendation
                </button>
              </div>

              {/* Manual Override */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h5 className="text-white font-medium mb-3">Manual Override</h5>
                <textarea
                  value={overrideCommand}
                  onChange={(e) => setOverrideCommand(e.target.value)}
                  placeholder="Enter override command (e.g., 'Hold at platform for 5 minutes', 'Reroute to Platform 3', 'Increase speed to 45 km/h')"
                  className="w-full bg-gray-600 text-white p-3 rounded border border-gray-500 text-sm mb-3"
                  rows={3}
                />
                <button
                  onClick={handleOverride}
                  disabled={!overrideCommand.trim()}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
                >
                  🔧 Apply Override Command
                </button>
              </div>

              {/* What-If Simulation */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h5 className="text-white font-medium mb-3">Scenario Simulation</h5>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    onClick={() => setSelectedAction('delay_5min')}
                    className={`p-3 rounded text-sm transition-colors ${
                      selectedAction === 'delay_5min' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    Delay 5 minutes
                  </button>
                  <button
                    onClick={() => setSelectedAction('reroute_pf3')}
                    className={`p-3 rounded text-sm transition-colors ${
                      selectedAction === 'reroute_pf3' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    Reroute to PF3
                  </button>
                  <button
                    onClick={() => setSelectedAction('priority_boost')}
                    className={`p-3 rounded text-sm transition-colors ${
                      selectedAction === 'priority_boost' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    Priority Boost
                  </button>
                  <button
                    onClick={() => setSelectedAction('speed_increase')}
                    className={`p-3 rounded text-sm transition-colors ${
                      selectedAction === 'speed_increase' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    Increase Speed
                  </button>
                </div>
                <button
                  onClick={handleSimulateWhatIf}
                  disabled={!selectedAction}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
                >
                  📊 Simulate Impact
                </button>
              </div>
            </div>
          </div>

          {/* Simulation Results */}
          {showSimulation && selectedAction && (
            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-white font-semibold mb-4">Simulation Results</h4>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">+2.3%</div>
                    <div className="text-sm text-gray-400">Throughput</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">-1.2min</div>
                    <div className="text-sm text-gray-400">Avg Delay</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">94.2%</div>
                    <div className="text-sm text-gray-400">Efficiency</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-900 bg-opacity-30 border border-green-600 rounded">
                  <p className="text-green-400 text-sm">
                    ✓ Recommended action will improve overall system performance
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}