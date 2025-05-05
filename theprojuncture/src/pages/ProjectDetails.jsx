import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllProjectsQuery } from "../redux/slices/api/projectApiSlice";
import { useSelector } from 'react-redux';
import { useGetMyProjectsQuery } from "../redux/slices/api/projectApiSlice";
import { useGetProjectByIdQuery } from "../redux/slices/api/projectApiSlice";


export default function ProjectDetails() {

  const userInfo = useSelector((state) => state.auth.user);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const { data: currentProject, isLoading: isProjectLoading } = useGetProjectByIdQuery(selectedProjectId, {
    skip: !selectedProjectId,
  });

  const { data: myProjects = [], isLoading } = useGetMyProjectsQuery();

  
  console.log("userInfo", userInfo);
console.log("myProjects", myProjects);


  const myPublishedProjects = userInfo?._id
  ? myProjects.filter((proj) =>
      typeof proj.owner === "object"
        ? proj.owner._id === userInfo._id
        : proj.owner === userInfo._id
    )
  : [];

  const joinedProjects = userInfo?._id
  ? myProjects.filter((proj) =>
      proj.members?.some((m) =>
        typeof m === "object"
          ? m._id?.toString() === userInfo._id
          : m === userInfo._id
      ) &&
      (typeof proj.owner === "object"
        ? proj.owner._id !== userInfo._id
        : proj.owner !== userInfo._id)
    )
  : [];


  console.log("Joined Projects:", joinedProjects);






    useEffect(() => {
      if (myPublishedProjects.length > 0 && !selectedProjectId) {
        setSelectedProjectId(myPublishedProjects[0]._id);
      }
    }, [myPublishedProjects]);
    
    

  useEffect(() => {
    if (!userInfo) return; // EKLENDİ
    console.log("Tüm Projelerim:", myProjects);
    console.log("Kullanıcı ID:", userInfo?._id);
  
    const published = myProjects.filter((proj) => proj.owner === userInfo?._id);
    console.log("Yayınladığım Projeler:", published);
  
    if (myProjects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(myProjects[0]._id);
    }
    
  }, [myProjects]);
  
  console.log("Tüm Projelerim:", myProjects);

  
  const navigate = useNavigate();

  const loadProject = (project) => {
    setSelectedProjectId(project._id);
  };
  


  if (!currentProject || isProjectLoading) return <p>Proje yükleniyor...</p>;

  if (!userInfo || !currentProject) {
    return <p>Veriler yükleniyor...</p>;
  }
  
  
  

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
          <div className="grid grid-cols-1 gap-6">
            {myPublishedProjects.map((project, index) => (
              <li
                key={project._id}
                className={`p-3 mb-2 rounded list-none cursor-pointer hover:bg-blue-100 ${
                  currentProject.name === project.name ? "bg-blue-200" : ""
                }`}
                onClick={() => loadProject(project)}
              >
                <h4 className="text-md font-bold">{project.title}</h4>
                {/* <p className="text-sm text-gray-600">{project.owner}</p>
                <span className="text-xs text-gray-500">{project.budget}</span> */}
              </li>
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
                key={project._id}
                className={`p-3 mb-2 rounded cursor-pointer hover:bg-blue-100 ${
                  currentProject.name === project.name ? "bg-blue-200" : ""
                }`}
                onClick={() => loadProject(project)}
              >
                <h4 className="text-md font-bold">{project.title}</h4>
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
        <h2 className="text-2xl font-bold mb-1">{currentProject.title}</h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p><strong>Başlangıç:</strong> {currentProject.startDate}</p>
          <p><strong>Bitiş:</strong> {currentProject.endDate}</p>
        </div>
        <p className="mt-4 text-gray-800">{currentProject.description}</p>


        <div className="mt-6">
          <button
            onClick={() => navigate(`/project/${currentProject._id}/tasks`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Kanban Board'a Git
          </button>
        </div>
      </div>

      {/* Right Panel */}
      {/* <div className="w-1/4 bg-white p-4 rounded-lg shadow overflow-y-auto">

        <h3 className="text-xl font-semibold mt-6 text-blue-600">Üyeler</h3>
        <ul className="mt-2 space-y-1 text-gray-700">
        {currentProject.members?.map((member, index) => (
          <li key={index}>• {member}</li>
        ))}
        </ul>
      </div> */}

<div className="w-1/4 bg-white p-4 rounded-lg shadow overflow-y-auto">
<h3 className="text-xl font-semibold mt-6 text-blue-600 mb-5">Üyeler</h3>
{currentProject.members?.length > 0 && (
  <ul className="space-y-2">
    {currentProject.members.map((member) => (
      <li key={member._id} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center uppercase">
          {member.name?.[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {member.name}
            {member._id === currentProject.owner?._id && (
              <span className="ml-2 text-xs text-indigo-500">(Proje Sahibi)</span>
            )}
          </p>
          <p className="text-xs text-gray-600">{member.title || "Üye"}</p>
        </div>
      </li>
    ))}
  </ul>
)}

    </div>
    </div>
  );
}
