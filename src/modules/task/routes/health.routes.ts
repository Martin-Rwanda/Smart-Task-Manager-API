import { Router } from "express";

const healthRouter = Router();

healthRouter.get('/health', (req, res) => {
    res.json({ status: 'ok'})
})

export {healthRouter}