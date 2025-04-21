import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiGrid, FiBookmark, FiHeart } from 'react-icons/fi';
import { useGetMyProjectsQuery } from "../redux/slices/api/projectApiSlice";

export default function MyProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('published');

  const { data: myProjects = [] } = useGetMyProjectsQuery();

  const userProfile = {
    name: user?.name || "İsimsiz",
    email: user?.email || "Email yok",
    title: user?.title || "Meslek belirtilmemiş",
    bio: user?.bio || "Biyografi bulunamadı",
    avatar: "/profileimg.png",
  };

  const joinedProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      image: '/projectimg2.png',
      badge: 'Web',
      likes: 32,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
          <button
            onClick={() => navigate('/publish-project')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Proje Yayınla
          </button>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-xl shadow p-6 mb-10 flex flex-col md:flex-row md:items-start gap-8">
  {/* Sol: Avatar */}
  <div className="w-32 h-32 rounded-full overflow-hidden">
    <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
  </div>

  {/* Orta: Bilgiler */}
  <div className="flex-1">
    <h2 className="text-xl font-bold text-gray-900">{userProfile.name}</h2>
    <p className="text-gray-600">{userProfile.title}</p>
    {user?.showEmail && (
      <p className="text-gray-500 text-sm">{user.email}</p>
    )}
    {user?.showTelephone && (
      <p className="text-gray-500 text-sm">Telefon: {user.telephone}</p>
    )}
    {user?.showLocation && (
      <p className="text-gray-500 text-sm">Konum: {user.location}</p>
    )}
    <p className="mt-2 text-gray-700 max-w-xl">{userProfile.bio}</p>
  </div>

  {/* Sağ: Sosyal Medya Linkleri */}
  {user?.showSocialLinks && (
    <div className="min-w-[150px] flex flex-col gap-2">
      {user.socialLinks?.github && (
        <a href={user.socialLinks.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
          GitHub
        </a>
      )}
      {user.socialLinks?.linkedin && (
        <a href={user.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
          LinkedIn
        </a>
      )}
      {user.socialLinks?.instagram && (
        <a href={user.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-pink-500 hover:underline">
          Instagram
        </a>
      )}
      {user.socialLinks?.twitter && (
        <a href={user.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
          X (Twitter)
        </a>
      )}
    </div>
  )}
</div>


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
          {(activeTab === 'published' ? myProjects : joinedProjects).map((project) => (
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
    </main>
  );
}
