import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

type Props = {
  title: string;
  onMenu: () => void;
  onProfile: () => void;
};

export function ScreenHeader({ title, onMenu, onProfile }: Props) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onMenu} hitSlop={8} style={styles.iconBtn} accessibilityLabel="Open menu">
        <Ionicons name="menu" size={26} color={colors.text} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable
        onPress={onProfile}
        hitSlop={8}
        style={styles.avatar}
        accessibilityLabel="Open profile"
      >
        <Ionicons name="person-outline" size={18} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
});
