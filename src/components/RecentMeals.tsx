import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Meal } from '@/hooks/useMeals';
import MealItem from './MealItem';
import { AppColors, useAppTheme } from '@/styles/global';

type RecentMealsProps = {
  meals: Meal[];
  onDelete: () => void;
  deleteMeal: (id: string) => Promise<void>;
};

export default function RecentMeals({ meals, onDelete, deleteMeal }: RecentMealsProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.sectionTitle}>Недавние приёмы пищи</Text>
      {meals.length === 0 ? (
        <Text style={styles.empty}>Пока нет записей о приёмах пищи.</Text>
      ) : (
        meals
          .slice(0, 5)
          .map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              deleteMeal={deleteMeal}
              onDelete={onDelete}
            />
          ))
      )}
    </View>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
