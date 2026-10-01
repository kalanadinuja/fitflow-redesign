import type {
  Achievement,
  BodyMetrics,
  Challenge,
  Meal,
  Post,
  WorkoutPlan,
} from '../types';

export const mockUser = {
  firstName: 'Alex',
  fullName: 'Alex Johnson',
  handle: '@alex.fitflow',
};

export const dailyFlow = {
  title: 'AI Daily Flow',
  recommendation:
    'Based on your recovery, a light mobility routine is recommended today.',
  disclaimer: 'Prototype recommendation from local mock data — not a live AI model.',
};

export const homeStats = {
  kcal: '1.2k',
  steps: '8.5k',
  streak: 12,
  kcalProgress: 0.55,
  stepsProgress: 0.7,
};

export const dailyGoalPercent = 75;

export const weeklyTrend = [18, 28, 12, 42, 30, 48, 36, 52];
export const monthlyTrend = [22, 18, 30, 26, 40, 34, 44, 38, 50, 42, 48, 55];

export const aiWorkout: WorkoutPlan = {
  title: 'Upper Body Focus',
  durationMin: 45,
  reason: 'Generated based on your recent recovery metrics and goal to build strength.',
  exerciseCount: 4,
  estCal: 320,
  exercises: [
    { id: 'e1', name: 'Bench Press', setsLabel: '3 sets x 10 reps' },
    { id: 'e2', name: 'Incline Dumbbell Press', setsLabel: '3 sets x 12 reps' },
    { id: 'e3', name: 'Overhead Press', setsLabel: '4 sets x 8 reps' },
    { id: 'e4', name: 'Tricep Dips', setsLabel: '3 sets to failure' },
  ],
};

export const customWorkout: WorkoutPlan = {
  title: 'Custom Upper Push',
  durationMin: 40,
  reason: 'Your saved custom circuit. Edit sets in this prototype by starting the session.',
  exerciseCount: 3,
  estCal: 280,
  exercises: [
    { id: 'c1', name: 'Push-ups', setsLabel: '4 sets x 12 reps' },
    { id: 'c2', name: 'Dumbbell Fly', setsLabel: '3 sets x 10 reps' },
    { id: 'c3', name: 'Face Pulls', setsLabel: '3 sets x 15 reps' },
  ],
};

/** 8 weeks x 7 days; 1 = completed. Pattern inspired by the Lab 03 heatmap. */
export const streakGrid: number[] = [
  1, 1, 1, 1, 0, 0, 1,
  1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 0, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 1,
  0, 0, 0, 1, 1, 1, 1,
  0, 0, 0, 0, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1,
];

export const achievements: Achievement[] = [
  { id: 'a1', label: '12-day streak', icon: 'time' },
  { id: 'a2', label: 'First 10k steps', icon: 'star' },
  { id: 'a3', label: 'Strength PR', icon: 'trophy' },
  { id: 'a4', label: 'Power week', icon: 'flash' },
];

export const bodyMetrics: BodyMetrics = {
  weightKg: 72,
  bodyFat: 15,
  rhr: 60,
};

export const challenges: Challenge[] = [
  { id: 'ch1', title: '5K Club', subtitle: 'Private circle', icon: 'walk' },
  { id: 'ch2', title: 'Lift Lab', subtitle: 'Strength circle', icon: 'barbell' },
  { id: 'ch3', title: 'Campus Crew', subtitle: 'Friends only', icon: 'people' },
];

export const initialPosts: Post[] = [
  {
    id: 'p1',
    author: 'Alex Johnson',
    time: '2 hours ago',
    body: 'Morning mobility done. Recovery felt better than yesterday — keeping the session light.',
    media: 'image',
    likes: 12,
    liked: false,
    comments: [
      { id: 'c1', author: 'Sarah Miller', text: 'Nice work staying consistent!' },
    ],
  },
  {
    id: 'p2',
    author: 'Sarah Miller',
    time: '5 hours ago',
    body: 'Campus loop with the 5K Club. Anyone joining the weekend long run?',
    media: 'map',
    likes: 24,
    liked: false,
    comments: [
      { id: 'c2', author: 'Mike Chen', text: 'I am in for Sunday morning.' },
    ],
  },
  {
    id: 'p3',
    author: 'Mike Chen',
    time: 'Yesterday',
    body: 'Upper body session in the books. Overhead press felt strong today.',
    media: 'video',
    likes: 18,
    liked: false,
    comments: [],
  },
];

export const initialMeals: Meal[] = [
  {
    id: 'm1',
    name: 'Oatmeal & Berries',
    mealType: 'Breakfast',
    time: '8:30 AM',
    kcal: 350,
    protein: 14,
    carbs: 52,
    fats: 8,
  },
  {
    id: 'm2',
    name: 'Grilled Chicken Salad',
    mealType: 'Lunch',
    time: '1:15 PM',
    kcal: 520,
    protein: 42,
    carbs: 28,
    fats: 22,
  },
  {
    id: 'm3',
    name: 'Protein Shake',
    mealType: 'Snack',
    time: '4:00 PM',
    kcal: 210,
    protein: 28,
    carbs: 8,
    fats: 4,
  },
];

export const calorieTarget = 2200;
export const macroTargets = { protein: 140, carbs: 220, fats: 70 };

export const quickAddFoods: Meal[] = [
  {
    id: 'q1',
    name: 'Greek Yogurt',
    mealType: 'Snack',
    time: 'Now',
    kcal: 160,
    protein: 15,
    carbs: 12,
    fats: 4,
  },
  {
    id: 'q2',
    name: 'Banana',
    mealType: 'Snack',
    time: 'Now',
    kcal: 105,
    protein: 1,
    carbs: 27,
    fats: 0,
  },
  {
    id: 'q3',
    name: 'Rice & Veg Bowl',
    mealType: 'Dinner',
    time: 'Now',
    kcal: 480,
    protein: 18,
    carbs: 68,
    fats: 12,
  },
];

export const mockRecognizedMeal: Meal = {
  id: 'rec',
  name: 'Grilled Salmon & Veg',
  mealType: 'Dinner',
  time: 'Now',
  kcal: 540,
  protein: 38,
  carbs: 22,
  fats: 28,
};
