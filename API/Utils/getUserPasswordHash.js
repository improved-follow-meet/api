import pool from "../database.js";


/** 
    assume that username is exist and unique
*/ 
export default async function getUserPasswordHash(username) {
    const [rows, fields] = await pool.query(`SELECT passwordHash FROM users WHERE username = '${username}' and deletedAt is null`);
    if (rows.length == 0) {
        throw new Error("User is not exist");
    }
    if (rows.length > 1) {
        throw new Error("Database error");
    }
    return rows[0].passwordHash;
}