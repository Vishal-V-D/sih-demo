import React, { useState } from 'react';
import { Bot, AlertCircle, CheckCircle, Clock, ArrowRight, Settings, Zap } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    type: 'priority',
    title: 'Priority Conflict Resolution',
    description: 'Hold Train 12627 at Platform 2 for 3 minutes to allow Rajdhani 12951 priority passage through Section A',
    impact: 'Prevents 12-minute cascade delay across 4 trains',
    urgency: 'high',
    status: 'pending',
    affectedTrains: ['12627', '12951'],
    estimatedTime: '2 minutes',
    command: 'HOLD 12627 PF2 3MIN; CLEAR 12951 SECT_A'
  },
  {
    id: 2,
    type: 'routing',
    title: 'Optimal Route Suggestion',
    description: 'Reroute Train 12001 from Platform 5 to Platform 3 via Junction J3 to optimize track utilization',
    impact: 'Improves section throughput by 18% and reduces congestion',
    urgency: 'medium',
    status: 'accepted',
    affectedTrains: ['12001'],
    estimatedTime: '5 minutes',
    command: 'REROUTE 12001 PF5->PF3 VIA_J3'
  },
  {
    id: 3,
    type: 'maintenance',
    title: 'Track Maintenance Window',
    description: 'Schedule maintenance on Section F during 02:00-04:00 low traffic period with automatic rerouting',
    impact: 'Zero operational impact with 99.2% efficiency maintained',
    urgency: 'low',
    status: 'scheduled',
    affectedTrains: [],
    estimatedTime: '120 minutes',
    command: 'MAINT_WINDOW SECT_F 02:00-04:00 AUTO_REROUTE'
  },
  {
    id: 4,
    type: 'speed',
    title: 'Speed Optimization',
    description: 'Increase Train 12019 speed to 3.5 km/h and adjust signals S3A, S3B for smooth passage',
    impact: 'Reduces journey time by 4 minutes, maintains punctuality',
    urgency: 'medium',
    status: 'pending',
    affectedTrains: ['12019'],
    estimatedTime: '1 minute',
    command: 'SPEED 12019 3.5KMH; SIGNAL S3A GREEN; SIGNAL S3B GREEN'
  }
];

export function AISidebar() {
  const [expandedRec, setExpandedRec] = useState<number | null>(null);
  const [overrideMode, setOverrideMode] = useState<number | null>(null);
  const [overrideText, setOverrideText] = useState('');

  const handleAcceptRecommendation = (recId: number) => {
    const rec = recommendations.find(r => r.id === recId);
    if (rec) {
      console.log('Executing AI command:', rec.command);
      // In real implementation, this would execute the command
      rec.status = 'accepted';
      setExpandedRec(null);
    }
  };

  const handleOverrideRecommendation = (recId: number) => {
    if (overrideText.trim()) {
      console.log('Override command:', overrideText, 'for recommendation:', recId);
      // In real implementation, this would execute the override
      setOverrideMode(null);
      setOverrideText('');
    }
  };

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          <Bot className="w-6 h-6 text-blue-400" />
          <h2 className="text-lg font-bold text-white">AI Control Center</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400">Active & Learning</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Processing 47 trains • 8 sections • 16 signals
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-md font-semibold text-white mb-3 flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>Smart Recommendations</span>
        </h3>
        
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="mb-4 bg-gray-700 rounded-lg border border-gray-600 overflow-hidden"
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  rec.urgency === 'high' ? 'bg-red-400 animate-pulse' :
                  rec.urgency === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                }`}></div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rec.status === 'pending' ? 'bg-orange-900 text-orange-200' :
                  rec.status === 'accepted' ? 'bg-green-900 text-green-200' :
                  'bg-blue-900 text-blue-200'
                }`}>
                  {rec.status.toUpperCase()}
                </span>
              </div>
              
              <h4 className="text-sm font-medium text-white mb-1">
                {rec.title}
              </h4>
              
              <p className="text-xs text-gray-300 mb-2">
                {rec.description}
              </p>
              
              <div className="text-xs text-green-400 mb-2">
                Impact: {rec.impact}
              </div>

              {rec.affectedTrains.length > 0 && (
                <div className="text-xs text-blue-400 mb-2">
                  Trains: {rec.affectedTrains.join(', ')}
                </div>
              )}

              <div className="text-xs text-gray-500 mb-3">
                Est. Time: {rec.estimatedTime}
              </div>
              
              {rec.status === 'pending' && (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleAcceptRecommendation(rec.id)}
                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors font-medium"
                    >
                      ✓ Accept & Apply
                    </button>
                    <button 
                      onClick={() => setOverrideMode(overrideMode === rec.id ? null : rec.id)}
                      className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded transition-colors font-medium"
                    >
                      🔧 Override
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setExpandedRec(expandedRec === rec.id ? null : rec.id)}
                    className="w-full px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors"
                  >
                    {expandedRec === rec.id ? 'Hide Details' : 'Show Command'}
                  </button>
                </div>
              )}
            </div>

            {/* Expanded Details */}
            {expandedRec === rec.id && (
              <div className="px-3 pb-3 border-t border-gray-600">
                <div className="mt-2 p-2 bg-gray-800 rounded text-xs">
                  <div className="text-gray-400 mb-1">AI Command:</div>
                  <code className="text-green-400 font-mono">{rec.command}</code>
                </div>
              </div>
            )}

            {/* Override Panel */}
            {overrideMode === rec.id && (
              <div className="px-3 pb-3 border-t border-gray-600">
                <div className="mt-2 space-y-2">
                  <textarea
                    value={overrideText}
                    onChange={(e) => setOverrideText(e.target.value)}
                    placeholder="Enter custom command or modification..."
                    className="w-full bg-gray-800 text-white p-2 rounded border border-gray-600 text-xs"
                    rows={2}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOverrideRecommendation(rec.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs transition-colors"
                    >
                      Apply Override
                    </button>
                    <button
                      onClick={() => {
                        setOverrideMode(null);
                        setOverrideText('');
                      }}
                      className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-1 px-2 rounded text-xs transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* System Performance */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-blue-600">
          <h4 className="text-sm font-medium text-blue-400 mb-3 flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>System Performance</span>
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Prediction Accuracy</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-600 rounded-full h-1">
                  <div className="bg-green-400 h-1 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <span className="text-green-400 font-medium">94.2%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Delay Prevention</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-600 rounded-full h-1">
                  <div className="bg-green-400 h-1 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <span className="text-green-400 font-medium">87.1%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Throughput Improvement</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-600 rounded-full h-1">
                  <div className="bg-blue-400 h-1 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-blue-400 font-medium">+15.3%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Signal Optimization</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-600 rounded-full h-1">
                  <div className="bg-yellow-400 h-1 rounded-full" style={{ width: '91%' }}></div>
                </div>
                <span className="text-yellow-400 font-medium">91.7%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 p-3 bg-gray-700 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-2">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-2 rounded transition-colors">
              Emergency Stop
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-2 rounded transition-colors">
              All Signals Hold
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-2 rounded transition-colors">
              Auto Optimize
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded transition-colors">
              Reset System
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}