import Project from '../models/project.js';

export const createProject = async (req, res) => {
  try {
    const { title, image, category, description, teamSize, mentorship, requiredSkills } = req.body;

    const newProject = new Project({
      owner: req.user.userId,
      title,
      image,
      category,
      description,
      teamSize,
      mentorship,
      requiredSkills,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  const projects = await Project.find().populate('owner', 'name title');
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('owner', 'name title');
  if (!project) return res.status(404).json({ message: 'Proje bulunamadı' });
  res.json(project);
};

export const getMyProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user.userId });
  res.json(projects);
};
