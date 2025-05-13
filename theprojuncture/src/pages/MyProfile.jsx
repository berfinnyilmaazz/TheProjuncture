import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiGrid, FiBookmark, FiHeart } from 'react-icons/fi';
import { useGetAllProjectsQuery, useGetMyProjectsQuery } from "../redux/slices/api/projectApiSlice";
import { HiBellAlert } from 'react-icons/hi2';
import { useGetAllNotificationsQuery } from '../redux/slices/api/userApiSlice';
import moment from 'moment';
import ViewNotification from '../components/ViewNotification';
import { useLocation } from 'react-router-dom';

export default function MyProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
const params = new URLSearchParams(location.search);
const initialTab = params.get('tab') || 'published';
const [activeTab, setActiveTab] = useState(initialTab);

  const { data: myProjects = [] } = useGetMyProjectsQuery();

  const { data: allProjects = [] } = useGetAllProjectsQuery();

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allNotifications = [] } = useGetAllNotificationsQuery();

  const [selectedType, setSelectedType] = useState('all');
  const notiTypes = ['all', 'alert', 'message', 'join_request', 'info'];

  const filteredNotifications =
    selectedType === 'all'
      ? allNotifications
      : allNotifications.filter((noti) => noti.notiType === selectedType);


  const joinedProjects = user?._id
  ? myProjects.filter((proj) =>
      proj.members?.some((m) =>
        typeof m === "object"
          ? m._id?.toString() === user._id
          : m === user._id
      ) &&
      (typeof proj.owner === "object"
        ? proj.owner._id !== user._id
        : proj.owner !== user._id)
    )
  : [];

  const myPublishedProjects = user?._id
  ? myProjects.filter((proj) =>
      typeof proj.owner === "object"
        ? proj.owner._id === user._id
        : proj.owner === user._id
    )
  : [];
  


  const userProfile = {
    name: user?.name || "İsimsiz",
    email: user?.email || "Email yok",
    title: user?.title || "Meslek belirtilmemiş",
    bio: user?.bio || "Biyografi bulunamadı",
    avatar: user?.avatar || "/profileimg.png",
  };

  

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profil</h1>         
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
            <button
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                activeTab === 'notifications'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <HiBellAlert className="w-5 h-5" /> Bildirimler
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {(activeTab === 'published' || activeTab === 'joined') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'published' ? myPublishedProjects : joinedProjects).map((project) => (
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
        )}
        {activeTab === 'notifications' && (
        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {notiTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full border ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {type === 'all' ? 'Tümü' : type}
              </button>
            ))}
        </div>
          {filteredNotifications.length === 0 ? (
            <p className="text-gray-500">Bu kategoride hiç bildirim yok.</p>
          ) : (
            <ul className="space-y-3">
              {[...filteredNotifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((noti) => (
                <li
                  onClick={() => {
                    setSelectedNotification(noti);
                    setIsModalOpen(true);
                  }}
                  key={noti._id}
                  className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition cursor-pointer"
                >
                  <p className="text-sm text-gray-800 font-semibold capitalize">{noti.notiType}</p>
                  <p className="text-sm text-gray-600 mt-1">{noti.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{moment(noti.createdAt).fromNow()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        )}
      </div>

      {selectedNotification && (
      <ViewNotification
        open={isModalOpen}
        setOpen={setIsModalOpen}
        el={selectedNotification}
      />
    )}

    </main>
  );
}
