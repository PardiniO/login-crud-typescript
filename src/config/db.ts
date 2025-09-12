import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const {
    DB_HOST = 'localhost',
    DB_PORT = 3308,
    DB_USER = 'root',
    DB_PASSWORD = '',
    DB_NAME = 'login_dob'
} = process.env;

export const pool = mysql.createPool ({
    host: DB_HOST,
    port: Number(DB_PORT ?? 3306),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

export async function connection(): Promise<void> {
    const conn = await pool.getConnection();
    try {
        await conn.ping();
        console.log('Conección a MySQL OK');
    } finally {
        conn.release();
    }
}