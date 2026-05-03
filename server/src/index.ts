import express from 'express';
import cors from 'cors';
import healthRouter from './routes/health';
import mealsRouter from './routes/meals';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/', healthRouter);
app.use('/meals', mealsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
