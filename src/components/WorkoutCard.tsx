import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame } from 'lucide-react';
import { WorkoutPlan } from '../types';

interface WorkoutCardProps {
  workout: WorkoutPlan;
  onClick: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl p-6 shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold mb-4">{workout.name}</h3>
      <div className="flex items-center gap-4 text-gray-600">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>{workout.duration} min</span>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5" />
          <span>{workout.calories} cal</span>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-medium mb-2">Exercises:</h4>
        <ul className="space-y-2">
          {workout.exercises.slice(0, 3).map((exercise, index) => (
            <li key={index} className="text-sm text-gray-600">
              {exercise.name} - {exercise.sets} × {exercise.reps}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default WorkoutCard;