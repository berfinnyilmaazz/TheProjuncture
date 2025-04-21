import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllProjectsQuery } from "../redux/slices/api/projectApiSlice";


export default function ProjectDetails() {
  const projects = [
    {
      name: "App Development",
      company: "Dropbox, Inc.",
      budget: "$2.500.000",
      startDate: "17 Jun, 2020",
      endDate: "04 Jul, 2020",
      description:
        "You need to develop an application on something like React Native, so that it is for Android and IOS...",
      checklist: [
        { task: "Create wireframes", done: true },
        { task: "UI/UX design development", done: true },
        { task: "Layout design", done: false },
      ],
      members: ["Jacob Hawkins", "Regina Cooper", "Jane Wilson", "Ronald Robertson"],
      type: "owned",
    },
    {
      name: "Website Redesign",
      company: "GitLab Inc.",
      budget: "$1.200.000",
      startDate: "01 Jan, 2021",
      endDate: "20 Jan, 2021",
      description: "Complete redesign of the website with a focus on modern design principles...",
      checklist: [
        { task: "Gather requirements", done: true },
        { task: "Design mockups", done: false },
        { task: "Develop frontend", done: false },
      ],
      members: ["Alice Brown", "Tom Hardy", "Sara White"],
      type: "joined",
    },
  ];

  const { data: allProjects = [], isLoading } = useGetAllProjectsQuery();

  const [currentProject, setCurrentProject] = useState(projects[0]);
  const navigate = useNavigate();

  const loadProject = (project) => {
    setCurrentProject(project);
  };

  const toggleTask = (index) => {
    const updatedChecklist = [...currentProject.checklist];
    updatedChecklist[index].done = !updatedChecklist[index].done;
    setCurrentProject({ ...currentProject, checklist: updatedChecklist });
  };

  const progressPercentage = Math.round(
    (currentProject.checklist.filter((task) => task.done).length /
      currentProject.checklist.length) *
      100
  );

  const ownedProjects = projects.filter((p) => p.type === "owned");
  const joinedProjects = projects.filter((p) => p.type === "joined");

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">Projeler</h3>

        {/* Yayınladığım */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">📢 Yayınladığım Projeler</h4>
          {isLoading ? (
          <p className="text-gray-600">Yükleniyor...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((proj) => (
              <div
                key={proj._id}
                className="p-3 mb-2 rounded cursor-pointer hover:bg-blue-100"
              >
                <h4 className="text-lg font-semibold text-gray-900">{proj.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{proj.description}</p>
              </div>
            ))}
          </div>
        )}
        </div>

        {/* Katıldığım */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">🤝 Katıldığım Projeler</h4>
          <ul>
            {joinedProjects.map((project, index) => (
              <li
                key={index}
                className={`p-3 mb-2 rounded cursor-pointer hover:bg-blue-100 ${
                  currentProject.name === project.name ? "bg-blue-200" : ""
                }`}
                onClick={() => loadProject(project)}
              >
                <h4 className="text-md font-bold">{project.name}</h4>
                <p className="text-sm text-gray-600">{project.company}</p>
                <span className="text-xs text-gray-500">{project.budget}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/4 px-6">
        <img
          src={currentProject.image || '/placeholder.jpg'}
          alt={currentProject.title}
          className="w-full h-40 object-cover rounded-t"
        />
        <h2 className="text-2xl font-bold mb-1">{currentProject.name}</h2>
        <p className="text-gray-600 mb-4">{currentProject.company}</p>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p><strong>Bütçe:</strong> {currentProject.budget}</p>
          <p><strong>Başlangıç:</strong> {currentProject.startDate}</p>
          <p><strong>Bitiş:</strong> {currentProject.endDate}</p>
        </div>
        <p className="mt-4 text-gray-800">{currentProject.description}</p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Checklist ({progressPercentage}%)
          </h3>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <ul className="space-y-2">
            {currentProject.checklist.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleTask(index)}
                  className="form-checkbox"
                />
                <span className={item.done ? "line-through text-gray-500" : ""}>
                  {item.task}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate("/task")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Kanban Board'a Git
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow overflow-y-auto">
        <h3 className="text-xl font-semibold text-blue-600">Durum</h3>
        <select className="mt-2 w-full border border-gray-300 rounded p-2">
          <option>Started</option>
          <option>On Hold</option>
          <option>Completed</option>
        </select>

        <h3 className="text-xl font-semibold mt-6 text-blue-600">Üyeler</h3>
        <ul className="mt-2 space-y-1 text-gray-700">
          {currentProject.members.map((member, index) => (
            <li key={index}>• {member}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
