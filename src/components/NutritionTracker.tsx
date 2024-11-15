import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Apple, Coffee, Pizza } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    time: string;
  }[];
}

const defaultNutrition: NutritionData = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  meals: []
};

const NutritionTracker: React.FC = () => {
  const [nutritionData, setNutritionData] = useLocalStorage<NutritionData>('nutrition-data', defaultNutrition);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const targets = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  };

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    const meal = {
      ...newMeal,
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString()
    };

    setNutritionData(prev => ({
      calories: prev.calories + meal.calories,
      protein: prev.protein + meal.protein,
      carbs: prev.carbs + meal.carbs,
      fat: prev.fat + meal.fat,
      meals: [...prev.meals, meal]
    }));

    setNewMeal({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 });
    setShowAddMeal(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Macro Progress Cards */}
        {Object.entries({
          calories: { icon: Coffee, color: 'text-blue-500' },
          protein: { icon: Apple, color: 'text-green-500' },
          carbs: { icon: Pizza, color: 'text-orange-500' },
          fat: { icon: Coffee, color: 'text-purple-500' }
        }).map(([macro, { icon: Icon, color }]) => (
          <div key={macro} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold capitalize">{macro}</h3>
                <p className="text-gray-500">
                  {nutritionData[macro as keyof NutritionData]}g /{' '}
                  {targets[macro as keyof typeof targets]}g
                </p>
              </div>
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={(nutritionData[macro as keyof NutritionData] / targets[macro as keyof typeof targets]) * 100}
                  strokeWidth={10}
                  styles={buildStyles({
                    pathColor: color.replace('text-', 'rgb('),
                    trailColor: '#f3f4f6'
                  })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Meal List */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Today's Meals</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddMeal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <Plus className="w-5 h-5" />
            Add Meal
          </motion.button>
        </div>

        <div className="space-y-4">
          {nutritionData.meals.map(meal => (
            <div
              key={meal.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium">{meal.name}</h3>
                <p className="text-sm text-gray-500">{meal.time}</p>
              </div>
              <div className="flex gap-4 text-sm">
                <span>{meal.calories} cal</span>
                <span>{meal.protein}g protein</span>
                <span>{meal.carbs}g carbs</span>
                <span>{meal.fat}g fat</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Add Meal</h2>
            <form onSubmit={handleAddMeal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Name
                </label>
                <input
                  type="text"
                  value={newMeal.name}
                  onChange={e => setNewMeal({ ...newMeal, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              {['calories', 'protein', 'carbs', 'fat'].map(macro => (
                <div key={macro}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {macro}
                  </label>
                  <input
                    type="number"
                    value={newMeal[macro as keyof typeof newMeal]}
                    onChange={e => setNewMeal({ ...newMeal, [macro]: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                    min="0"
                  />
                </div>
              ))}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMeal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NutritionTracker;
