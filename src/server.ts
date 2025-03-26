import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string) || 5000;
const HOST: string = process.env.HOST as string || '127.0.0.1';

async function server(): Promise<void> {
    try {
        await app.listen({
            port: PORT,
            host: HOST
        });

        app.log.info(`🚀 server is running on http://${HOST}:${PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

server();

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello World' });
});
