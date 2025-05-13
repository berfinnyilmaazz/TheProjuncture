import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateProjectMutation } from "../redux/slices/api/projectApiSlice";
import { useNavigate } from "react-router-dom";
import { uploadImageToFirebase } from "../utils/uploadImageToFirebase";

export default function PublishProject() { 

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [createProject] = useCreateProjectMutation();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";
  
      if (imageFile) {
        iimageUrl = await uploadImageToFirebase(imageFile, "projects");
      }
  
      const formatted = {
        ...data,
        teamSize: parseInt(data.teamSize),
        mentorship: data.mentorship === "yes",
        image: imageUrl, // burada URL’yi kaydediyoruz
      };
  
      const res = await createProject(formatted).unwrap();
      navigate(`/project/${res._id}`);
    } catch (err) {
      console.error("Proje gönderimi başarısız:", err);
    }
  };
  

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 p-6 sm:p-8">
                        {/* Form Header */}
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Proje Bilgileri</h1>
                        </div>

                        {/* Project Image Upload */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Proje Resmi
                            </label>
                            <div className="mt-1">
                                <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />

                            </div>
                        </div>

                        {/* Project Name */}
                        <div className="space-y-2">
                            <input
                                type="text"
                                {...register("title", { required: true })}
                                {...errors.title && <p className="text-red-500 text-sm">Proje adı gerekli</p>}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Proje Adı"
                                
                            />
                        </div>

                        {/* Project Category */}
                        <div className="space-y-2">
                            <select 
                                {...register("category", { required: true })}
                                defaultValue=""
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                                <option value="" disabled >Kategori</option>
                                <option value="psikoloji">Psikoloji</option>
                                <option value="cevre">Çevre</option>
                                <option value="makine">Makine</option>
                                <option value="elektrik">Elektrik</option>
                                <option value="yazilim">Yazılım</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm">Kategori gerekli</p>}
                        </div>

                        {/* Project Description */}
                        <div className="space-y-2">
                            <textarea
                                {...register("description", { required: true })}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Proje Açıklaması"
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-sm">Açıklama gerekli</p>}
                        </div>

                        {/* Team Size */}
                        <div className="space-y-2">
                            <input
                                {...register("teamSize", { required: true })}
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Proje için kaç kişi arıyorsunuz?"
                            />
                            {errors.teamSize && <p className="text-red-500 text-sm">Takım sayısı gerekli</p>}
                        </div>

                        {/* Mentorship Need */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Mentörlük desteği arıyor musunuz?
                            </label>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        {...register("mentorship", { required: true })}
                                        type="radio"
                                        name="mentorship"
                                        id="mentorship-yes"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <label htmlFor="mentorship-yes" className="ml-3 text-sm text-gray-700">
                                        Evet
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        {...register("mentorship", { required: true })}
                                        type="radio"
                                        name="mentorship"
                                        id="mentorship-no"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <label htmlFor="mentorship-no" className="ml-3 text-sm text-gray-700">
                                        Hayır
                                    </label>
                                </div>
                                {errors.mentorship && <p className="text-red-500 text-sm">Seçim yapın</p>}
                            </div>
                        </div>

                        {/* Required Skills */}
                        <div className="space-y-2">
                            <textarea
                                {...register("requiredSkills")}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Projeye katılacak kişilerde aradığınız özellikler"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                Projeyi Yayınla
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}