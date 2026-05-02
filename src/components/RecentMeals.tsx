import { StyleSheet, Text, View } from 'react-native';
import { Meal } from '@/storage/meals';
import MealItem from './MealItem';

type RecentMealsProps = {
  meals: Meal[];
  onDelete: () => void;
  deleteMeal: (id: string) => Promise<void>;
};

export default function RecentMeals({ meals, onDelete, deleteMeal }: RecentMealsProps) {
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

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  empty: {
    color: '#a0a0b0',
    fontSize: 14,
  },
});
