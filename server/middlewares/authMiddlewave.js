import jwt from "jsonwebtoken"
import User from "../models/user.js"
import Project from "../models/project.js";

const protectRoute = async(req, res, next) => {
    try{
        let token = req.cookies?.token;

        if(token){
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            const resp = await User.findById(decodedToken.userId).select(
                "isAdmin email"
            );

            req.user = {
                email: resp.email,
                isAdmin:resp.isAdmin,
                userId: decodedToken.userId,
            };

            next();
        }else {
            return res
            .status(401)
            .json({ status: false, message: "Not authorized. Try login again"});
        }
    } catch(error) {
        console.error(error);
        return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again"});
    }
};

const isAdminRoute = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({
            status: false,
            message: "Not authorized as admin. Try login as admin."
        });
    }
};

const isProjectMemberOrOwner = async (req, res, next) => {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: "projectId is required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const userId = req.user.userId;

    const isOwner = project.owner.toString() === userId;
    const isMember = project.members.map(id => id.toString()).includes(userId);

    if (isOwner || isMember) {
      next();
    } else {
      return res.status(403).json({ message: "Only project owner or members can create tasks." });
    }
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ message: "Server error during authorization check." });
  }
};

export { isAdminRoute, protectRoute, isProjectMemberOrOwner };