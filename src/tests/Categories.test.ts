import request from 'supertest';
import app from '../app';
import { createDataSource, createTestDB, dropTestDB, generateTestDBName } from './common';
import { User } from '../db/entity/User';
import { hashPassword } from '../helpers';
import { signJWT } from '../services/auth/jwt';
require('dotenv').config();

const TEST_DB_NAME = generateTestDBName();

describe('Categories Controller', () => {
    const db = createDataSource(TEST_DB_NAME);
    let token: string;

    beforeAll(async () => {
        await createTestDB(TEST_DB_NAME);
        await db.initialize();

        // create test user
        const user = new User();
        user.name = 'Jims';
        user.email = 'Jims@gmail.com';
        user.password = hashPassword('Minombre3sJ!ms');
        await user.save();

        // login
        token = `Bearer ${signJWT(user)}`;
    });

    afterAll(async () => {
        await db.destroy();
        await dropTestDB(TEST_DB_NAME);
    });

    // CRUD tests
    describe('POST /categories', () => {
        test('Create category without token', async () => {
            const response = await request(app)
                .post('/categories')
                .send({
                    name: 'Test Category',
                })
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('status');
            expect(response.body.data).toHaveProperty('message');
        });

        test('Create category', async () => {
            const response = await request(app)
                .post('/categories')
                .set('Authorization', token)
                .send({
                    name: 'Test Category',
                })
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data).toHaveProperty('name');
            expect(response.body.data.name).toBe('Test Category');
        });

        test('Create category with a missing name', async () => {
            const response = await request(app)
                .post('/categories')
                .set('Authorization', token)
                .send({})
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('status');
            expect(response.body.data).toHaveProperty('message');
            expect(response.body.data.message).toHaveProperty('errors');
        });

        test('Get all categories', async () => {
            const response = await request(app)
                .get('/categories')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveLength(1);
        });

        test('Get category by id', async () => {
            const response = await request(app)
                .get('/categories/1')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data).toHaveProperty('name');
            expect(response.body.data.name).toBe('Test Category');
        });

        test('Update category', async () => {
            const response = await request(app)
                .patch('/categories/1')
                .set('Authorization', token)
                .send({
                    name: 'Updated Category',
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data).toHaveProperty('name');
            expect(response.body.data.name).toBe('Updated Category');
        });

        test('Delete category', async () => {
            const response = await request(app)
                .delete('/categories/1')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data.affected).toBe(1);
        });
    });
});
