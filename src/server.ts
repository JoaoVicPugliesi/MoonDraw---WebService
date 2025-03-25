import { app } from "./app";
import dotenv from 'dotenv';

dotenv.config();

async function server(): Promise<void> {
    try {
        const isListening: string = await app.listen({
            port: 8000
        });

        if (isListening) console.log(`🚀 server is running on http://localhost:8000`); 
    } catch (error) {
        console.log(error);
    }
}

server();

