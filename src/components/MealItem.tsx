import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

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
  const handleLongPress = () => {
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
  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.macros}>
        {calories} ккал • белки {protein} г • углеводы {carbs} г • жиры {fat} г
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  macros: {
    fontSize: 13,
    color: '#a0a0b0',
    marginTop: 4,
  },
});
