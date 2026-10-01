import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';
import { HomeScreen } from '../screens/home/HomeScreen';
import { GoalDetailsScreen } from '../screens/home/GoalDetailsScreen';
import { PlannerScreen } from '../screens/plan/PlannerScreen';
import { ActiveWorkoutScreen } from '../screens/plan/ActiveWorkoutScreen';
import { ProgressScreen } from '../screens/progress/ProgressScreen';
import { FeedScreen } from '../screens/feed/FeedScreen';
import { CommentsScreen } from '../screens/feed/CommentsScreen';
import { ComposeScreen } from '../screens/feed/ComposeScreen';
import { ChallengeScreen } from '../screens/feed/ChallengeScreen';
import { NutritionScreen } from '../screens/food/NutritionScreen';
import { LogMealScreen } from '../screens/food/LogMealScreen';
import { EditMealScreen } from '../screens/food/EditMealScreen';
import { colors } from '../theme';
import type {
  FeedStackParamList,
  FoodStackParamList,
  HomeStackParamList,
  PlanStackParamList,
  ProgressStackParamList,
  TabParamList,
} from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const PlanStack = createNativeStackNavigator<PlanStackParamList>();
const ProgressStack = createNativeStackNavigator<ProgressStackParamList>();
const FeedStack = createNativeStackNavigator<FeedStackParamList>();
const FoodStack = createNativeStackNavigator<FoodStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.background, card: colors.surface, text: colors.text, border: colors.border, primary: colors.accent },
};

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="GoalDetails" component={GoalDetailsScreen} />
    </HomeStack.Navigator>
  );
}

function PlanNavigator() {
  return (
    <PlanStack.Navigator screenOptions={{ headerShown: false }}>
      <PlanStack.Screen name="Planner" component={PlannerScreen} />
      <PlanStack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />
    </PlanStack.Navigator>
  );
}

function ProgressNavigator() {
  return (
    <ProgressStack.Navigator screenOptions={{ headerShown: false }}>
      <ProgressStack.Screen name="ProgressMain" component={ProgressScreen} />
    </ProgressStack.Navigator>
  );
}

function FeedNavigator() {
  return (
    <FeedStack.Navigator screenOptions={{ headerShown: false }}>
      <FeedStack.Screen name="FeedMain" component={FeedScreen} />
      <FeedStack.Screen name="Comments" component={CommentsScreen} />
      <FeedStack.Screen name="Compose" component={ComposeScreen} />
      <FeedStack.Screen name="Challenge" component={ChallengeScreen} />
    </FeedStack.Navigator>
  );
}

function FoodNavigator() {
  return (
    <FoodStack.Navigator screenOptions={{ headerShown: false }}>
      <FoodStack.Screen name="Nutrition" component={NutritionScreen} />
      <FoodStack.Screen name="LogMeal" component={LogMealScreen} />
      <FoodStack.Screen name="EditMeal" component={EditMealScreen} />
    </FoodStack.Navigator>
  );
}

function TabItem({
  focused,
  icon,
  label,
}: {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemOn]}>
      <Ionicons name={icon} size={18} color={focused ? colors.white : colors.textSecondary} />
      <Text style={[styles.tabLabel, focused && styles.tabLabelOn]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.bar,
          tabBarItemStyle: styles.tabSlot,
          tabBarIconStyle: styles.tabIcon,
          unmountOnBlur: true,
          sceneStyle: { backgroundColor: colors.background, flex: 1 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ focused }) => <TabItem focused={focused} icon="home-outline" label="Home" />,
          }}
        />
        <Tab.Screen
          name="Plan"
          component={PlanNavigator}
          options={{
            tabBarIcon: ({ focused }) => <TabItem focused={focused} icon="calendar-outline" label="Plan" />,
          }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressNavigator}
          options={{
            tabBarIcon: ({ focused }) => <TabItem focused={focused} icon="stats-chart-outline" label="Progress" />,
          }}
        />
        <Tab.Screen
          name="Feed"
          component={FeedNavigator}
          options={{
            tabBarIcon: ({ focused }) => <TabItem focused={focused} icon="people-outline" label="Feed" />,
          }}
        />
        <Tab.Screen
          name="Food"
          component={FoodNavigator}
          options={{
            tabBarIcon: ({ focused }) => <TabItem focused={focused} icon="restaurant-outline" label="Food" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 78,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
  },
  tabItem: {
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  tabItemOn: {
    backgroundColor: colors.accent,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tabLabelOn: {
    color: colors.white,
  },
  tabSlot: {
    paddingVertical: 4,
  },
  tabIcon: {
    width: 72,
    height: 52,
  },
});
