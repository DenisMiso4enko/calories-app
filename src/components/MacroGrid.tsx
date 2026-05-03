import { StyleSheet, View } from 'react-native';
import { Meal } from '@/hooks/useMeals';
import MacroCard from './MacroCard';

type MacroGridProps = {
  meals: Meal[];
};

export default function MacroGrid({ meals }: MacroGridProps) {
  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  return (
    <View style={styles.grid}>
      <MacroCard
        label='Калории'
        value={`${totals.calories}`}
        goal='2,000'
        color='#ff6b6b'
      />
      <MacroCard
        label='Белки'
        value={`${totals.protein} г`}
        goal='150 г'
        color='#4ecdc4'
      />
      <MacroCard
        label='Углеводы'
        value={`${totals.carbs} г`}
        goal='250 г'
        color='#ffd93d'
      />
      <MacroCard
        label='Жиры'
        value={`${totals.fat} г`}
        goal='65 г'
        color='#6bcb77'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});