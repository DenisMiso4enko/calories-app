import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { AppColors, useAppTheme } from '@/styles/global';

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  deleteMeal: (id: string) => Promise<void>;
  onDelete?: () => void;
};

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  deleteMeal,
  onDelete,
}: MealItemProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleDeletePress = () => {
    Alert.alert('Удалить приём пищи', `Вы уверены, что хотите удалить "${name}"?`, [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMeal(id);
            onDelete?.();
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Не удалось удалить приём пищи';
            Alert.alert('Ошибка удаления', message);
          }
        },
      },
    ]);
  };

  const renderRightActions = () => (
    <Pressable style={styles.deleteAction} onPress={handleDeletePress}>
      <Text style={styles.deleteText}>Удалить</Text>
    </Pressable>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.macros}>
          {calories} ккал • белки {protein} г • углеводы {carbs} г • жиры {fat} г
        </Text>
      </View>
    </Swipeable>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  container: {
    backgroundColor: colors.header,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  macros: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  deleteAction: {
    alignItems: 'center',
    backgroundColor: colors.alert,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 8,
    paddingHorizontal: 20,
  },
  deleteText: {
    color: colors.onAlert,
    fontSize: 14,
    fontWeight: '600',
  },
});
