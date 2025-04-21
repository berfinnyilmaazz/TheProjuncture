import express from 'express';
import { createProject, getAllProjects, getProjectById, getMyProjects } from '../controllers/projectController.js';
import { protectRoute } from '../middlewares/authMiddlewave.js';

const router = express.Router();

router.post('/', protectRoute, createProject);
router.get('/', getAllProjects);
router.get('/mine', protectRoute, getMyProjects);
router.get('/:id', getProjectById);

export default router;
