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
      { name: 'Dumbbell Rows', sets: 3, reps: 12 },
      { name: 'Plank', sets: 3, reps: 60 } // seconds
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
      { name: 'Jump Squats', sets: 4, reps: 15 },
      { name: 'High Knees', sets: 4, reps: 30 } // seconds
    ]
  },
  {
    id: '3',
    name: 'Upper Body Blast',
    duration: 40,
    calories: 350,
    exercises: [
      { name: 'Bench Press', sets: 3, reps: 10 },
      { name: 'Bicep Curls', sets: 3, reps: 12 },
      { name: 'Tricep Dips', sets: 3, reps: 15 },
      { name: 'Shoulder Press', sets: 3, reps: 10 }
    ]
  },
  {
    id: '4',
    name: 'Lower Body Power',
    duration: 50,
    calories: 450,
    exercises: [
      { name: 'Deadlifts', sets: 4, reps: 10 },
      { name: 'Lunges', sets: 3, reps: 12 },
      { name: 'Leg Press', sets: 4, reps: 10 },
      { name: 'Calf Raises', sets: 4, reps: 15 }
    ]
  },
  {
    id: '5',
    name: 'Core and Abs',
    duration: 20,
    calories: 200,
    exercises: [
      { name: 'Crunches', sets: 3, reps: 20 },
      { name: 'Russian Twists', sets: 3, reps: 20 },
      { name: 'Leg Raises', sets: 3, reps: 15 },
      { name: 'Bicycle Kicks', sets: 3, reps: 30 } // seconds
    ]
  },
  {
    id: '6',
    name: 'Flexibility and Mobility',
    duration: 25,
    calories: 150,
    exercises: [
      { name: 'Forward Fold', sets: 2, reps: 60 }, // seconds
      { name: 'Lunging Hip Flexor Stretch', sets: 2, reps: 60 },
      { name: 'Cat-Cow Stretch', sets: 3, reps: 30 }, // seconds
      { name: 'Child’s Pose', sets: 2, reps: 60 } // seconds
    ]
  },
  {
    id: '7',
    name: 'Endurance Circuit',
    duration: 35,
    calories: 320,
    exercises: [
      { name: 'Jump Rope', sets: 3, reps: 60 }, // seconds
      { name: 'Box Jumps', sets: 3, reps: 15 },
      { name: 'Kettlebell Swings', sets: 3, reps: 20 },
      { name: 'Battle Ropes', sets: 3, reps: 30 } // seconds
    ]
  },
  {
    id: '8',
    name: 'Leg Day Extreme',
    duration: 55,
    calories: 500,
    exercises: [
      { name: 'Squats', sets: 4, reps: 15 },
      { name: 'Bulgarian Split Squats', sets: 3, reps: 12 },
      { name: 'Hamstring Curls', sets: 3, reps: 15 },
      { name: 'Leg Extensions', sets: 3, reps: 12 }
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
