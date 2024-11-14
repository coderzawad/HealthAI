import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Goal } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GoalProgressProps {
  goal: Goal;
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goal }) => {
  // Memoize data to prevent recalculation on each render
  const data = useMemo(() => ({
    labels: goal.history.map(h => new Date(h.date).toLocaleDateString()),
    datasets: [
      {
        label: goal.name,
        data: goal.history.map(h => h.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4
      }
    ]
  }), [goal]);

  // Memoize options for performance
  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `${goal.name} Progress`
      }
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(goal.target, ...goal.history.map(h => h.value)) * 1.2
      }
    }
  }), [goal]);

  // Show message if no history data is available
  if (!goal.history.length) {
    return <p className="text-gray-500">No progress data available for this goal.</p>;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default GoalProgress;

