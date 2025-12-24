import express from 'express'; 
import cors from 'cors'; 
import { taskRoutes } from './modules/task/routes'; 
import { errorHandler } from './core/errors'; 
import helmet from 'helmet'; 
import rateLimit from 'express-rate-limit'; 

const app = express(); 
app.use(helmet()) 
app.use(cors()); 
app.use(express.json()); 
app.use(errorHandler) 

app.use('/tasks', taskRoutes); 
app.use( 
    rateLimit({ 
        windowMs: 15 * 60 * 1000, 
        max: 100 }) 
) 
    
export default app;