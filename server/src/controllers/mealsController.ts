import { Request, Response } from 'express';
import prisma from '../prisma';

const getUserId = (req: Request) => req.headers['x-user-id'] as string | undefined;

export const getMeals = async (req: Request, res: Response) => {
  const userId = getUserId(req);

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const meals = await prisma.meal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  res.json(meals);
};

export const createMeal = async (req: Request, res: Response) => {
  const userId = getUserId(req);

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const { name, calories, protein, carbs, fat } = req.body;

  const meal = await prisma.meal.create({
    data: { userId, name, calories, protein, carbs, fat },
  });

  res.json(meal);
};

export const deleteMeal = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const id = String(req.params.id);

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const meal = await prisma.meal.findFirst({ where: { id, userId } });

  if (!meal) {
    res.status(404).json({ error: 'Meal not found' });
    return;
  }

  await prisma.meal.delete({ where: { id } });
  res.json({ success: true });
};

export const deleteAllMeals = async (req: Request, res: Response) => {
  const userId = getUserId(req);

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  await prisma.meal.deleteMany({ where: { userId } });
  res.json({ success: true });
};
