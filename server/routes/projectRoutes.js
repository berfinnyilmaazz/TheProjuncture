import express from 'express';
import { createProject, getAllProjects, getProjectById, getMyProjects, getAssignableUsers } from '../controllers/projectController.js';
import { protectRoute } from '../middlewares/authMiddlewave.js';
import { requestJoinProject, approveJoinRequest } from '../controllers/projectController.js';
import { getPendingRequests, rejectJoinRequest } from "../controllers/projectController.js";

const router = express.Router();

router.post('/', protectRoute, createProject);
router.get('/', getAllProjects);
router.get('/mine', protectRoute, getMyProjects);
router.get('/:id', getProjectById);

router.post('/join/:id', protectRoute, requestJoinProject);
router.put('/join/approve/:id', protectRoute, approveJoinRequest);

router.get('/join/pending/:id', protectRoute, getPendingRequests);
router.put('/join/reject/:id', protectRoute, rejectJoinRequest);
router.get('/:id/assignable-users', protectRoute, getAssignableUsers);


export default router;
