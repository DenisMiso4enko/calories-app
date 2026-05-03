import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Meal } from '@/hooks/useMeals';
import { AppColors, useAppTheme } from '@/styles/global';

type CopyButtonProps = {
  meals: Meal[];
};

export default function CopyButton({ meals }: CopyButtonProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleCopy = async () => {
    const totals = meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const summary = `MacroZone: итоги дня\n\nКалории: ${totals.calories}\nБелки: ${totals.protein} г\nУглеводы: ${totals.carbs} г\nЖиры: ${totals.fat} г\n\nПриёмов пищи сегодня: ${meals.length}`;

    await Clipboard.setStringAsync(summary);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Скопировано', 'Итоги по макроэлементам скопированы в буфер обмена.');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleCopy}>
      <Ionicons name="copy-outline" size={18} color={colors.primary} />
      <Text style={styles.text}>Скопировать итоги</Text>
    </TouchableOpacity>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
  },
});
