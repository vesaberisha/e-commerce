const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const seedAdmin = async () => {
    try {
        const email = 'admin@example.com';
        const password = 'password123';
        const username = 'AdminUser';
        const role = 'admin';

        // Check if user exists
        const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userRes.rows.length > 0) {
            console.log('Admin user already exists.');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)',
            [username, email, hashedPassword, role]
        );

        console.log(`Admin user created: ${email} / ${password}`);
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await pool.end();
    }
};

seedAdmin();
