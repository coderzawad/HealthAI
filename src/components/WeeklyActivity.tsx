import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WeeklyActivity: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('Steps');

  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: selectedMetric,
        data: [8000, 10000, 7500, 9000, 8500, 11000, 8439],
        borderColor: 'rgb(79, 70, 229)',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Weekly Activity</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
          >
            <option>Steps</option>
            <option>Active Minutes</option>
            <option>Calories</option>
            <option>Sleep</option>
          </select>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeeklyActivity;
