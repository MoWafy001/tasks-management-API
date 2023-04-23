export interface ConfigInterface {
    port: number;
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    bcrypt: {
        saltRounds: number;
    };
    JWT: {
        secret: string;
        expiresIn: string;
    };
}
