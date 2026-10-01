import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { Card } from '../../components/Card';
import { useApp } from '../../context/AppContext';
import { challenges } from '../../data/mock';
import { colors, radius, spacing } from '../../theme';
import type { FeedStackParamList } from '../../navigation/types';
import type { MediaKind } from '../../types';

type Props = NativeStackScreenProps<FeedStackParamList, 'FeedMain'>;

const mediaIcon: Record<MediaKind, keyof typeof Ionicons.glyphMap> = {
  image: 'image-outline',
  map: 'map-outline',
  video: 'play-circle-outline',
};

export function FeedScreen({ navigation }: Props) {
  const { posts, toggleLike, selectedChallengeId, setSelectedChallengeId } = useApp();

  return (
    <View style={styles.screen}>
      <AppChrome title="FitFlow">
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Community</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {challenges.map((item) => {
              const active = selectedChallengeId === item.id;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    setSelectedChallengeId(item.id);
                    navigation.navigate('Challenge', { id: item.id });
                  }}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <View style={styles.chipIcon}>
                    <Ionicons
                      name={item.icon === 'walk' ? 'walk-outline' : item.icon === 'barbell' ? 'barbell-outline' : 'people-outline'}
                      size={22}
                      color={colors.text}
                    />
                  </View>
                  <View style={styles.chipLines}>
                    <View style={styles.line} />
                    <View style={[styles.line, styles.lineShort]} />
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>

          {posts.map((post) => (
            <Card key={post.id} style={styles.post}>
              <View style={styles.postHead}>
                <View style={styles.avatar} />
                <View>
                  <Text style={styles.author}>{post.author}</Text>
                  <Text style={styles.time}>{post.time}</Text>
                </View>
              </View>
              <Text style={styles.body}>{post.body}</Text>
              <View style={styles.media}>
                <Ionicons name={mediaIcon[post.media]} size={28} color="#9CA3AF" />
              </View>
              <View style={styles.actions}>
                <Pressable onPress={() => toggleLike(post.id)} style={styles.action} hitSlop={8}>
                  <Ionicons
                    name={post.liked ? 'heart' : 'heart-outline'}
                    size={20}
                    color={post.liked ? colors.accent : colors.text}
                  />
                  <Text style={styles.count}>{post.likes}</Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate('Comments', { postId: post.id })}
                  style={styles.action}
                  hitSlop={8}
                >
                  <Ionicons name="chatbubble-outline" size={18} color={colors.text} />
                  <Text style={styles.count}>{post.comments.length}</Text>
                </Pressable>
              </View>
            </Card>
          ))}
        </ScrollView>
        <Pressable
          style={styles.fab}
          onPress={() => navigation.navigate('Compose')}
          accessibilityLabel="Create post"
        >
          <Ionicons name="add" size={28} color={colors.white} />
        </Pressable>
      </AppChrome>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: 96 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  chips: { gap: 12, paddingBottom: spacing.md },
  chip: {
    width: 88,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: 12,
    alignItems: 'center',
  },
  chipActive: { borderColor: colors.accent },
  chipIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  chipLines: { width: '100%', gap: 6 },
  line: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3 },
  lineShort: { width: '70%' },
  post: { marginBottom: spacing.md },
  postHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E5E7EB' },
  author: { fontWeight: '700', color: colors.text },
  time: { color: colors.textSecondary, fontSize: 12 },
  body: { color: colors.text, lineHeight: 20, marginBottom: 10 },
  media: {
    height: 160,
    borderRadius: radius.md,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: { flexDirection: 'row', gap: 18, marginTop: 10 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 44 },
  count: { color: colors.textSecondary, fontWeight: '600' },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
