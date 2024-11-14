import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Activity, Droplet, Moon } from 'lucide-react';
import { DailyStats } from '../types';

const Dashboard: React.FC = () => {
  const stats: DailyStats = {
    steps: 8432,
    calories: 1850,
    water: 6,
    sleep: 7.5
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6"
    >
      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Activity className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold">Steps</h3>
        </div>
        <div className="w-32 h-32 mx-auto">
          <CircularProgressbar
            value={(stats.steps / 10000) * 100}
            text={`${stats.steps}`}
            styles={buildStyles({
              pathColor: '#3B82F6',
              textColor: '#1F2937',
              trailColor: '#E5E7EB'
            })}
          />
        </div>
        <p className="text-center mt-4 text-gray-600">Goal: 10,000</p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Droplet className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold">Water</h3>
        </div>
        <div className="w-32 h-32 mx-auto">
          <CircularProgressbar
            value={(stats.water / 8) * 100}
            text={`${stats.water}L`}
            styles={buildStyles({
              pathColor: '#60A5FA',
              textColor: '#1F2937',
              trailColor: '#E5E7EB'
            })}
          />
        </div>
        <p className="text-center mt-4 text-gray-600">Goal: 8L</p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Moon className="w-6 h-6 text-indigo-500" />
          <h3 className="text-lg font-semibold">Sleep</h3>
        </div>
        <div className="w-32 h-32 mx-auto">
          <CircularProgressbar
            value={(stats.sleep / 8) * 100}
            text={`${stats.sleep}h`}
            styles={buildStyles({
              pathColor: '#6366F1',
              textColor: '#1F2937',
              trailColor: '#E5E7EB'
            })}
          />
        </div>
        <p className="text-center mt-4 text-gray-600">Goal: 8h</p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Activity className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold">Calories</h3>
        </div>
        <div className="w-32 h-32 mx-auto">
          <CircularProgressbar
            value={(stats.calories / 2000) * 100}
            text={`${stats.calories}`}
            styles={buildStyles({
              pathColor: '#10B981',
              textColor: '#1F2937',
              trailColor: '#E5E7EB'
            })}
          />
        </div>
        <p className="text-center mt-4 text-gray-600">Goal: 2000</p>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;