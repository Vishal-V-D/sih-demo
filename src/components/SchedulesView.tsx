import React, { useState } from 'react';
import { Search, Filter, Clock, MapPin } from 'lucide-react';

const scheduleData = [
  { trainNo: '12951', name: 'Mumbai Rajdhani', from: 'BCT', to: 'NDLS', platform: 'PF 1', arrival: '14:30', departure: '14:35', delay: 0, status: 'On Time' },
  { trainNo: '12627', name: 'Karnataka Express', from: 'NDLS', to: 'KCG', platform: 'PF 2', arrival: '15:10', departure: '15:25', delay: 15, status: 'Delayed' },
  { trainNo: '12019', name: 'Shatabdi Express', from: 'BDTS', to: 'DLI', platform: 'PF 3', arrival: '16:45', departure: '16:50', delay: 0, status: 'On Time' },
  { trainNo: '12423', name: 'Rajdhani Express', from: 'NDLS', to: 'ADI', platform: 'PF 4', arrival: '17:20', departure: '17:30', delay: 8, status: 'Delayed' },
  { trainNo: '12001', name: 'Shatabdi Express', from: 'NDLS', to: 'LKO', platform: 'PF 5', arrival: '18:05', departure: '18:10', delay: 0, status: 'On Time' },
  { trainNo: '12311', name: 'Kalka Mail', from: 'HWH', to: 'NDLS', platform: 'PF 2', arrival: '19:30', departure: '19:45', delay: 22, status: 'Delayed' },
  { trainNo: '12002', name: 'Shatabdi Express', from: 'LKO', to: 'NDLS', platform: 'PF 3', arrival: '20:15', departure: '20:20', delay: 5, status: 'Delayed' },
  { trainNo: '12952', name: 'Mumbai Rajdhani', from: 'NDLS', to: 'BCT', platform: 'PF 1', arrival: '21:00', departure: '21:10', delay: 0, status: 'On Time' },
];

export function SchedulesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSchedules = scheduleData.filter(train => {
    const matchesSearch = train.trainNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         train.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         train.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         train.to.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'ontime' && train.delay === 0) ||
                         (filterStatus === 'delayed' && train.delay > 0);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full bg-gray-900 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Train Schedules</h2>
        
        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search trains, stations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-orange-500"
            >
              <option value="all">All Trains</option>
              <option value="ontime">On Time</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-bold text-white">{scheduleData.length}</div>
            <div className="text-sm text-gray-400">Total Trains</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-bold text-green-400">
              {scheduleData.filter(t => t.delay === 0).length}
            </div>
            <div className="text-sm text-gray-400">On Time</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-bold text-yellow-400">
              {scheduleData.filter(t => t.delay > 0).length}
            </div>
            <div className="text-sm text-gray-400">Delayed</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">
              {Math.round(scheduleData.reduce((acc, t) => acc + t.delay, 0) / scheduleData.length)}m
            </div>
            <div className="text-sm text-gray-400">Avg Delay</div>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Train</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Route</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Platform</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Arrival</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Departure</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredSchedules.map((train, index) => (
                <tr key={train.trainNo} className="hover:bg-gray-750 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-mono text-orange-400 font-bold">{train.trainNo}</div>
                      <div className="text-sm text-gray-300">{train.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{train.from}</span>
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-white">{train.to}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-gray-600 text-gray-200 rounded text-sm font-medium">
                      {train.platform}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-white font-mono">{train.arrival}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-white font-mono">{train.departure}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        train.delay === 0 
                          ? 'bg-green-900 text-green-200' 
                          : 'bg-red-900 text-red-200'
                      }`}>
                        {train.delay === 0 ? 'On Time' : `+${train.delay}m`}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}