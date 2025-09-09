import React, { useState } from 'react';
import { Train, Clock, BarChart3, MessageSquare, Navigation } from 'lucide-react';
import { NavigationBar } from './components/NavigationBar';
import { TrainSidebar } from './components/TrainSidebar';
import { AISidebar } from './components/AISidebar';
import { SimulationView } from './components/SimulationView';
import { SchedulesView } from './components/SchedulesView';
import { KPIView } from './components/KPIView';
import { CommunicationView } from './components/CommunicationView';

type ActiveTab = 'simulation' | 'schedules' | 'kpis' | 'communication';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulation');

  const renderMainContent = () => {
    switch (activeTab) {
      case 'simulation':
        return <SimulationView />;
      case 'schedules':
        return <SchedulesView />;
      case 'kpis':
        return <KPIView />;
      case 'communication':
        return <CommunicationView />;
      default:
        return <SimulationView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex h-[calc(100vh-60px)]">
        <TrainSidebar />
        
        <main className="flex-1 overflow-hidden">
          {renderMainContent()}
        </main>
        
        <AISidebar />
      </div>
    </div>
  );
}

export default App;