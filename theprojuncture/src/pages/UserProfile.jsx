import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../redux/slices/api/userApiSlice";

const UserProfile = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);

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
    </div>
  );
};

export default UserProfile;
