import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: '52.76.164.117',
    port: '6033',
    user: 'socialnetwork',
    password: 'database',
    database: 'test',
    connectionLimit: 10,
    multipleStatements: true,
});

export default pool.promise();