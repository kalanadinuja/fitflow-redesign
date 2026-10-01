import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppChrome } from '../../components/AppChrome';
import { Card } from '../../components/Card';
import { PrimaryButton } from '../../components/PrimaryButton';
import { mockRecognizedMeal } from '../../data/mock';
import { useApp } from '../../context/AppContext';
import { colors, radius, spacing } from '../../theme';
import type { FoodStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<FoodStackParamList, 'LogMeal'>;

export function LogMealScreen({ navigation }: Props) {
  const { addMeal } = useApp();
  const [uri, setUri] = useState<string | null>(null);
  const [recognized, setRecognized] = useState(false);

  const pick = async (fromCamera: boolean) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Allow camera or photos to try meal logging in this prototype.');
      return;
    }
    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 0.4 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 0.4 });
    if (result.canceled) return;
    setUri(result.assets[0]?.uri ?? null);
    setRecognized(true);
  };

  const useSample = () => {
    setUri(null);
    setRecognized(true);
  };

  return (
    <View style={styles.screen}>
      <AppChrome title="Log meal">
        <View style={styles.body}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.note}>
            Simulated food recognition for this university prototype. No computer-vision model is
            running.
          </Text>
          {uri ? <Image source={{ uri }} style={styles.preview} /> : <View style={styles.placeholder} />}
          <View style={styles.row}>
            <PrimaryButton label="Camera" onPress={() => pick(true)} style={styles.half} />
            <PrimaryButton label="Gallery" onPress={() => pick(false)} style={styles.half} />
          </View>
          <Pressable onPress={useSample} style={styles.sample} accessibilityRole="button" accessibilityLabel="Use sample recognition">
            <Text style={styles.backText}>Use sample recognition</Text>
          </Pressable>
          {recognized ? (
            <Card>
              <Text style={styles.badge}>Mock result</Text>
              <Text style={styles.name}>{mockRecognizedMeal.name}</Text>
              <Text style={styles.meta}>
                {mockRecognizedMeal.kcal} kcal · P {mockRecognizedMeal.protein}g · C {mockRecognizedMeal.carbs}g · F{' '}
                {mockRecognizedMeal.fats}g
              </Text>
              <PrimaryButton
                label="Add to log"
                onPress={() => {
                  addMeal({
                    ...mockRecognizedMeal,
                    time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
                  });
                  navigation.goBack();
                }}
                style={{ marginTop: 12 }}
              />
            </Card>
          ) : null}
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
  note: { color: colors.textSecondary, lineHeight: 20 },
  preview: { width: '100%', height: 180, borderRadius: radius.md },
  placeholder: { height: 140, borderRadius: radius.md, backgroundColor: '#E5E7EB' },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  sample: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  badge: { color: colors.accent, fontWeight: '700', marginBottom: 6 },
  name: { fontSize: 18, fontWeight: '800', color: colors.text },
  meta: { color: colors.textSecondary, marginTop: 4 },
});
