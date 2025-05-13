import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {

    const navigate = useNavigate(); // ✅ bu satırı ekle
    
  return (
    <div className="w-[280px] sm:w-[320px] lg:w-[340px] flex-shrink-0 snap-start">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex justify-center mt-6">
            <img 
                src={user.avatar || "/profileimg.png"}
                className="w-40 h-40 rounded-full object-cover" 
                alt={user.name}
            />
            </div>
            <div className="p-4 sm:p-6">
                <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{user.name}</h5>
                <p className="text-sm sm:text-base text-gray-600 mb-4">{user.title || 'Meslek bilgisi yok'}</p>
                <button
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white text-sm sm:text-base rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg"
                    >
                    Profili Görüntüle
                </button>
            </div>
        </div>
    </div>
  );
};

export default UserCard;
