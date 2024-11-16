import React, { useState } from 'react';
import { Heart, BarChart3, Activity, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import WorkoutCard from './components/WorkoutCard';
import GoalsManager from './components/GoalsManager';
import NutritionTracker from './components/NutritionTracker';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'nutrition', label: 'Nutrition', icon: Activity },
    { id: 'sleep', label: 'Sleep', icon: Moon }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between py-4 md:h-16 md:py-0">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4 md:mb-0">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              </motion.div>
              <span className="text-xl font-bold">HealthMate AI</span>
            </div>
            <div className="flex items-center justify-center md:justify-end space-x-2 md:space-x-4 overflow-x-auto pb-2 md:pb-0">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 md:px-4 py-2 rounded-lg whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'activity' && <GoalsManager />}
            {activeTab === 'nutrition' && <NutritionTracker />}
            {activeTab === 'sleep' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Sleep Analytics</h2>
                <p className="text-gray-600">Coming soon...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
