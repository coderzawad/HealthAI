import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, subDays, addDays } from 'date-fns';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Goal } from '../types';

const WeeklyActivity: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('Steps');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [goals] = useLocalStorage<Goal[]>('fitness-goals', []);

  const metrics = {
    'Steps': { goal: 'Daily Steps', color: 'rgb(59, 130, 246)' },
    'Active Minutes': { goal: 'Active Minutes', color: 'rgb(34, 197, 94)' },
    'Calories': { goal: 'Calorie Intake', color: 'rgb(249, 115, 22)' },
    'Sleep': { goal: 'Sleep Duration', color: 'rgb(147, 51, 234)' }
  };

  const getDaysArray = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(subDays(currentDate, i));
    }
    return days;
  };

  const getGoalData = (goalName: string) => {
    const goal = goals.find(g => g.name === metrics[goalName as keyof typeof metrics].goal);
    if (!goal) return Array(7).fill(0);

    const days = getDaysArray();
    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const historyEntry = goal.history.find(h => h.date === dateStr);
      return historyEntry ? historyEntry.value : 0;
    });
  };

  const chartData = useMemo(() => {
    const days = getDaysArray();
    const values = getGoalData(selectedMetric);

    return {
      labels: days.map(day => format(day, 'EEE')),
      datasets: [
        {
          label: selectedMetric,
          data: values,
          borderColor: metrics[selectedMetric as keyof typeof metrics].color,
          backgroundColor: `${metrics[selectedMetric as keyof typeof metrics].color}20`,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: metrics[selectedMetric as keyof typeof metrics].color,
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    };
  }, [selectedMetric, currentDate, goals]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const unit = selectedMetric === 'Steps' ? ' steps'
              : selectedMetric === 'Active Minutes' ? ' mins'
              : selectedMetric === 'Calories' ? ' kcal'
              : ' hours';
            return `${value}${unit}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };

  const handlePrevWeek = () => {
    setCurrentDate(prev => subDays(prev, 7));
  };

  const handleNextWeek = () => {
    const nextDate = addDays(currentDate, 7);
    if (nextDate <= new Date()) {
      setCurrentDate(nextDate);
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
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Object.keys(metrics).map(metric => (
              <option key={metric} value={metric}>{metric}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button 
              onClick={handlePrevWeek}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNextWeek}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={addDays(currentDate, 7) > new Date()}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeeklyActivity;
