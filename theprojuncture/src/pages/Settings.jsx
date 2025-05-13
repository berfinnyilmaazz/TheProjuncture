import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiEdit2, FiGithub, FiLinkedin, FiBookmark, FiSettings, FiLogOut } from 'react-icons/fi';
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { logout, setCredentials } from '../redux/slices/authSlice';
import { useLogoutMutation } from '../redux/slices/api/authApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation, useUpdateUserMutation } from '../redux/slices/api/userApiSlice';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { toast } from 'sonner';
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uploadImageToFirebase } from "../utils/uploadImageToFirebase";
 // senin firebase config'in buraya bağlı olmalı


export default function Profile() {
    const [activeTab, setActiveTab] = useState('profile');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [avatarFile, setAvatarFile] = useState(null);

    const { user } = useSelector((state) => state.auth);


    const [logoutUser] = useLogoutMutation();
    
    const logoutHandler = async () => {
        try{
                // logoutUser() fonksiyonu ile API'den çıkış işlemini gerçekleştiriyoruz
        await logoutUser().unwrap();  // unwrap kullanarak yanıtı alıyoruz

        // Redux store'dan logout işlemi
        dispatch(logout());

        // localStorage'dan kullanıcı bilgilerini temizleme
        localStorage.removeItem("userInfo");

        // Yönlendirme işlemi
        navigate("/");
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("Something went wrong");
        }
    };

    const {
        register: profileRegister,
        handleSubmit: handleProfileSubmit,
        formState: { errors: profileErrors },
        setValue,
      } = useForm();

      const {
        register: passwordRegister,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
      } = useForm();

    const [changeUserPassword, {isLoading}] = useChangePasswordMutation();
    
    const handleOnSubmit = async(data) => {
        if(data.password !== data.cpass){
            toast.warning("Password doesn't match");
            return;
        }
        try{
            const res = await changeUserPassword(data).unwrap();
            toast.success(res.message);
                       
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };

    useEffect(() => {
        if (user) {
          setValue("name", user.name);
          setValue("email", user.email);
          setValue("title", user.title);
          setValue("telephone", user.telephone);
          setValue("location", user.location);
          setValue("bio", user.bio);
          setValue("avatar", user.avatar);

          setValue("socialLinks.github", user.socialLinks?.github || "");
          setValue("socialLinks.linkedin", user.socialLinks?.linkedin || "");
          setValue("socialLinks.instagram", user.socialLinks?.instagram || "");
          setValue("socialLinks.twitter", user.socialLinks?.twitter || "");
          setValue("showSocialLinks", user.showSocialLinks || false);

          setValue("showEmail", user.showEmail || false);
          setValue("showTelephone", user.showTelephone || false);
          setValue("showLocation", user.showLocation || false);

        }
      }, [user, setValue]);

      

      const [updateProfile] = useUpdateUserMutation();

      const onAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const avatarUrl = await uploadImageToFirebase(file,"avatars");
            console.log("✅ Yüklenen avatar URL:", avatarUrl);

            const result = await updateProfile({ avatar: avatarUrl }).unwrap();
            dispatch(setCredentials(result.user));
            toast.success("Profil resmi güncellendi!");
        } catch (err) {
            console.error("Avatar yükleme hatası:", err);
            toast.error("Profil resmi güncellenemedi.");
        }
    };


      const onProfileUpdate = async (data) => {
        try {
            let avatarUrl = user?.avatar;

            if (avatarFile) {
                avatarUrl = await uploadImageToFirebase(avatarFile, "avatars"); // ✅ avatars klasörüne
                console.log("✅ Yüklenen avatar URL:", avatarUrl);
            }
            console.log("Yüklenen resim URL:", avatarUrl);
            console.log("✅ Gönderilecek avatar URL:", avatarUrl);
            console.log("📤 Backend'e gönderilen data:", { ...data, avatar: avatarUrl });



          const result = await updateProfile({...data, avatar: avatarUrl}).unwrap();
          toast.success("Profil başarıyla güncellendi!");
          dispatch(setCredentials(result.user)); // Redux güncelle
          console.log("🧠 Redux’a gönderilecek kullanıcı:", result.user);

          navigate("/my-profile");
        } catch (error) {
          toast.error(error?.data?.message || "Güncelleme başarısız");
        }
      };      
      

    return (
        <>
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            {/* Profile Summary */}
                            <div className="flex flex-col items-center pb-6 border-b border-gray-200">
                                <div className="relative group">
                                    <img
                                        src={user?.avatar || "/profileimg.png"}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />

                                    {/* INPUT dosya seçici */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute bottom-0 right-0 w-10 h-10 opacity-0 cursor-pointer z-10"
                                        title="Profil resmi yükle"
                                        onChange={onAvatarChange}
                                    />

                                    <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full pointer-events-none">
                                        <FiEdit2 className="w-4 h-4" />
                                    </div>
                                </div>

                                <h2 className="mt-4 text-xl font-semibold text-gray-900">{user?.name || "Bilinmeyen Kullanıcı"}</h2>
                                <p className="text-gray-500">{user?.title || "Görev belirtilmemiş"}</p>

                            </div>

                            {/* Navigation Menu */}
                            <nav className="mt-6 space-y-2">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center px-4 py-2 rounded-lg ${
                                        activeTab === 'profile'
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <FiUser className="w-5 h-5 mr-3" />
                                    Profil Bilgileri
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center px-4 py-2 rounded-lg ${
                                        activeTab === 'settings'
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <FiSettings className="w-5 h-5 mr-3" />
                                    Ayarlar
                                </button>
                                {/* <button
                                    onClick={() => setActiveTab('saved')}
                                    className={`w-full flex items-center px-4 py-2 rounded-lg ${
                                        activeTab === 'saved'
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <FiBookmark className="w-5 h-5 mr-3" />
                                    Kaydedilenler
                                </button> */}
                                <button 
                                onClick={logoutHandler}
                                className="w-full flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50">
                                    <FiLogOut className="w-5 h-5 mr-3" />
                                    Çıkış Yap
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:flex-1">
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-gray-900">Profil Bilgileri</h3>
                                    <form className="space-y-6" onSubmit={handleProfileSubmit(onProfileUpdate)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ad Soyad
                                                </label>
                                                <input
                                                    type="text"
                                                    {...profileRegister("name", { required: "Ad soyad zorunlu" })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Ad Soyad"
                                                />
                                            </div>
                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    E-posta
                                                </label>
                                                <input
                                                    type="email"
                                                    {...profileRegister("email", { required: "E-posta zorunlu" })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Ad Soyad"
                                                />
                                            </div>
                                            {/* Phone */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Telefon
                                                </label>
                                                <input
                                                    type="tel"
                                                    {...profileRegister("telephone", { required: "Telefon zorunlu" })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Telefon"
                                                />
                                            </div>
                                            {/* Location */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Konum
                                                </label>
                                                <input
                                                    type="text"
                                                    {...profileRegister("location")}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Konum"
                                                />
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Hakkımda
                                            </label>
                                            <textarea
                                                rows="4"
                                                {...profileRegister("bio")}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Kendinizden bahsedin..."
                                            ></textarea>
                                        </div>

                                        {/* Social Links */}
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-medium text-gray-900">Sosyal Medya</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="flex items-center space-x-2">
                                                    <FiGithub className="w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        {...profileRegister("socialLinks.github")}
                                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="GitHub URL"
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <FiLinkedin className="w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        {...profileRegister("socialLinks.linkedin")}
                                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="LinkedIn URL"
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <IoLogoInstagram  className="w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        {...profileRegister("socialLinks.instagram")}
                                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Instagram URL"
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <FaXTwitter  className="w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        {...profileRegister("socialLinks.x")}
                                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="X URL"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Değişiklikleri Kaydet
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-gray-900">Hesap Ayarları</h3>
                                    <div className="space-y-6">
                                        {/* Password Change */}
                                        <div className="p-6 bg-gray-50 rounded-lg space-y-4">
                                            <h4 className="text-lg font-medium text-gray-900">Şifre Değiştir</h4>
                                            <form 
                                            onSubmit={handlePasswordSubmit(handleOnSubmit)}
                                            className="space-y-4">
                                                <div className='mt-2 flex flex-col gap-6'>
                                                    <Textbox
                                                    placeholder='Yeni Şifre'
                                                    type='password'
                                                    name='password'
                                                    label='Yeni Şifre'
                                                    className='w-full rounded'
                                                    register={passwordRegister('password', {
                                                        required: "New Password is required",
                                                    })}
                                                    error={passwordErrors.password ? passwordErrors.password.message : ""}
                                                    />

                                                    <Textbox
                                                    placeholder='Yeni Şifre Tekrar'
                                                    type='password'
                                                    name='cpass'
                                                    label='Yeni Şifre Tekrar'
                                                    className='w-full rounded'
                                                    register={passwordRegister('cpass', {
                                                        required: "Confirm new password is required",
                                                    })}
                                                    error={passwordErrors.cpass ? passwordErrors.cpass.message : ""}
                                                    />   
                                                </div>
                                                {isLoading ? (
                                                    <div className='py-5'>
                                                        <Loading />
                                                    </div>
                                                ) : (
                                                    <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                                                        <Button 
                                                            type='submit' 
                                                            className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-600'
                                                            label="Güncelle"
                                                        />

                                                        <button
                                                            type='button'
                                                            className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                                                            
                                                        >
                                                            İptal
                                                        </button>
                                                    </div>
                                                )}
                                            </form>
                                        </div>

                                        {/* Notification Settings */}
                                        {/* <div className="p-6 bg-gray-50 rounded-lg space-y-4">
                                            <h4 className="text-lg font-medium text-gray-900">Bildirim Ayarları</h4>
                                            <div className="space-y-4">
                                                <label className="flex items-center space-x-3">
                                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                                                    <span className="text-gray-700">E-posta Bildirimleri</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                                                    <span className="text-gray-700">Proje Güncellemeleri</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                                                    <span className="text-gray-700">Yeni Mesaj Bildirimleri</span>
                                                </label>
                                            </div>
                                        </div> */}

                                        {/* Privacy Settings */}
                                        <form onSubmit={handleProfileSubmit(onProfileUpdate)} className="space-y-6">
                                            <div className="p-6 bg-gray-50 rounded-lg space-y-4">
                                                <h4 className="text-lg font-medium text-gray-900">Gizlilik Ayarları</h4>
                                                <div className="space-y-4">
                                                <label className="flex items-center space-x-3">
                                                    <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-indigo-600"
                                                    {...profileRegister("showEmail")}
                                                    />
                                                    <span className="text-gray-700">E-posta Bilgilerimi Göster</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-indigo-600"
                                                    {...profileRegister("showTelephone")}
                                                    />
                                                    <span className="text-gray-700">Telefon Bilgilerimi Göster</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-indigo-600"
                                                    {...profileRegister("showLocation")}
                                                    />
                                                    <span className="text-gray-700">Konum Bilgilerimi Göster</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-indigo-600"
                                                    {...profileRegister("showSocialLinks")}
                                                    />
                                                    <span className="text-gray-700">Sosyal Link Bilgilerimi Göster</span>
                                                </label>
                                                </div>
                                                <Button type="submit" className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-600" label="Güncelle" />
                                            </div>
                                        </form>      
                                    </div>
                                </div>
                            )}

                           
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <ChangePassword open={openPassword} setOpen={setOpenPassword} /> */}
        </>
    );
}