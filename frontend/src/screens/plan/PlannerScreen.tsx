import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { Card } from '../../components/Card';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SegmentedControl } from '../../components/SegmentedControl';
import { useApp } from '../../context/AppContext';
import { colors, radius, spacing } from '../../theme';
import type { PlanStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<PlanStackParamList, 'Planner'>;

export function PlannerScreen({ navigation }: Props) {
  const { planMode, setPlanMode, activePlan } = useApp();

  return (
    <View style={styles.screen}>
      <AppChrome title="Workout Planner">
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <SegmentedControl
            options={[
              { value: 'ai', label: 'AI Suggested' },
              { value: 'custom', label: 'Custom' },
            ]}
            value={planMode}
            onChange={setPlanMode}
          />

          <Card style={styles.planCard}>
            <View style={styles.planHead}>
              <Text style={styles.planTitle}>{activePlan.title}</Text>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{activePlan.durationMin} Min</Text>
              </View>
            </View>
            <Text style={styles.reason}>{activePlan.reason}</Text>
            <View style={styles.metrics}>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>{activePlan.exerciseCount}</Text>
                <Text style={styles.metricLabel}>Exercises</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>{activePlan.estCal}</Text>
                <Text style={styles.metricLabel}>Est. Cal</Text>
              </View>
            </View>
          </Card>

          <Text style={styles.section}>Workout Circuit</Text>
          {activePlan.exercises.map((exercise) => (
            <View key={exercise.id} style={styles.exercise}>
              <Ionicons name="menu" size={18} color={colors.textSecondary} />
              <View style={styles.exIcon}>
                <Ionicons name="barbell-outline" size={18} color={colors.text} />
              </View>
              <View style={styles.exCopy}>
                <Text style={styles.exName}>{exercise.name}</Text>
                <Text style={styles.exMeta}>{exercise.setsLabel}</Text>
              </View>
              <Ionicons name="ellipsis-vertical" size={16} color={colors.textSecondary} />
            </View>
          ))}

          <PrimaryButton
            label="Start Workout  →"
            onPress={() => navigation.navigate('ActiveWorkout')}
            style={styles.cta}
          />
        </ScrollView>
      </AppChrome>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 36 },
  planCard: { marginTop: spacing.md },
  planHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planTitle: { fontSize: 22, fontWeight: '800', color: colors.text, flex: 1, paddingRight: 8 },
  pill: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  reason: { marginTop: spacing.sm, color: colors.textSecondary, lineHeight: 20 },
  metrics: { flexDirection: 'row', gap: 10, marginTop: spacing.md },
  metric: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FAFBFC',
  },
  metricValue: { fontSize: 22, fontWeight: '800', color: colors.text },
  metricLabel: { color: colors.textSecondary, marginTop: 2, fontSize: 13 },
  section: { marginTop: spacing.lg, marginBottom: spacing.sm, fontSize: 18, fontWeight: '800', color: colors.text },
  exercise: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    marginBottom: 10,
    minHeight: 72,
  },
  exIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exCopy: { flex: 1 },
  exName: { fontSize: 16, fontWeight: '700', color: colors.text },
  exMeta: { color: colors.textSecondary, marginTop: 2 },
  cta: { marginTop: spacing.md },
});
