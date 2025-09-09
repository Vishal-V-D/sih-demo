import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const trainsInSection = [
  { no: '12951', route: 'BCT-NDLS', name: 'Mumbai Rajdhani', delay: 0, priority: 'High', status: 'On Time' },
  { no: '12627', route: 'NDLS-KCG', name: 'Karnataka Express', delay: 15, priority: 'Medium', status: 'Delayed' },
  { no: '12019', route: 'BDTS-DLI', name: 'Shatabdi Express', delay: 0, priority: 'High', status: 'On Time' },
  { no: '12423', route: 'NDLS-ADI', name: 'Rajdhani Express', delay: 8, priority: 'High', status: 'Delayed' },
  { no: '12001', route: 'NDLS-LKO', name: 'Shatabdi Express', delay: 0, priority: 'Medium', status: 'On Time' },
  { no: '12311', route: 'HWH-NDLS', name: 'Kalka Mail', delay: 22, priority: 'Low', status: 'Delayed' },
];

export function TrainSidebar() {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white mb-2">Trains in Section</h2>
        <div className="text-sm text-gray-400">
          Active: {trainsInSection.length} trains
        </div>
      </div>
      
      <div className="p-2">
        {trainsInSection.map((train) => (
          <div
            key={train.no}
            className="mb-2 p-3 bg-gray-700 rounded-lg border border-gray-600 hover:border-orange-500 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-orange-400 font-bold">
                {train.no}
              </div>
              <div className="flex items-center space-x-1">
                {train.delay === 0 ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                )}
                <span className={`text-xs ${
                  train.delay === 0 ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {train.delay === 0 ? 'On Time' : `+${train.delay}m`}
                </span>
              </div>
            </div>
            
            <div className="text-sm text-gray-300 mb-1">
              {train.name}
            </div>
            
            <div className="text-xs text-gray-400 mb-2">
              {train.route}
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                train.priority === 'High' ? 'bg-red-900 text-red-200' :
                train.priority === 'Medium' ? 'bg-yellow-900 text-yellow-200' :
                'bg-gray-600 text-gray-200'
              }`}>
                {train.priority}
              </span>
              
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span>ETA: 14:32</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}