import request from 'supertest';
import { User } from '../db/entity/User';
import app from '../app';
import { hashPassword } from '../helpers';
import { createDataSource, createTestDB, dropTestDB, generateTestDBName } from './common';
require('dotenv').config();

const TEST_DB_NAME = generateTestDBName();

describe('Authenticate and register', () => {
    const db = createDataSource(TEST_DB_NAME);

    beforeAll(async () => {
        await createTestDB(TEST_DB_NAME);
        await db.initialize();

        // create test user
        const user = new User();
        user.name = 'Jims';
        user.email = 'Jims@gmail.com';
        user.password = hashPassword('Minombre3sJ!ms');
        await user.save();
    });

    afterAll(async () => {
        await db.destroy();
        await dropTestDB(TEST_DB_NAME);
    });

    describe('Login', () => {
        test('Correct Login', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'Jims@gmail.com',
                    password: 'Minombre3sJ!ms',
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('token');
        });

        test('Incorrect Login', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'invalid@email.com',
                    password: 'invalidpassword',
                })
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('status');
            expect(response.body.data).toHaveProperty('message');
            expect(response.body.data.message).toBe('Invalid credentials');
        });
    });

    describe('Register', () => {
        test('Correct Register', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'newUser@gmail.com',
                    password: 'Minombre3sCoho#as',
                    name: 'New Cohonas',
                })
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id');
        });

        test('Incorrect Register', async () => {
            const response = await request(app)
                .post('/register')
                .send({
                    email: 'invalidemail.com',
                    password: 'invalidpassword',
                })
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('status');
            expect(response.body.data).toHaveProperty('message');
            expect(response.body.data.message).toHaveProperty('errors');
        });
    });
});
