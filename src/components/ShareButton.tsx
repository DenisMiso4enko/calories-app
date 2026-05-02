import { Ionicons } from '@expo/vector-icons';
import { Share, TouchableOpacity } from 'react-native';
import { Meal } from '@/storage/meals';
import { colors } from '@/styles/global';

type ShareButtonProps = {
  meals: Meal[];
};

export default function ShareButton({ meals }: ShareButtonProps) {
  const handleShare = async () => {
    const totals = meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    await Share.share({
      message: `MacroZone: итоги дня\n\nКалории: ${totals.calories}\nБелки: ${totals.protein} г\nУглеводы: ${totals.carbs} г\nЖиры: ${totals.fat} г\n\nПриёмов пищи сегодня: ${meals.length}`,
    });
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}
