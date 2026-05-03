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

  const fetchMeals = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_URL}/meals`, {
        headers: { 'x-user-id': userId },
      });
      const data = await res.json();
      setMeals(data);
    } catch {
      // Keep the current list visible if a background refresh fails.
    }
  }, [userId]);

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
    } catch {
      // The add screen currently has no error UI, so leave existing state unchanged.
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
      throw e;
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMeals();
    }, [fetchMeals])
  );

  return { meals, addMeal, refetch: fetchMeals, deleteMeal, deleteAllMeals };
}
