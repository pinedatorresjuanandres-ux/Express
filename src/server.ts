import 'dotenv/config';
import app from './app';
import { prisma } from './db/prisma';

const PORT = Number(process.env.PORT ?? 3000);

const describeStartupError = (error: unknown): string => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    return error.code;
  }
  return error instanceof Error ? error.message : 'Error desconocido';
};

const disconnect = (): void => {
  void prisma.$disconnect().catch((error: unknown) => {
    console.error('Error al cerrar la conexión de Prisma:', error);
    process.exitCode = 1;
  });
};

const startServer = async (): Promise<void> => {
  // Falla rápido si PostgreSQL no está disponible.
  await prisma.$connect();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor ControlLabs corriendo en http://localhost:${PORT}`);
  });

  server.once('error', (error: NodeJS.ErrnoException) => {
    console.error('No se pudo abrir el puerto HTTP:', error.code ?? error.name);
    process.exitCode = 1;
    disconnect();
  });

  let shuttingDown = false;
  const shutdown = (signal: string): void => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.info(`Señal ${signal}: cerrando servidor y conexión a PostgreSQL.`);
    server.close((error) => {
      if (error) {
        console.error('Error al cerrar el servidor HTTP:', error);
        process.exitCode = 1;
      }
      disconnect();
    });
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
};

void startServer().catch((error: unknown) => {
  console.error(
    'No se pudo iniciar ControlLabs o conectar con PostgreSQL. Revisa PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD en .env y que el servidor esté activo.',
    describeStartupError(error)
  );
  process.exitCode = 1;
  disconnect();
});
