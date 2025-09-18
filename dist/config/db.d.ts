import mysql from "mysql2/promise";
export declare const pool: mysql.Pool;
export declare function connection(): Promise<void>;
