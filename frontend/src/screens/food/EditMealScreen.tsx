import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useApp } from '../../context/AppContext';
import { colors, radius, spacing } from '../../theme';
import type { FoodStackParamList } from '../../navigation/types';
import type { MealType } from '../../types';

type Props = NativeStackScreenProps<FoodStackParamList, 'EditMeal'>;

const types: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export function EditMealScreen({ route, navigation }: Props) {
  const { meals, updateMeal } = useApp();
  const meal = meals.find((item) => item.id === route.params.mealId);
  const [name, setName] = useState(meal?.name ?? '');
  const [kcal, setKcal] = useState(String(meal?.kcal ?? ''));
  const [mealType, setMealType] = useState<MealType>(meal?.mealType ?? 'Snack');

  if (!meal) {
    return (
      <View style={styles.screen}>
        <AppChrome title="Edit meal">
          <Text style={styles.note}>Meal not found.</Text>
        </AppChrome>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppChrome title="Edit meal">
        <View style={styles.body}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
          <TextInput value={kcal} onChangeText={setKcal} keyboardType="numeric" style={styles.input} />
          <View style={styles.types}>
            {types.map((type) => (
              <Pressable
                key={type}
                onPress={() => setMealType(type)}
                style={[styles.type, mealType === type && styles.typeOn]}
              >
                <Text style={[styles.typeText, mealType === type && styles.typeTextOn]}>{type}</Text>
              </Pressable>
            ))}
          </View>
          <PrimaryButton
            label="Save meal"
            onPress={() => {
              updateMeal({ ...meal, name, mealType, kcal: Number(kcal) || meal.kcal });
              navigation.goBack();
            }}
          />
        </View>
      </AppChrome>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.md, gap: 12 },
  back: { minHeight: 44, justifyContent: 'center' },
  backText: { color: colors.accent, fontWeight: '700' },
  note: { padding: spacing.md, color: colors.textSecondary },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  types: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  type: {
    minHeight: 40,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  typeOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  typeText: { color: colors.textSecondary, fontWeight: '600' },
  typeTextOn: { color: colors.white },
});
