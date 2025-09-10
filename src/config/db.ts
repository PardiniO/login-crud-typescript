import { Pool } from "mysql2/promise";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = mysql.createPool ({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

export async function select<T extends RowDataPacket[]>(
    sql: string,
    params: Array<string | number | Date | null> = []
): Promise<T> {
    const [rows] = await pool.execute<RowDataPacket[]>(sql, params);
    return rows as T;
}

export async function execute(
    sql:string,
    params:Array<string | number | Date | null> = []
): Promise<ResultSetHeader> {
    const [result] = await pool.execute<ResultSetHeader>(sql, params);
    return result;
}

export default pool;