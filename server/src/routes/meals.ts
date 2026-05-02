import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

// GET /meals — получить все meals пользователя
router.get('/', async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const meals = await prisma.meal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  res.json(meals);
});

// POST /meals — добавить meal
router.post('/', async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const { name, calories, protein, carbs, fat } = req.body;

  const meal = await prisma.meal.create({
    data: { userId, name, calories, protein, carbs, fat },
  });

  res.json(meal);
});

// DELETE /meals/:id — удалить один meal
router.delete('/:id', async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  const { id } = req.params;

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  // проверяем что meal принадлежит этому пользователю
  const meal = await prisma.meal.findFirst({ where: { id: String(id), userId } });

  if (!meal) {
    res.status(404).json({ error: 'Meal not found' });
    return;
  }

  await prisma.meal.delete({ where: { id: String(id) } });
  res.json({ success: true });
});

// DELETE /meals — удалить все meals пользователя
router.delete('/', async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  await prisma.meal.deleteMany({ where: { userId } });
  res.json({ success: true });
});

export default router;
