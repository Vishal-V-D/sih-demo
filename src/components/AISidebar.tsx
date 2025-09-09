import React from 'react';
import { Bot, AlertCircle, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    type: 'priority',
    title: 'Priority Conflict Resolution',
    description: 'Hold Train 12627 at Platform 3 for 2 minutes to allow Rajdhani 12951 priority passage',
    impact: 'Prevents 8-minute cascade delay',
    urgency: 'high',
    status: 'pending'
  },
  {
    id: 2,
    type: 'routing',
    title: 'Optimal Route Suggestion',
    description: 'Reroute Train 12001 from Platform 2 to Platform 4 via Junction B',
    impact: 'Improves throughput by 12%',
    urgency: 'medium',
    status: 'accepted'
  },
  {
    id: 3,
    type: 'maintenance',
    title: 'Track Maintenance Window',
    description: 'Schedule maintenance on Track 3 during 02:00-04:00 low traffic period',
    impact: 'Zero operational impact',
    urgency: 'low',
    status: 'scheduled'
  }
];

export function AISidebar() {
  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          <Bot className="w-6 h-6 text-blue-400" />
          <h2 className="text-lg font-bold text-white">AI Assistant</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400">Active & Learning</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-md font-semibold text-white mb-3">Recommendations</h3>
        
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="mb-4 p-3 bg-gray-700 rounded-lg border border-gray-600"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-2 h-2 rounded-full ${
                rec.urgency === 'high' ? 'bg-red-400' :
                rec.urgency === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
              }`}></div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                rec.status === 'pending' ? 'bg-orange-900 text-orange-200' :
                rec.status === 'accepted' ? 'bg-green-900 text-green-200' :
                'bg-blue-900 text-blue-200'
              }`}>
                {rec.status}
              </span>
            </div>
            
            <h4 className="text-sm font-medium text-white mb-1">
              {rec.title}
            </h4>
            
            <p className="text-xs text-gray-300 mb-2">
              {rec.description}
            </p>
            
            <div className="text-xs text-green-400 mb-3">
              Impact: {rec.impact}
            </div>
            
            {rec.status === 'pending' && (
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors">
                  Accept
                </button>
                <button className="flex-1 px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors">
                  Override
                </button>
              </div>
            )}
          </div>
        ))}
        
        <div className="mt-6 p-3 bg-gray-700 rounded-lg border border-blue-600">
          <h4 className="text-sm font-medium text-blue-400 mb-2">
            System Performance
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Prediction Accuracy</span>
              <span className="text-green-400">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Delay Prevention</span>
              <span className="text-green-400">87.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Throughput Improvement</span>
              <span className="text-green-400">+15.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}