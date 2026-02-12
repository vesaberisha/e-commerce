const http = require('http');
const crypto = require('crypto');

const randomString = () => crypto.randomBytes(4).toString('hex');
const email = `testuser_${randomString()}@example.com`;
const password = 'password123';
const username = `TestUser_${randomString()}`;

function request(options, body) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });

        req.on('error', (e) => reject(e));

        if (body) {
            req.write(body);
        }
        req.end();
    });
}

async function verify() {
    try {
        console.log(`1. Registering user: ${email}`);
        const registerBody = JSON.stringify({ username, email, password });
        const registerRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(registerBody)
            }
        }, registerBody);

        if (registerRes.statusCode !== 201) {
            throw new Error(`Registration failed: ${registerRes.statusCode} ${registerRes.body}`);
        }
        console.log('Registration successful');

        console.log('2. Logging in...');
        const loginBody = JSON.stringify({ email, password });
        const loginRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(loginBody)
            }
        }, loginBody);

        if (loginRes.statusCode !== 200) {
            throw new Error(`Login failed: ${loginRes.statusCode} ${loginRes.body}`);
        }

        const loginData = JSON.parse(loginRes.body);
        const token = loginData.accessToken;
        console.log('Login successful, token received');

        console.log('3. Fetching profile (/me)...');
        const meRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/me',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (meRes.statusCode !== 200) {
            throw new Error(`Fetch profile failed: ${meRes.statusCode} ${meRes.body}`);
        }

        const profile = JSON.parse(meRes.body);
        console.log('Profile fetched successfully:');
        console.log(JSON.stringify(profile, null, 2));

        if (profile.email === email && profile.username === username) {
            console.log('VERIFICATION PASSED!');
        } else {
            console.error('VERIFICATION FAILED: Profile data mismatch');
            process.exit(1);
        }

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

verify();
