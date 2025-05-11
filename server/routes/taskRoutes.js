import express from "express";
import { isAdminRoute, protectRoute, isProjectMemberOrOwner } from "../middlewares/authMiddlewave.js";
import { createSubTask, createTask, dashboardStatistics, deleteRestoreTask, duplicateTask, getTask, getTasks, postTaskActivity, trashTask, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", protectRoute, isProjectMemberOrOwner, createTask);
router.post("/duplicate/:id", protectRoute, isProjectMemberOrOwner, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics); 
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

router.put("/create-subtask/:id", protectRoute, isProjectMemberOrOwner, createSubTask);
router.put("/update/:id", protectRoute, isProjectMemberOrOwner, updateTask);
router.put("/:id", protectRoute, isProjectMemberOrOwner, trashTask);

router.delete(
    "/delete-restore/:id?", 
    protectRoute,
    isProjectMemberOrOwner,
    deleteRestoreTask
);


export default router;