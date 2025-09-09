import React from 'react';
import { X, Clock, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

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
    occupancy: 89
  }
};

export function TrainModal({ trainId, onClose }: TrainModalProps) {
  const train = trainDetails[trainId as keyof typeof trainDetails] || trainDetails['12951'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg border border-gray-700 w-96 max-w-90vw">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-white">Train Details</h3>
            <p className="text-orange-400 font-mono font-bold">{train.number}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-white font-semibold">{train.name}</h4>
            <p className="text-gray-400 text-sm">{train.route}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Current Location</span>
              </div>
              <p className="text-white font-medium ml-6">{train.currentLocation}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Schedule</span>
              </div>
              <div className="ml-6 text-sm">
                <p className="text-white">ETA: {train.eta}</p>
                <p className="text-white">ETD: {train.etd}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2">
              {train.delay === 0 ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              )}
              <span className="text-white">
                {train.delay === 0 ? 'On Time' : `Delayed by ${train.delay} minutes`}
              </span>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              train.priority === 'High' ? 'bg-red-900 text-red-200' : 'bg-gray-600 text-gray-200'
            }`}>
              {train.priority} Priority
            </span>
          </div>

          {/* AI Decision Options */}
          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-white font-semibold mb-3">AI Decision Options</h4>
            <div className="space-y-2">
              <button className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-left">
                <div className="font-medium">Accept AI Recommendation</div>
                <div className="text-sm opacity-90">Hold at Platform 1 for priority passage</div>
              </button>
              <button className="w-full p-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors text-left">
                <div className="font-medium">Override Decision</div>
                <div className="text-sm opacity-90">Manual control with custom timing</div>
              </button>
              <button className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-left">
                <div className="font-medium">Simulate What-If</div>
                <div className="text-sm opacity-90">Compare different routing scenarios</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}