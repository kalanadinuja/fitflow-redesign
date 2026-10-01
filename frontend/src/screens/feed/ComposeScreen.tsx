import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useApp } from '../../context/AppContext';
import { colors, radius, spacing } from '../../theme';
import type { FeedStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<FeedStackParamList, 'Compose'>;

export function ComposeScreen({ navigation }: Props) {
  const { addPost } = useApp();
  const [body, setBody] = useState('');

  return (
    <View style={styles.screen}>
      <AppChrome title="New post">
        <View style={styles.body}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="Share a workout, run, or recovery note"
            placeholderTextColor={colors.textSecondary}
            multiline
            style={styles.input}
          />
          <PrimaryButton
            label="Share to circle"
            onPress={() => {
              if (!body.trim()) return;
              addPost(body.trim());
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
  input: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16,
  },
});
