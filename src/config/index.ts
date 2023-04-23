require('dotenv').config();
import { ConfigInterface } from './config.interface';

const config: ConfigInterface = {
    port: parseInt(process.env.PORT, 10),
    db: {
        // MySQL
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    bcrypt: {
        saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
};

export default config;
