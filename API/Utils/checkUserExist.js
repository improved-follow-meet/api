import pool from "../database.js";

export default async function checkUserExist(username) {
    const [rows, fields] = await pool.query(`SELECT * FROM users WHERE username = '${username}' and deletedAt is null`);
    if (rows.length === 0) throw new Error("User does not exist");
}