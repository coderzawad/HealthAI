import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Goal } from '../types';
import GoalCard from './GoalCard';
import GoalProgress from './GoalProgress';
import { useLocalStorage } from '../hooks/useLocalStorage';

const defaultGoals: Goal[] = [
  {
    id: '1',
    name: 'Daily Steps',
    target: 10000,
    current: 8432,
    unit: 'steps',
    category: 'fitness',
    history: [
      { date: '2024-03-01', value: 8000 },
      { date: '2024-03-02', value: 9200 },
      { date: '2024-03-03', value: 8432 }
    ]
  },
  {
    id: '2',
    name: 'Water Intake',
    target: 8,
    current: 6,
    unit: 'L',
    category: 'water',
    history: [
      { date: '2024-03-01', value: 5 },
      { date: '2024-03-02', value: 7 },
      { date: '2024-03-03', value: 6 }
    ]
  },
  {
    id: '3',
    name: 'Sleep Duration',
    target: 8,
    current: 7.5,
    unit: 'hours',
    category: 'sleep',
    history: [
      { date: '2024-03-01', value: 7 },
      { date: '2024-03-02', value: 8 },
      { date: '2024-03-03', value: 7.5 }
    ]
  },
  {
    id: '4',
    name: 'Calorie Intake',
    target: 2000,
    current: 1850,
    unit: 'kcal',
    category: 'nutrition',
    history: [
      { date: '2024-03-01', value: 1900 },
      { date: '2024-03-02', value: 1800 },
      { date: '2024-03-03', value: 1850 }
    ]
  },
  {
    id: '5',
    name: 'Protein Intake',
    target: 120,
    current: 90,
    unit: 'g',
    category: 'nutrition',
    history: [
      { date: '2024-03-01', value: 85 },
      { date: '2024-03-02', value: 95 },
      { date: '2024-03-03', value: 90 }
    ]
  }
];

const GoalsManager: React.FC = () => {
  const [goals, setGoals] = useLocalStorage<Goal[]>('fitness-goals', defaultGoals);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(goals[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Goals' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'sleep', label: 'Sleep' },
    { id: 'water', label: 'Water' }
  ];

  const filteredGoals = goals.filter(goal => 
    selectedCategory === 'all' || goal.category === selectedCategory
  );

  const handleUpdateGoal = (id: string, newValue: number) => {
    setGoals(prevGoals => {
      return prevGoals.map(goal => {
        if (goal.id === id) {
          const today = new Date().toISOString().split('T')[0];
          return {
            ...goal,
            current: newValue,
            history: [...goal.history, { date: today, value: newValue }]
          };
        }
        return goal;
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Goals</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Goal
        </motion.button>
      </div>

      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onUpdate={handleUpdateGoal}
          />
        ))}
      </div>

      <div className="mt-8">
        <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
          {goals.map(goal => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedGoal?.id === goal.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {goal.name}
            </button>
          ))}
        </div>
        {selectedGoal && <GoalProgress goal={selectedGoal} />}
      </div>
    </div>
  );
};

export default GoalsManager;