import React from "react";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "../redux/slices/api/projectApiSlice";

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, error } = useGetProjectByIdQuery(id);

  if (isLoading) return <p className="text-center mt-10">Yükleniyor...</p>;
  if (error || !project) return <p className="text-center mt-10 text-red-500">Proje bulunamadı</p>;

  return (
    <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
        <p className="text-gray-600">{project.description}</p>

        <div className="space-y-2">
          <img
            src={project.image || '/placeholder.jpg'}
            alt={project.title}
            className="w-full h-40 object-cover rounded-t"
          />
          <p><strong>Kategori:</strong> {project.category}</p>
          <p><strong>Takım Büyüklüğü:</strong> {project.teamSize} kişi</p>
          <p><strong>Mentörlük:</strong> {project.mentorship ? "Aranıyor" : "Aranmıyor"}</p>
          <p><strong>Aranan Beceriler:</strong> {project.requiredSkills || "Belirtilmedi"}</p>
        </div>

        <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Katılmak İstiyorum
        </button>
      </div>
    </main>
  );
};

export default ProjectDetail;
