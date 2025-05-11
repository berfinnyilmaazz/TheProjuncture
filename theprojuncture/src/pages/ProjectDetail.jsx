import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "../redux/slices/api/projectApiSlice";
import { useSelector } from "react-redux";
import { useJoinProjectMutation } from "../redux/slices/api/projectApiSlice";
import { toast } from "react-toastify";

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, error } = useGetProjectByIdQuery(id);
  const { user } = useSelector((state) => state.auth); // userInfo yerine user
  const [joinProject, { isLoading: isJoining }] = useJoinProjectMutation();
  const [hasRequestedJoin, setHasRequestedJoin] = useState(false);
  

  const handleJoin = async () => {
    try {
      await joinProject(project._id).unwrap();
      toast.success("Katılma isteği gönderildi!");
      setHasRequestedJoin(true); // Butonu değiştirecek
    } catch (err) {
      toast.error(err?.data?.message || "Katılma isteği başarısız");
    }
  };
  
  


  if (isLoading) return <p className="text-center mt-10">Yükleniyor...</p>;
  if (error || !project) return <p className="text-center mt-10 text-red-500">Proje bulunamadı</p>;

  return (
    <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Görsel */}
        <img
          src={project.image || "/projectimg1.png"}
          alt={project.title}
          className="w-full h-[320px] object-cover"
        />

        {/* İçerik */}
        <div className="p-6 sm:p-10 space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{project.title}</h1>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{project.description}</p>

          {/* Proje Detayları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Proje Sahibi</p>
              <a 
                href={`/profile/${project.owner?._id}`} 
                className="text-indigo-600 font-semibold hover:underline"
              >
                {project.owner?.name || "Bilinmiyor"}
              </a>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Kategori</p>
              <p className="text-indigo-700 font-semibold">{project.category}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Takım Büyüklüğü</p>
              <p className="text-indigo-700 font-semibold">{project.teamSize} kişi</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Mentörlük</p>
              <p className="text-indigo-700 font-semibold">{project.mentorship ? "Aranıyor" : "Aranmıyor"}</p>
            </div>            
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Aranan Beceriler</p>
              {project.requiredSkills ? (
                <ul className="list-disc list-inside text-indigo-700 font-semibold space-y-1">
                  {project.requiredSkills.split('\n').map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-indigo-700 font-semibold">Belirtilmedi</p>
              )}
          </div>

          {/* Buton */}
          {/* Buton veya mesajlar */}
          <div className="pt-8">
            {project.owner?._id === user._id || project.owner === user._id ? (
              <p className="text-center text-indigo-600 font-semibold">Projeyi siz yayınladınız</p>
            ) : hasRequestedJoin || project.pendingJoinRequests?.includes(user._id) ? (
              <p className="text-center text-indigo-600 font-semibold">Katılma isteği gönderdiniz</p>
            ) : project.members?.some(member => member._id === user._id) ? (
              <p className="text-center text-indigo-600 font-semibold">Zaten bu projeye katıldınız</p>
            ) : (
              <button
                onClick={handleJoin}
                disabled={isJoining}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-base font-medium disabled:opacity-50"
              >
                {isJoining ? "Gönderiliyor..." : "Katılmak İstiyorum"}
              </button>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
