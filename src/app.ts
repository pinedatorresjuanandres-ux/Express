import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/index';
import { requestLogger } from './middlewares/logger.middleware';
import { globalErrorHandler } from './middlewares/errorHandler.middleware';
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/v1', routes);

// Health Check Endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'ControlLabs API operando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta solo de desarrollo para comprobar el 500 del manejador global
if (process.env.NODE_ENV !== 'production') {
  app.get('/__test/error', (_req: Request, _res: Response, next: NextFunction) => {
    next(new Error('Error de prueba'));
  });
}

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Ruta no encontrada.' });
});

app.use(globalErrorHandler);

export default app;