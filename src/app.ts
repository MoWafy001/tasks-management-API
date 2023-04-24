import express from 'express';
import mainRouter from './routes';
import { applyMiddlewaresPost, applyMiddlewaresPre } from './middlewares';

// Initialize express app
const app = express();
app.use(express.json());
applyMiddlewaresPre(app);
app.use('/', mainRouter);
applyMiddlewaresPost(app);

export default app;