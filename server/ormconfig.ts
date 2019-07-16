import { ConnectionOptions } from 'typeorm';
import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve('.env') });

export const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/entities/*{.ts,.js}'],
};
