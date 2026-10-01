import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppChrome } from '../../components/AppChrome';
import { Card } from '../../components/Card';
import { TrendChart } from '../../components/Charts';
import { SegmentedControl } from '../../components/SegmentedControl';
import { useApp } from '../../context/AppContext';
import { achievements, bodyMetrics, monthlyTrend, weeklyTrend } from '../../data/mock';
import { colors, radius, spacing } from '../../theme';

const achievementIcons = {
  time: 'time-outline',
  star: 'star-outline',
  trophy: 'trophy-outline',
  flash: 'flash-outline',
} as const;

export function ProgressScreen() {
  const { progressRange, setProgressRange, streakCells, workoutHistory } = useApp();
  const trend = progressRange === 'weekly' ? weeklyTrend : monthlyTrend;
  const dayLabels = progressRange === 'weekly' ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'] : undefined;

  return (
    <View style={styles.screen}>
      <AppChrome title="FitFlow">
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Progress</Text>
          <SegmentedControl
            options={[
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
            value={progressRange}
            onChange={setProgressRange}
          />

          <Card style={styles.block}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>Activity Trend</Text>
              <Text style={styles.meta}>{progressRange === 'weekly' ? 'This Week' : 'This Month'}</Text>
            </View>
            <TrendChart values={trend} height={120} />
            {dayLabels ? (
              <View style={styles.days}>
                {dayLabels.map((d, i) => (
                  <Text key={`${d}-${i}`} style={styles.day}>
                    {d}
                  </Text>
                ))}
              </View>
            ) : null}
          </Card>

          <Card style={styles.block}>
            <Text style={styles.cardTitle}>Streak</Text>
            <View style={styles.grid}>
              {streakCells.map((on, i) => (
                <View key={i} style={[styles.cell, on ? styles.cellOn : styles.cellOff]} />
              ))}
            </View>
          </Card>

          <Card style={styles.block}>
            <Text style={styles.cardTitle}>Recent Achievements</Text>
            <View style={styles.achRow}>
              {achievements.map((item) => (
                <View key={item.id} style={styles.ach}>
                  <View style={styles.achIcon}>
                    <Ionicons name={achievementIcons[item.icon]} size={20} color={colors.text} />
                  </View>
                </View>
              ))}
            </View>
          </Card>

          <View style={styles.metrics}>
            <Metric icon="scale-outline" value={String(bodyMetrics.weightKg)} label="kg" />
            <Metric icon="water-outline" value={String(bodyMetrics.bodyFat)} label="% Fat" />
            <Metric icon="heart-outline" value={String(bodyMetrics.rhr)} label="RHR" />
          </View>

          <Text style={styles.section}>Workout history</Text>
          {workoutHistory.map((item) => (
            <View key={item} style={styles.history}>
              <Text style={styles.historyText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </AppChrome>
    </View>
  );
}

function Metric({ icon, value, label }: { icon: keyof typeof Ionicons.glyphMap; value: string; label: string }) {
  return (
    <View style={styles.metric}>
      <Ionicons name={icon} size={18} color={colors.text} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.meta}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 36 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  block: { marginTop: spacing.md },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 10 },
  meta: { color: colors.textSecondary, fontSize: 12 },
  days: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 6 },
  day: { color: colors.textSecondary, fontSize: 12, width: 18, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  cell: { width: '12.2%', aspectRatio: 1, borderRadius: 6 },
  cellOn: { backgroundColor: colors.accent },
  cellOff: { backgroundColor: '#E5E7EB' },
  achRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  ach: { alignItems: 'center' },
  achIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metrics: {
    flexDirection: 'row',
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
  },
  metric: { flex: 1, alignItems: 'center', gap: 4 },
  metricValue: { fontSize: 22, fontWeight: '800', color: colors.text },
  section: { marginTop: spacing.lg, marginBottom: spacing.sm, fontSize: 16, fontWeight: '800', color: colors.text },
  history: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 8,
  },
  historyText: { color: colors.text, fontWeight: '600' },
});
