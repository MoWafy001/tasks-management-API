import app from './app';
import config from './config';
import AppDataSource from './db/data-source';

const main = async () => {
    // Initialize database
    console.log('Initializing database...');
    await AppDataSource.initialize().catch((err) => {
        console.error('Failed to initialize database');
        console.error(err);
        process.exit(1);
    });
    console.log('Database initialized');

    // Start server
    app.listen(config.port, () => {
        console.log(`Server is listening on port ${config.port}`);
    });
};

main().catch(console.error);
