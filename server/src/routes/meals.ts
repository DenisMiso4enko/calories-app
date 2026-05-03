import { Router } from 'express';
import {
  createMeal,
  deleteAllMeals,
  deleteMeal,
  getMeals,
} from '../controllers/mealsController';

const router = Router();

router.get('/', getMeals);
router.post('/', createMeal);
router.delete('/:id', deleteMeal);
router.delete('/', deleteAllMeals);

export default router;
