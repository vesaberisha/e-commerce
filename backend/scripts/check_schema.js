const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const checkSchema = async () => {
    try {
        const res = await pool.query(`
      SELECT column_name, data_type, character_maximum_length 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'password';
    `);
        console.log('PASSWORD COLUMN SCHEMA:');
        console.log(JSON.stringify(res.rows, null, 2));

        const users = await pool.query("SELECT email, length(password) as len, substring(password from 1 for 10) as start FROM users");
        console.log('USER PASSWORDS:');
        console.log(JSON.stringify(users.rows, null, 2));

    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
};

checkSchema();
