import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
<<<<<<< Updated upstream
=======
    host: '52.76.164.117',
    port: '6033',
    user: 'socialnetwork',
    password: 'database',
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    database: 'test',
    connectionLimit: 10,
    multipleStatements: true,
});

export default pool.promise();