const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const https = require('https');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Helper to fetch JSON
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

const seed = async () => {
    try {
        console.log('Fetching products from FakeStoreAPI...');
        const products = await fetchJson('https://fakestoreapi.com/products');

        console.log(`Fetched ${products.length} products.`);

        for (const product of products) {
            // 1. Handle Category
            let categoryId;
            const categoryRes = await pool.query('SELECT id FROM categories WHERE name = $1', [product.category]);

            if (categoryRes.rows.length > 0) {
                categoryId = categoryRes.rows[0].id;
            } else {
                const newCat = await pool.query(
                    'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id',
                    [product.category, `Category for ${product.category}`]
                );
                categoryId = newCat.rows[0].id;
                console.log(`Created category: ${product.category}`);
            }

            // 2. Insert Product
            const productRes = await pool.query('SELECT id FROM products WHERE name = $1', [product.title]);
            if (productRes.rows.length === 0) {
                await pool.query(
                    'INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
                    [product.title, product.description, product.price, Math.floor(Math.random() * 100) + 1, categoryId, product.image]
                );
                console.log(`Inserted product: ${product.title}`);
            } else {
                // Update image_url if missing
                await pool.query(
                    'UPDATE products SET image_url = $1 WHERE name = $2 AND (image_url IS NULL OR image_url = \'\')',
                    [product.image, product.title]
                );
                console.log(`Updated existing product image: ${product.title}`);
            }
        }

        console.log('Seeding completed successfully.');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await pool.end();
    }
};

seed();
