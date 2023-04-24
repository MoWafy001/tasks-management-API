import mysql from 'mysql2/promise';
import { DataSource } from 'typeorm';
import { User } from '../db/entity/User';
import { Task } from '../db/entity/Task';
import { Category } from '../db/entity/Category';

export const TEST_DB_OPTIONS = {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: (process.env.TEST_DB_PORT && Number(process.env.TEST_DB_PORT)) || 3306,
    username: process.env.TEST_DB_USERNAME || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
};

export const generateTestDBName = () => {
    return (process.env.TEST_DB_NAME || 'test_db') + '_' + Date.now();
};

export const createTestDB = async (TEST_DB_NAME: string) => {
    // Create a connection to the MySQL server without specifying a database
    const connection = await mysql.createConnection({
        host: TEST_DB_OPTIONS.host,
        port: TEST_DB_OPTIONS.port,
        user: TEST_DB_OPTIONS.username,
        password: TEST_DB_OPTIONS.password,
    });

    // Create a new database for testing
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${TEST_DB_NAME}`);
    console.log(`Created database ${TEST_DB_NAME}`);

    // Close the connection to the MySQL server
    await connection.end();
};

export const dropTestDB = async (TEST_DB_NAME: string) => {
    // Create a new connection to the MySQL server without specifying a database
    const connection = await mysql.createConnection({
        host: TEST_DB_OPTIONS.host,
        port: TEST_DB_OPTIONS.port,
        user: TEST_DB_OPTIONS.username,
        password: TEST_DB_OPTIONS.password,
    });

    // Drop the temporary database
    await connection.query(`DROP DATABASE IF EXISTS ${TEST_DB_NAME}`);
    console.log(`Dropped database ${TEST_DB_NAME}`);

    // Close the connection to the MySQL server
    await connection.end();
};

export const createDataSource = (TEST_DB_NAME: string) =>
    new DataSource({
        type: 'mysql',
        host: TEST_DB_OPTIONS.host,
        port: TEST_DB_OPTIONS.port,
        username: TEST_DB_OPTIONS.username,
        password: TEST_DB_OPTIONS.password,
        database: TEST_DB_NAME,
        synchronize: true,
        logging: false,
        entities: [User, Task, Category],
    });
