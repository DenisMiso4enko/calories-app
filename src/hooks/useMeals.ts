import { useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { API_URL } from '@/config/api';
import { useFocusEffect } from 'expo-router';

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
};

export function useMeals() {
  const { userId } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/meals`, {
        headers: { 'x-user-id': userId },
      });
      const data = await res.json();
      setMeals(data);
    } catch (e) {
      setError('Не удалось загрузить приёмы пищи');
    } finally {
      setLoading(false);
    }
  };

  const addMeal = async (meal: Omit<Meal, 'id' | 'createdAt'>) => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_URL}/meals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify(meal),
      });
      const newMeal = await res.json();
      setMeals((prev) => [newMeal, ...prev]);
    } catch (e) {
      setError('Не удалось добавить приём пищи');
    }
  };

  const deleteMeal = async (id: string) => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_URL}/meals/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': userId },
      });

      if (res.status === 404) {
        setMeals((prev) => prev.filter((m) => m.id !== id));
        return;
      }

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Не удалось удалить');
      }

      setMeals((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      setError('Не удалось удалить приём пищи');
      throw e;
    }
  };

  const deleteAllMeals = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_URL}/meals`, {
        method: 'DELETE',
        headers: { 'x-user-id': userId },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Не удалось удалить приёмы пищи');
      }

      setMeals([]);
    } catch (e) {
      setError('Не удалось удалить все приёмы пищи');
      throw e;
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMeals();
    }, [userId])
  );

  return { meals, loading, error, addMeal, refetch: fetchMeals, deleteMeal, deleteAllMeals };
}
