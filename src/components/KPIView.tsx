import React from 'react';
import { TrendingUp, TrendingDown, Clock, Train, AlertTriangle, CheckCircle } from 'lucide-react';

export function KPIView() {
  const kpis = [
    { 
      title: 'Throughput', 
      value: '47', 
      unit: 'trains/hour', 
      change: '+12.3%', 
      trend: 'up', 
      icon: Train,
      description: 'Average trains processed per hour'
    },
    { 
      title: 'Average Delay', 
      value: '8.2', 
      unit: 'minutes', 
      change: '-5.7%', 
      trend: 'down', 
      icon: Clock,
      description: 'Mean delay across all trains'
    },
    { 
      title: 'Punctuality Rate', 
      value: '87.4', 
      unit: '%', 
      change: '+3.1%', 
      trend: 'up', 
      icon: CheckCircle,
      description: 'Trains arriving within 5 minutes of schedule'
    },
    { 
      title: 'Track Utilization', 
      value: '73.6', 
      unit: '%', 
      change: '+8.9%', 
      trend: 'up', 
      icon: TrendingUp,
      description: 'Average track capacity utilization'
    },
  ];

  const alerts = [
    { type: 'warning', message: 'Platform 2 approaching capacity limit', time: '2m ago' },
    { type: 'info', message: 'Track maintenance scheduled for 02:00-04:00', time: '15m ago' },
    { type: 'success', message: 'AI prevented potential 12-minute delay', time: '23m ago' },
  ];

  return (
    <div className="h-full bg-gray-900 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Key Performance Indicators</h2>
        <p className="text-gray-400">Real-time railway operations metrics and analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-orange-400" />
                <div className={`flex items-center space-x-1 ${
                  kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{kpi.change}</span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="text-3xl font-bold text-white">{kpi.value}</div>
                <div className="text-sm text-gray-400">{kpi.unit}</div>
              </div>
              
              <div className="text-sm text-gray-300 font-medium mb-1">{kpi.title}</div>
              <div className="text-xs text-gray-500">{kpi.description}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Throughput Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Hourly Throughput</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {[42, 38, 45, 52, 47, 49, 44, 51, 48, 46, 50, 47].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-orange-500 rounded-t"
                  style={{ height: `${(value / 60) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">
                  {(index + 1).toString().padStart(2, '0')}:00
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delay Distribution */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Delay Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">On Time (0-5 min)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '74%' }}></div>
                </div>
                <span className="text-sm text-white font-medium">74%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Moderate (6-15 min)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
                <span className="text-sm text-white font-medium">18%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">High (16+ min)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                </div>
                <span className="text-sm text-white font-medium">8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-bold text-white">Recent Alerts & Events</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'warning' ? 'bg-yellow-400' :
                  alert.type === 'info' ? 'bg-blue-400' : 'bg-green-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{alert.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                </div>
                <AlertTriangle className={`w-4 h-4 ${
                  alert.type === 'warning' ? 'text-yellow-400' :
                  alert.type === 'info' ? 'text-blue-400' : 'text-green-400'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}