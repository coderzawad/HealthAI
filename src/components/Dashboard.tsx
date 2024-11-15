import React from 'react';
import { Activity, Clock, Flame, Moon } from 'lucide-react';
import { Goal } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import WeeklyActivity from './WeeklyActivity';
import TodaysGoals from './TodaysGoals';

const StatCard = ({ icon: Icon, label, value, unit, color }: {
  icon: any;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-semibold">
          {value}
          {unit && <span className="text-gray-500 text-lg ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [goals] = useLocalStorage<Goal[]>('fitness-goals', []);

  const getGoalByName = (name: string) => {
    return goals.find(g => g.name === name);
  };

  const stepsGoal = getGoalByName('Daily Steps');
  const activeMinutes = getGoalByName('Active Minutes');
  const calories = getGoalByName('Calorie Intake');
  const sleep = getGoalByName('Sleep Duration');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Activity}
          label="Daily Steps"
          value={stepsGoal?.current || 0}
          color="bg-blue-500"
        />
        <StatCard
          icon={Clock}
          label="Active Minutes"
          value={activeMinutes?.current || 0}
          unit="mins"
          color="bg-green-500"
        />
        <StatCard
          icon={Flame}
          label="Calories"
          value={`${calories?.current || 0} / ${calories?.target || 2200}`}
          color="bg-orange-500"
        />
        <StatCard
          icon={Moon}
          label="Sleep Score"
          value={`${Math.round((sleep?.current || 0) / (sleep?.target || 8) * 100)}%`}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyActivity />
        </div>
        <div>
          <TodaysGoals goals={goals} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
