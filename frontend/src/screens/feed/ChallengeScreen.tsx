import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { Card } from '../../components/Card';
import { challenges } from '../../data/mock';
import { colors, spacing } from '../../theme';
import type { FeedStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<FeedStackParamList, 'Challenge'>;

export function ChallengeScreen({ route, navigation }: Props) {
  const challenge = challenges.find((item) => item.id === route.params.id);

  return (
    <View style={styles.screen}>
      <AppChrome title="Circle">
        <View style={styles.body}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Card>
            <Text style={styles.title}>{challenge?.title ?? 'Circle'}</Text>
            <Text style={styles.meta}>{challenge?.subtitle}</Text>
            <Text style={styles.copy}>
              Private circle from the Lab 03 community row. Posts stay on this device for the
              prototype — there is no live Firebase feed.
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
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  meta: { color: colors.textSecondary, marginTop: 4 },
  copy: { marginTop: 12, color: colors.textSecondary, lineHeight: 20 },
});
