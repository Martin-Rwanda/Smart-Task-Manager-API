import app from './app'; 
import { Database, env } from './config'; 
import { logger } from './core/logging'; 

const server = app.listen(env.port, () => { 
    logger.info(`Server running on port ${env.port}`); 
}); 
process.on("SIGTERM", async () => { 
    logger.info("SINGTERM received. shutting down gracefully..."); 
    await Database.getInstance().getPool().end(); 
    server.close(() => { process.exit(0); }) 
})