import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { Card } from '../../components/Card';
import { GoalRing, TrendChart } from '../../components/Charts';
import { PrimaryButton } from '../../components/PrimaryButton';
import { dailyFlow, dailyGoalPercent, homeStats, mockUser, weeklyTrend } from '../../data/mock';
import { colors, radius, spacing } from '../../theme';
import type { HomeStackParamList, TabParamList } from '../../navigation/types';

type Props = {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>,
    BottomTabNavigationProp<TabParamList>
  >;
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function todayLabel() {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <AppChrome title="FitFlow">
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.hello}>
            {greeting()}, {mockUser.firstName}
          </Text>
          <Text style={styles.date}>{todayLabel()}</Text>

          <Card style={styles.flowCard}>
            <View style={styles.flowHead}>
              <Text style={styles.flowTitle}>{dailyFlow.title}</Text>
              <View style={styles.spark}>
                <Ionicons name="sparkles" size={18} color={colors.accent} />
              </View>
            </View>
            <Text style={styles.flowCopy}>{dailyFlow.recommendation}</Text>
            <View style={styles.media}>
              <View style={styles.mediaBar} />
            </View>
            <PrimaryButton
              label="Start Flow"
              onPress={() => navigation.navigate('Plan')}
            />
          </Card>

          <View style={styles.statsRow}>
            <MiniStat icon="flame-outline" value={homeStats.kcal} label="Kcal" progress={homeStats.kcalProgress} />
            <MiniStat icon="walk-outline" value={homeStats.steps} label="Steps" progress={homeStats.stepsProgress} />
            <MiniStat icon="star-outline" value={String(homeStats.streak)} label="Streak" progress={1} />
          </View>

          <View style={styles.split}>
            <Card style={styles.half}>
              <Text style={styles.cardTitle}>Activity Trend</Text>
              <Text style={styles.meta}>Last 7 days</Text>
              <TrendChart values={weeklyTrend} height={90} />
            </Card>
            <Pressable onPress={() => navigation.navigate('GoalDetails')} style={styles.halfPress}>
              <Card style={styles.half}>
                <View style={styles.ringWrap}>
                  <GoalRing percent={dailyGoalPercent} size={108} />
                  <Text style={styles.ringLabel}>{dailyGoalPercent}%</Text>
                </View>
                <Text style={styles.cardTitleCenter}>Daily Goal</Text>
                <Text style={styles.metaCenter}>Tap for details</Text>
              </Card>
            </Pressable>
          </View>
        </ScrollView>
      </AppChrome>
    </View>
  );
}

function MiniStat({
  icon,
  value,
  label,
  progress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  progress: number;
}) {
  return (
    <Card style={styles.mini}>
      <Ionicons name={icon} size={18} color={colors.text} />
      <Text style={styles.miniValue}>{value}</Text>
      <Text style={styles.meta}>{label}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.round(progress * 100)}%` }]} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 32 },
  hello: { fontSize: 26, fontWeight: '800', color: colors.text },
  date: { marginTop: 4, marginBottom: spacing.md, color: colors.textSecondary, fontSize: 15 },
  flowCard: { marginBottom: spacing.md },
  flowHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  flowTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  spark: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowCopy: { marginTop: spacing.sm, color: colors.textSecondary, lineHeight: 22, fontSize: 15 },
  media: {
    height: 96,
    borderRadius: radius.md,
    backgroundColor: '#F3F4F6',
    marginVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaBar: { width: 72, height: 8, borderRadius: 4, backgroundColor: '#D6D3D1' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: spacing.md },
  mini: { flex: 1, alignItems: 'flex-start', gap: 4 },
  miniValue: { fontSize: 20, fontWeight: '800', color: colors.text },
  track: { height: 4, backgroundColor: colors.track, borderRadius: 2, width: '100%', marginTop: 6 },
  fill: { height: 4, backgroundColor: colors.accent, borderRadius: 2 },
  split: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  halfPress: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  cardTitleCenter: { fontSize: 15, fontWeight: '700', color: colors.text, textAlign: 'center', marginTop: 4 },
  meta: { color: colors.textSecondary, fontSize: 12, marginBottom: 8 },
  metaCenter: { color: colors.textSecondary, fontSize: 12, textAlign: 'center' },
  ringWrap: { alignItems: 'center', justifyContent: 'center', marginVertical: 4 },
  ringLabel: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
});
