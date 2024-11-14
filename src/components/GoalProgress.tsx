import React from 'react';
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
  const data = {
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
  };

  const options = {
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
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default GoalProgress;