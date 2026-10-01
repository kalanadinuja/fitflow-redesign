import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { mockUser } from '../data/mock';
import { ScreenHeader } from './ScreenHeader';

export function AppChrome({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [sheet, setSheet] = useState<'menu' | 'profile' | null>(null);

  return (
    <View style={styles.flex}>
      <ScreenHeader title={title} onMenu={() => setSheet('menu')} onProfile={() => setSheet('profile')} />
      {children}
      <Modal visible={sheet !== null} transparent animationType="fade" onRequestClose={() => setSheet(null)}>
        <Pressable style={styles.backdrop} onPress={() => setSheet(null)}>
          <Pressable style={styles.sheet} onPress={() => undefined}>
            {sheet === 'menu' ? (
              <>
                <Text style={styles.sheetTitle}>FitFlow</Text>
                <Text style={styles.body}>
                  Student prototype for IT3060 HCI (Lab 06). Workout suggestions and food
                  recognition use local mock data. Firebase, NestJS, and FastAPI are not connected
                  in this build.
                </Text>
              </>
            ) : (
              <>
                <View style={styles.profileRow}>
                  <View style={styles.avatar}>
                    <Ionicons name="person" size={22} color={colors.accent} />
                  </View>
                  <View>
                    <Text style={styles.sheetTitle}>{mockUser.fullName}</Text>
                    <Text style={styles.meta}>{mockUser.handle}</Text>
                  </View>
                </View>
                <Text style={styles.body}>Signed in locally for this prototype. Firebase Auth is not enabled.</Text>
              </>
            )}
            <Pressable
              style={styles.close}
              onPress={() => setSheet(null)}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.4)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  body: { marginTop: spacing.sm, color: colors.textSecondary, lineHeight: 20, fontSize: 14 },
  meta: { color: colors.textSecondary, marginTop: 2 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    marginTop: spacing.md,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { color: colors.accent, fontWeight: '700' },
});
