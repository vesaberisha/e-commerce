const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const addImageUrlColumn = async () => {
    try {
        console.log('Adding image_url column to products table...');
        await pool.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;');
        console.log('Successfully added image_url column.');
    } catch (error) {
        console.error('Error adding column:', error);
    } finally {
        await pool.end();
    }
};

addImageUrlColumn();
