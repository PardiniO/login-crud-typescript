"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.connection = connection;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_HOST = 'localhost', DB_PORT = 3308, DB_USER = 'root', DB_PASSWORD = '', DB_NAME = 'login_dob' } = process.env;
exports.pool = promise_1.default.createPool({
    host: DB_HOST,
    port: Number(DB_PORT ?? 3306),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});
async function connection() {
    const conn = await exports.pool.getConnection();
    try {
        await conn.ping();
        console.log('Conección a MySQL OK');
    }
    finally {
        conn.release();
    }
}
//# sourceMappingURL=db.js.map