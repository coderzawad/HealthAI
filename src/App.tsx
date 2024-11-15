import React, { useState } from 'react';
import { Heart, BarChart3, Activity, Moon } from 'lucide-react';
import Dashboard from './components/Dashboard';
import WorkoutCard from './components/WorkoutCard';
import GoalsManager from './components/GoalsManager';
import NutritionTracker from './components/NutritionTracker';
import { WorkoutPlan } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'nutrition', label: 'Nutrition', icon: Activity },
    { id: 'sleep', label: 'Sleep', icon: Moon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              <span className="text-xl font-bold">HealthMate AI</span>
            </div>
            <div className="flex items-center space-x-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'activity' && <GoalsManager />}
        {activeTab === 'nutrition' && <NutritionTracker />}
        {activeTab === 'sleep' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Sleep Analytics</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
