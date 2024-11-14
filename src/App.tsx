import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Apple, Moon, BarChart3, Target } from 'lucide-react';
import Dashboard from './components/Dashboard';
import WorkoutCard from './components/WorkoutCard';
import GoalsManager from './components/GoalsManager';
import { WorkoutPlan } from './types';

const sampleWorkouts: WorkoutPlan[] = [
  {
    id: '1',
    name: 'Full Body Strength',
    duration: 45,
    calories: 400,
    exercises: [
      { name: 'Push-ups', sets: 3, reps: 12 },
      { name: 'Squats', sets: 3, reps: 15 },
      { name: 'Dumbbell Rows', sets: 3, reps: 12 }
    ]
  },
  {
    id: '2',
    name: 'HIIT Cardio',
    duration: 30,
    calories: 300,
    exercises: [
      { name: 'Burpees', sets: 4, reps: 10 },
      { name: 'Mountain Climbers', sets: 4, reps: 20 },
      { name: 'Jump Squats', sets: 4, reps: 15 }
    ]
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'workouts', icon: Dumbbell, label: 'Workouts' },
    { id: 'nutrition', icon: Apple, label: 'Nutrition' },
    { id: 'sleep', icon: Moon, label: 'Sleep' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Dumbbell className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">FitAI</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'goals' && <GoalsManager />}
            {activeTab === 'workouts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleWorkouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onClick={() => console.log('Workout clicked:', workout.name)}
                  />
                ))}
              </div>
            )}
            {activeTab === 'nutrition' && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Nutrition Tracking</h2>
                <p className="text-gray-600">Coming soon...</p>
              </div>
            )}
            {activeTab === 'sleep' && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Sleep Analytics</h2>
                <p className="text-gray-600">Coming soon...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;