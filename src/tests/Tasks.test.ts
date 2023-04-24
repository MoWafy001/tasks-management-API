import request from 'supertest';
import app from '../app';
import { createDataSource, createTestDB, dropTestDB, generateTestDBName } from './common';
import { User } from '../db/entity/User';
import { hashPassword } from '../helpers';
import { signJWT } from '../services/auth/jwt';
require('dotenv').config();

const TEST_DB_NAME = generateTestDBName();

describe('Tasks Controller', () => {
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
    describe('POST /tasks', () => {
        test('Create task without token', async () => {
            const response = await request(app)
                .post('/tasks')
                .send({
                    title: 'Test Task',
                })
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('status');
            expect(response.body.data).toHaveProperty('message');
        });

        test('Create task', async () => {
            const response = await request(app)
                .post('/tasks')
                .set('Authorization', token)
                .send({
                    title: 'Test Task',
                })
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.title).toBe('Test Task');
            expect(response.body.data.status).toBe('todo');
        });

        test('Create task with a missing title', async () => {
            const response = await request(app)
                .post('/tasks')
                .set('Authorization', token)
                .send({})
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('status');
            expect(response.body.data).toHaveProperty('message');
            expect(response.body.data.message).toHaveProperty('errors');
        });

        test('Get all tasks', async () => {
            const response = await request(app)
                .get('/tasks')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveLength(1);
        });

        test('Get task by id', async () => {
            const response = await request(app)
                .get('/tasks/1')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.title).toBe('Test Task');
        });

        test('Update task', async () => {
            const response = await request(app)
                .patch('/tasks/1')
                .set('Authorization', token)
                .send({
                    title: 'Updated Task',
                    status: 'done',
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.title).toBe('Updated Task');
            expect(response.body.data.status).toBe('done');
        });

        test('Delete task', async () => {
            const response = await request(app)
                .delete('/tasks/1')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data.affected).toBe(1);
        });
    });
});
