import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Goal } from '../types';

interface GoalCardProps {
  goal: Goal;
  onUpdate: (id: string, newValue: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate }) => {
  const progress = (goal.current / goal.target) * 100;

  const handleIncrement = () => {
    onUpdate(goal.id, Math.min(goal.current + 1, goal.target * 1.5));
  };

  const handleDecrement = () => {
    if (goal.current > 0) {
      onUpdate(goal.id, goal.current - 1);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(goal.id, Number(e.target.value));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{goal.name}</h3>
        <span className="text-sm text-gray-500">
          {goal.current} / {goal.target} {goal.unit}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={goal.target * 1.5}
          value={goal.current}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleDecrement}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleIncrement}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default GoalCard;
