import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { Card } from '../../components/Card';
import { calorieTarget, macroTargets, quickAddFoods } from '../../data/mock';
import { useApp } from '../../context/AppContext';
import { colors, radius, spacing } from '../../theme';
import type { FoodStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<FoodStackParamList, 'Nutrition'>;

export function NutritionScreen({ navigation }: Props) {
  const { meals, addMeal } = useApp();
  const [quickOpen, setQuickOpen] = useState(false);

  const totals = useMemo(
    () =>
      meals.reduce(
        (acc, meal) => ({
          kcal: acc.kcal + meal.kcal,
          protein: acc.protein + meal.protein,
          carbs: acc.carbs + meal.carbs,
          fats: acc.fats + meal.fats,
        }),
        { kcal: 0, protein: 0, carbs: 0, fats: 0 },
      ),
    [meals],
  );

  const proteinLeft = Math.max(macroTargets.protein - totals.protein, 0);
  const carbsLeft = Math.max(macroTargets.carbs - totals.carbs, 0);
  const fatsLeft = Math.max(macroTargets.fats - totals.fats, 0);
  const pShare = totals.protein * 4;
  const cShare = totals.carbs * 4;
  const fShare = totals.fats * 9;
  const macroSum = Math.max(pShare + cShare + fShare, 1);

  return (
    <View style={styles.screen}>
      <AppChrome title="Nutrition">
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Pressable style={styles.camera} onPress={() => navigation.navigate('LogMeal')}>
            <View style={styles.cameraCircle}>
              <Ionicons name="camera" size={32} color={colors.text} />
            </View>
            <Text style={styles.cameraLabel}>Tap to log your meal</Text>
          </Pressable>

          <View style={styles.macroHead}>
            <Text style={styles.section}>Daily Macros</Text>
            <Text style={styles.kcal}>
              {totals.kcal.toLocaleString()} / {calorieTarget.toLocaleString()} kcal
            </Text>
          </View>
          <View style={styles.bar}>
            <View style={[styles.seg, { flex: pShare / macroSum, backgroundColor: colors.text }]} />
            <View style={[styles.seg, { flex: cShare / macroSum, backgroundColor: '#6B7280' }]} />
            <View style={[styles.seg, { flex: fShare / macroSum, backgroundColor: '#D1D5DB' }]} />
          </View>
          <Text style={styles.legend}>
            ● Protein ({proteinLeft}g left)   ● Carbs ({carbsLeft}g left)   ○ Fats ({fatsLeft}g left)
          </Text>

          <View style={styles.mealsHead}>
            <Text style={styles.section}>Recent Meals</Text>
            <Pressable onPress={() => setQuickOpen(true)} hitSlop={8}>
              <Text style={styles.link}>Quick Add</Text>
            </Pressable>
          </View>

          {meals.map((meal) => (
            <Pressable key={meal.id} onPress={() => navigation.navigate('EditMeal', { mealId: meal.id })}>
              <Card style={styles.meal}>
                <View style={styles.mealIcon}>
                  <Ionicons name="restaurant-outline" size={20} color={colors.text} />
                </View>
                <View style={styles.mealCopy}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealMeta}>
                    {meal.mealType} • {meal.time}
                  </Text>
                </View>
                <View>
                  <Text style={styles.mealKcal}>{meal.kcal}</Text>
                  <Text style={styles.mealUnit}>kcal</Text>
                </View>
              </Card>
            </Pressable>
          ))}
        </ScrollView>
      </AppChrome>

      <Modal visible={quickOpen} transparent animationType="fade" onRequestClose={() => setQuickOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setQuickOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => undefined}>
            <Text style={styles.section}>Quick Add</Text>
            {quickAddFoods.map((food) => (
              <Pressable
                key={food.id}
                style={styles.quickRow}
                onPress={() => {
                  addMeal({
                    ...food,
                    time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
                  });
                  setQuickOpen(false);
                }}
              >
                <Text style={styles.mealName}>{food.name}</Text>
                <Text style={styles.mealMeta}>{food.kcal} kcal</Text>
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 32 },
  camera: { alignItems: 'center', marginBottom: spacing.lg, minHeight: 44 },
  cameraCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraLabel: { marginTop: 10, color: colors.textSecondary },
  macroHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  section: { fontSize: 20, fontWeight: '800', color: colors.text },
  kcal: { color: colors.textSecondary, fontWeight: '600' },
  bar: { height: 14, borderRadius: 7, overflow: 'hidden', flexDirection: 'row', marginTop: 10, backgroundColor: '#E5E7EB' },
  seg: { height: 14 },
  legend: { marginTop: 8, color: colors.textSecondary, fontSize: 12 },
  mealsHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.sm },
  link: { color: colors.accent, fontWeight: '700' },
  meal: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  mealIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealCopy: { flex: 1 },
  mealName: { fontSize: 16, fontWeight: '700', color: colors.text },
  mealMeta: { color: colors.textSecondary, marginTop: 2 },
  mealKcal: { fontSize: 18, fontWeight: '800', color: colors.text, textAlign: 'right' },
  mealUnit: { color: colors.textSecondary, textAlign: 'right' },
  backdrop: { flex: 1, backgroundColor: 'rgba(17,24,39,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  quickRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minHeight: 48,
  },
});
