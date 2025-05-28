import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => ({
  // Port de l'application
  PORT:  3000,

  // Paramètres de la base de données
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 3306,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD:  process.env.DB_PASSWORD || 'root',
  DB_NAME: process.env.DB_NAME || 'startup',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES || '1h',
}));
