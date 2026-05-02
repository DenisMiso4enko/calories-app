import MealItem from '@/components/MealItem';
import { globalStyles } from '@/styles/global';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useMeals } from '@/hooks/useMeals';

export default function AllMealsScreen() {
  const { meals, deleteMeal, deleteAllMeals, refetch } = useMeals();

  const handleClearAll = async () => {
    await deleteAllMeals();
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Все приёмы пищи</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButton}>Очистить всё</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30 }}>
        {meals.length === 0 ? (
          <Text style={globalStyles.empty}>Пока нет записей о приёмах пищи.</Text>
        ) : (
          meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              onDelete={refetch}
              deleteMeal={deleteMeal}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = {
  clearButton: {
    color: 'red',
    fontSize: 16,
  },
};
