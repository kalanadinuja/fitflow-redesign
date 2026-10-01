export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export type MediaKind = 'image' | 'map' | 'video';

export type Exercise = {
  id: string;
  name: string;
  setsLabel: string;
};

export type WorkoutPlan = {
  title: string;
  durationMin: number;
  reason: string;
  exerciseCount: number;
  estCal: number;
  exercises: Exercise[];
};

export type PostComment = {
  id: string;
  author: string;
  text: string;
};

export type Post = {
  id: string;
  author: string;
  time: string;
  body: string;
  media: MediaKind;
  likes: number;
  liked: boolean;
  comments: PostComment[];
};

export type Challenge = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'walk' | 'barbell' | 'people';
};

export type Meal = {
  id: string;
  name: string;
  mealType: MealType;
  time: string;
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
};

export type Achievement = {
  id: string;
  label: string;
  icon: 'time' | 'star' | 'trophy' | 'flash';
};

export type BodyMetrics = {
  weightKg: number;
  bodyFat: number;
  rhr: number;
};
