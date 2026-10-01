import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useApp } from '../../context/AppContext';
import { colors, radius, spacing } from '../../theme';
import type { PlanStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<PlanStackParamList, 'ActiveWorkout'>;

export function ActiveWorkoutScreen({ navigation }: Props) {
  const { activePlan, completeWorkout } = useApp();
  const [done, setDone] = useState<Record<string, boolean>>({});

  const finish = () => {
    completeWorkout();
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <AppChrome title="Active Workout">
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.title}>{activePlan.title}</Text>
          <Text style={styles.meta}>{activePlan.durationMin} min · {activePlan.estCal} kcal estimate</Text>
          {activePlan.exercises.map((exercise) => {
            const checked = !!done[exercise.id];
            return (
              <Pressable
                key={exercise.id}
                onPress={() => setDone((prev) => ({ ...prev, [exercise.id]: !checked }))}
                style={styles.row}
              >
                <Ionicons
                  name={checked ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color={checked ? colors.accent : colors.textSecondary}
                />
                <View>
                  <Text style={styles.name}>{exercise.name}</Text>
                  <Text style={styles.meta}>{exercise.setsLabel}</Text>
                </View>
              </Pressable>
            );
          })}
          <PrimaryButton label="Complete Workout" onPress={finish} style={styles.cta} />
        </ScrollView>
      </AppChrome>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 32 },
  back: { minHeight: 44, justifyContent: 'center' },
  backText: { color: colors.accent, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  meta: { color: colors.textSecondary, marginTop: 4, marginBottom: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    minHeight: 64,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  cta: { marginTop: spacing.md },
});
