import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  aiWorkout,
  customWorkout,
  initialMeals,
  initialPosts,
  streakGrid as seedStreak,
} from '../data/mock';
import type { Meal, Post, PostComment, WorkoutPlan } from '../types';

type PlanMode = 'ai' | 'custom';
type ProgressRange = 'weekly' | 'monthly';

type AppContextValue = {
  planMode: PlanMode;
  setPlanMode: (mode: PlanMode) => void;
  activePlan: WorkoutPlan;
  workoutHistory: string[];
  completeWorkout: () => void;
  progressRange: ProgressRange;
  setProgressRange: (range: ProgressRange) => void;
  streakCells: number[];
  posts: Post[];
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  addPost: (body: string) => void;
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  updateMeal: (meal: Meal) => void;
  selectedChallengeId: string | null;
  setSelectedChallengeId: (id: string | null) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [planMode, setPlanMode] = useState<PlanMode>('ai');
  const [progressRange, setProgressRange] = useState<ProgressRange>('weekly');
  const [workoutHistory, setWorkoutHistory] = useState<string[]>([
    'Yesterday · Lower Body',
    'Mon · Recovery Walk',
  ]);
  const [streakCells, setStreakCells] = useState<number[]>(seedStreak);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>('ch1');

  const activePlan = planMode === 'ai' ? aiWorkout : customWorkout;

  const completeWorkout = () => {
    const title = `${nowLabel()} · ${activePlan.title}`;
    setWorkoutHistory((prev) => [title, ...prev]);
    setStreakCells((prev) => {
      const next = [...prev];
      next[next.length - 1] = 1;
      return next;
    });
  };

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const liked = !post.liked;
        return { ...post, liked, likes: post.likes + (liked ? 1 : -1) };
      }),
    );
  };

  const addComment = (postId: string, text: string) => {
    const comment: PostComment = {
      id: `cm-${Date.now()}`,
      author: 'Alex Johnson',
      text,
    };
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post,
      ),
    );
  };

  const addPost = (body: string) => {
    const post: Post = {
      id: `p-${Date.now()}`,
      author: 'Alex Johnson',
      time: 'Just now',
      body,
      media: 'image',
      likes: 0,
      liked: false,
      comments: [],
    };
    setPosts((prev) => [post, ...prev]);
  };

  const addMeal = (meal: Omit<Meal, 'id'>) => {
    setMeals((prev) => [{ ...meal, id: `m-${Date.now()}` }, ...prev]);
  };

  const updateMeal = (meal: Meal) => {
    setMeals((prev) => prev.map((item) => (item.id === meal.id ? meal : item)));
  };

  const value = useMemo(
    () => ({
      planMode,
      setPlanMode,
      activePlan,
      workoutHistory,
      completeWorkout,
      progressRange,
      setProgressRange,
      streakCells,
      posts,
      toggleLike,
      addComment,
      addPost,
      meals,
      addMeal,
      updateMeal,
      selectedChallengeId,
      setSelectedChallengeId,
    }),
    [
      planMode,
      activePlan,
      workoutHistory,
      progressRange,
      streakCells,
      posts,
      meals,
      selectedChallengeId,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
