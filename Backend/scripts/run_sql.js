#!/usr/bin/env node

// Ejecuta scripts SQL usando el driver 'pg'.
// 1) Crea la base de datos si no existe
// 2) Aplica el archivo scripts/init_auth.sql en english_learn_db

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const DB_HOST = process.env.DATABASE_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DATABASE_PORT || '5432', 10);
const DB_USER = process.env.DATABASE_USERNAME || 'postgres';
const DB_PASS = process.env.DATABASE_PASSWORD || 'password';
const DB_NAME = process.env.DATABASE_NAME || 'english_learn_db';

async function ensureDatabaseExists() {
  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: 'postgres',
  });
  await client.connect();
  try {
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );
    if (res.rowCount === 0) {
      console.log(`Creando base de datos '${DB_NAME}'...`);
      await client.query(`CREATE DATABASE ${DB_NAME};`);
      console.log('Base de datos creada.');
    } else {
      console.log(`La base de datos '${DB_NAME}' ya existe.`);
    }
  } finally {
    await client.end();
  }
}

async function runSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  });
  await client.connect();
  try {
    console.log(`Ejecutando SQL desde: ${filePath}`);
    await client.query(sql);
    console.log('SQL ejecutado exitosamente.');
  } finally {
    await client.end();
  }
}

(async () => {
  try {
    await ensureDatabaseExists();
    const sqlPath = path.join(__dirname, 'init_auth.sql');
    await runSqlFile(sqlPath);
    console.log('Inicialización de esquema y roles completada.');
    process.exit(0);
  } catch (err) {
    console.error('Error ejecutando script SQL:', err.message);
    process.exit(1);
  }
})();