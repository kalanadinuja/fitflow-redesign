import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { Card } from '../../components/Card';
import { GoalRing } from '../../components/Charts';
import { dailyGoalPercent, homeStats } from '../../data/mock';
import { colors, spacing } from '../../theme';
import type { HomeStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'GoalDetails'>;

export function GoalDetailsScreen({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <AppChrome title="Daily Goal">
        <View style={styles.body}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Card>
            <View style={styles.center}>
              <GoalRing percent={dailyGoalPercent} size={140} />
              <Text style={styles.pct}>{dailyGoalPercent}%</Text>
            </View>
            <Text style={styles.lead}>You are on track for today.</Text>
            <Text style={styles.row}>Calories logged: {homeStats.kcal} of goal</Text>
            <Text style={styles.row}>Steps: {homeStats.steps}</Text>
            <Text style={styles.row}>Streak: {homeStats.streak} days</Text>
            <Text style={styles.note}>
              These figures are mock prototype data for Lab 06 testing.
            </Text>
          </Card>
        </View>
      </AppChrome>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.md },
  back: { minHeight: 44, justifyContent: 'center', marginBottom: 8 },
  backText: { color: colors.accent, fontWeight: '700' },
  center: { alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  pct: { position: 'absolute', fontSize: 22, fontWeight: '800', color: colors.text },
  lead: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  row: { color: colors.textSecondary, marginTop: 6, fontSize: 15 },
  note: { marginTop: spacing.md, color: colors.textSecondary, fontSize: 13, lineHeight: 18 },
});
