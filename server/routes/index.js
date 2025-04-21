import express from 'express';
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";
import projectRoutes from './projectRoutes.js';

const router = express.Router();

router.use("/user", userRoutes); //api/user/login
router.use("/task", taskRoutes);
router.use('/projects', projectRoutes);


// Define your routes here
router.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
});

export default router; 