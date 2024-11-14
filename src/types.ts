export interface WorkoutPlan {
  id: string;
  name: string;
  duration: number;
  calories: number;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  duration?: number;
}

export interface DailyStats {
  steps: number;
  calories: number;
  water: number;
  sleep: number;
}

export interface NutritionLog {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  category: 'fitness' | 'nutrition' | 'sleep' | 'water';
  history: { date: string; value: number }[];
}