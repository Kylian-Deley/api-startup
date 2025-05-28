import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  // Port de l'application
  PORT:  3000,

  // Paramètres de la base de données
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 3306,
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD:  process.env.DB_PASSWORD || 'root',
  DB_DATABASE: process.env.DB_DATABASE || 'startup',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '3600s',
}));
