import React from 'react';
import { Goal } from '../types';

interface TodaysGoalsProps {
  goals: Goal[];
}

const TodaysGoals: React.FC<TodaysGoalsProps> = ({ goals }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Today's Goals</h2>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id}>
            <div className="flex justify-between text-sm mb-1">
              <span>{goal.name}</span>
              <span className="text-indigo-600">
                {goal.current}/{goal.target} {goal.unit}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysGoals;
