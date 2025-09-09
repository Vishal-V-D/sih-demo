import React from 'react';
import { Train, Clock, BarChart3, MessageSquare } from 'lucide-react';

type ActiveTab = 'simulation' | 'schedules' | 'kpis' | 'communication';

interface NavigationBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export function NavigationBar({ activeTab, setActiveTab }: NavigationBarProps) {
  const tabs = [
    { id: 'simulation' as const, label: 'Simulation', icon: Train },
    { id: 'schedules' as const, label: 'Schedules', icon: Clock },
    { id: 'kpis' as const, label: 'KPIs', icon: BarChart3 },
    { id: 'communication' as const, label: 'Communication', icon: MessageSquare },
  ];

  return (
    <nav className="bg-gray-800 border-b border-gray-700 h-60px">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-3">
          <Train className="w-8 h-8 text-orange-500" />
          <div>
            <h1 className="text-xl font-bold text-white">Railway Control Center</h1>
            <p className="text-sm text-gray-400">AI-Powered Traffic Management System</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-400">New Delhi Junction</div>
          <div className="text-lg font-mono text-green-400">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </nav>
  );
}