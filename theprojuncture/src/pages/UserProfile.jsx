import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../redux/slices/api/userApiSlice";
import { useState } from "react";
import { useGetAllProjectsQuery } from "../redux/slices/api/projectApiSlice";
import { FiBookmark, FiGrid } from "react-icons/fi";
import { useNavigate } from "react-router-dom";



const UserProfile = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);
  const [activeTab, setActiveTab] = useState('published');

  const { data: allProjects = [] } = useGetAllProjectsQuery();
  const createdProjects = allProjects.filter(
  (project) => project.owner?._id === user?._id
);

const joinedProjects = allProjects.filter(
  (project) =>
    project.members?.some((member) => member._id === user?._id)
);




  if (isLoading) return <p>Yükleniyor...</p>;
  if (error || !user) return <p>Profil bulunamadı</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        <img src="/profileimg.png" alt={user.name} className="w-40 h-40 rounded-full object-cover" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.title}</p>
          {user.showEmail && <p className="text-gray-500">{user.email}</p>}
          {user.showTelephone && <p className="text-gray-500">Tel: {user.telephone}</p>}
          {user.showLocation && <p className="text-gray-500">Konum: {user.location}</p>}
          {user.bio && <p className="mt-2">{user.bio}</p>}
        </div>
      </div>

      {user.showSocialLinks && (
        <div className="mt-6 space-y-2">
          {user.socialLinks?.github && <a href={user.socialLinks.github} target="_blank" className="text-indigo-600 hover:underline block">GitHub</a>}
          {user.socialLinks?.linkedin && <a href={user.socialLinks.linkedin} target="_blank" className="text-indigo-600 hover:underline block">LinkedIn</a>}
          {user.socialLinks?.instagram && <a href={user.socialLinks.instagram} target="_blank" className="text-indigo-600 hover:underline block">Instagram</a>}
          {user.socialLinks?.twitter && <a href={user.socialLinks.twitter} target="_blank" className="text-indigo-600 hover:underline block">X (Twitter)</a>}
        </div>
      )}

      {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                      activeTab === 'published'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('published')}
                  >
                    <FiGrid className="w-5 h-5" /> Yayınlanan Projeler
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                      activeTab === 'joined'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('joined')}
                  >
                    <FiBookmark className="w-5 h-5" /> Katılınan Projeler
                  </button>
                </div>
              </div>

               {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'published' ? createdProjects : joinedProjects).map((project) => (
              <div
                key={project._id || project.id}
                className="group cursor-pointer"
                onClick={() => {
                  if (project._id) navigate(`/project/${project._id}`);
                  else console.warn("project._id yok!");
                }}
                
              >
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={project.image || "/projectimg1.png"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="font-medium">{project.title}</h3>
                  </div>
                </div>
                <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">
                  {project.badge || project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default UserProfile;
