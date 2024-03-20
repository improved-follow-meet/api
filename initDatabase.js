import pool from "./API/database.js";
import fs from "fs";

export default async function initDatabase() {
	fs.readFile("initDatabase.sql", "utf8", async function (err, data) {
		if (err) throw err;
		try {
			await pool.query(data);
		} catch (err) {
			throw err;
		}
	});
}
