import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HomeMain: undefined;
  GoalDetails: undefined;
};

export type PlanStackParamList = {
  Planner: undefined;
  ActiveWorkout: undefined;
};

export type ProgressStackParamList = {
  ProgressMain: undefined;
};

export type FeedStackParamList = {
  FeedMain: undefined;
  Comments: { postId: string };
  Compose: undefined;
  Challenge: { id: string };
};

export type FoodStackParamList = {
  Nutrition: undefined;
  LogMeal: undefined;
  EditMeal: { mealId: string };
};

export type TabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList> | undefined;
  Plan: NavigatorScreenParams<PlanStackParamList> | undefined;
  Progress: NavigatorScreenParams<ProgressStackParamList> | undefined;
  Feed: NavigatorScreenParams<FeedStackParamList> | undefined;
  Food: NavigatorScreenParams<FoodStackParamList> | undefined;
};
