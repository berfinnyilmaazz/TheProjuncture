import Project from '../models/project.js';
import Notice from "../models/notification.js"; // en üste
import User from "../models/user.js";


export const createProject = async (req, res) => {
  try {
    const { title, image, category, description, teamSize, mentorship, requiredSkills } = req.body;

    const newProject = new Project({
      owner: req.user.userId,
      members: [req.user.userId],
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
  const project = await Project.findById(req.params.id)
  .populate('owner', 'name title')
  .populate('members', 'name title');

  if (!project) return res.status(404).json({ message: 'Proje bulunamadı' });
  res.json(project);
};

export const getMyProjects = async (req, res) => {
  const published = await Project.find({ owner: req.user.userId })
    .populate("members", "name title")
    .populate("owner", "name title");

  const joined = await Project.find({
    members: req.user.userId,
    owner: { $ne: req.user.userId } // kendi yayınladıkları hariç!
  })
    .populate("members", "name title")
    .populate("owner", "name title");

  const allProjects = [...published, ...joined];

  res.json(allProjects);
};

export const requestJoinProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    console.log("🔥 JOIN REQUEST STARTED");
    console.log("userId:", userId);

    const project = await Project.findById(id);
    const sender = await User.findById(userId);

    if (!project) return res.status(400).json({ message: "Proje bulunamadı" });
    if (!sender) return res.status(400).json({ message: "Kullanıcı bulunamadı" });

    console.log("📌 Project:", project.title);
    console.log("📌 Sender:", sender.name);

    if (project.owner.equals(userId)) {
      return res.status(400).json({ message: "Kendi projenize katılamazsınız" });
    }

    if (
      project.members.includes(userId) ||
      project.pendingJoinRequests.includes(userId)
    ) {
      return res.status(400).json({ message: "Zaten üyesiniz veya istek gönderdiniz." });
    }

    // Devam eden katılım
    project.pendingJoinRequests.push(userId);
    await project.save();

    await Notice.create({
      team: [project.owner],
      senderId: userId,
      projectId: project._id,
      text: `📥 ${sender.name} adlı kullanıcı "${project.title}" projenize katılmak istiyor.`,
      notiType: "join_request",
    });

    console.log("✅ JOIN REQUEST SUCCESS");
    res.status(200).json({ message: "Katılım isteği gönderildi" });
  } catch (error) {
    console.error("❌ Katılım hatası:", error.message);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

export const approveJoinRequest = async (req, res) => {
  const project = await Project.findById(req.params.id);
  const { userId } = req.body;

  if (!project) return res.status(404).json({ message: "Proje bulunamadı" });

  // Sadece proje sahibi onaylayabilir
  if (!project.owner.equals(req.user.userId)) {
    return res.status(403).json({ message: "Yetkisiz işlem" });
  }

  if (!project.pendingJoinRequests.includes(userId)) {
    return res.status(400).json({ message: "Böyle bir istek yok" });
  }

  project.members.push(userId);
  project.pendingJoinRequests = project.pendingJoinRequests.filter(id => id.toString() !== userId);
  await project.save();

  const approvedUser = await User.findById(userId);

  await Notice.create({
    team: [approvedUser._id], // katılan kullanıcıya gitsin
    text: `✅ "${project.title}" adlı projeye katılım isteğiniz onaylandı.`,
    notiType: "message",
  });

  // Buraya notification gönderimi
  res.json({ message: "Kullanıcı eklendi" });
};

export const getPendingRequests = async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("pendingJoinRequests", "name title");

  if (!project) return res.status(404).json({ message: "Proje bulunamadı" });

  // sadece proje sahibi görebilir
  if (!project.owner.equals(req.user.userId)) {
    return res.status(403).json({ message: "Yetkisiz işlem" });
  }

  res.json(project.pendingJoinRequests);
};

export const rejectJoinRequest = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const userId = req.body.userId;

    if (!project) return res.status(404).json({ message: "Proje bulunamadı" });

    // İstek varsa kaldır
    project.pendingJoinRequests = project.pendingJoinRequests.filter(
      (id) => id.toString() !== userId
    );

    await project.save();

    const sender = await User.findById(userId);

    await Notice.create({
      team: [userId], // Bildirim direkt user’a gidecek
      text: `❌ "${project.title}" projesine yaptığınız katılım isteği reddedildi.`,
      notiType: "info", // yeni tip tanımlayabiliriz: "rejected"
      senderId: req.user.userId, // proje sahibi
      projectId: project._id,
    });

    res.json({ message: "İstek reddedildi" });
  } catch (error) {
    console.error("❌ Reddetme hatası:", error.message);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
};

export const getAssignableUsers = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('owner members', 'name title');

  if (!project) return res.status(404).json({ message: 'Project not found' });

  const users = [project.owner, ...project.members];
  res.json(users);
};



