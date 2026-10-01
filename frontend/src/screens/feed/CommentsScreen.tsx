import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useApp } from '../../context/AppContext';
import { colors, radius, spacing } from '../../theme';
import type { FeedStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<FeedStackParamList, 'Comments'>;

export function CommentsScreen({ route, navigation }: Props) {
  const { postId } = route.params;
  const { posts, addComment } = useApp();
  const post = posts.find((item) => item.id === postId);
  const [text, setText] = useState('');

  if (!post) {
    return (
      <View style={styles.screen}>
        <AppChrome title="Comments">
          <Text style={styles.empty}>Post not found.</Text>
        </AppChrome>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppChrome title="Comments">
        <View style={styles.body}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.post}>{post.body}</Text>
          {post.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text style={styles.author}>{comment.author}</Text>
              <Text style={styles.text}>{comment.text}</Text>
            </View>
          ))}
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Add a comment"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
          />
          <PrimaryButton
            label="Post comment"
            onPress={() => {
              if (!text.trim()) return;
              addComment(post.id, text.trim());
              setText('');
            }}
          />
        </View>
      </AppChrome>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.md, gap: 10 },
  back: { minHeight: 44, justifyContent: 'center' },
  backText: { color: colors.accent, fontWeight: '700' },
  empty: { padding: spacing.md, color: colors.textSecondary },
  post: { color: colors.text, marginBottom: 8, lineHeight: 20 },
  comment: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  author: { fontWeight: '700', color: colors.text },
  text: { color: colors.textSecondary, marginTop: 4 },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    color: colors.text,
  },
});
