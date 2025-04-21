import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Textbox from "../components/Textbox";
import Button from "../components/Button";

const RegisterModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const result = await registerUser({
        ...data,
        role: "user",
        isAdmin: false,
      }).unwrap();

      dispatch(setCredentials(result));
      navigate("/my-profile");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[95%] max-w-md p-6 shadow-lg relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-blue-700 text-2xl font-bold mb-4 text-center">
          Kayıt Ol
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4">
          <Textbox
            name="name"
            label="Ad Soyad"
            placeholder="Ad Soyad"
            register={register("name", { required: "Zorunlu" })}
            error={errors.name?.message}
          />
          <Textbox
            name="email"
            label="E-posta"
            placeholder="email@example.com"
            type="email"
            register={register("email", { required: "Zorunlu" })}
            error={errors.email?.message}
          />
          <Textbox
            name="password"
            label="Şifre"
            placeholder="••••••"
            type="password"
            register={register("password", { required: "Zorunlu" })}
            error={errors.password?.message}
          />
          <Textbox
            name="title"
            label="Meslek"
            placeholder="Frontend Developer"
            register={register("title", { required: "Zorunlu" })}
            error={errors.title?.message}
          />
          <Textbox
            name="telephone"
            label="Telefon"
            placeholder="Telefon"
            register={register("telephone", { required: "Zorunlu" })}
            error={errors.telephone?.message}
          />
          <Textbox
            name="location"
            label="Konum"
            placeholder="Konum"
            register={register("location", { required: "Zorunlu" })}
            error={errors.location?.message}
          />
          <textarea
            {...register("bio")}
            placeholder="Kendinizden bahsedin..."
            className="border rounded-md p-2 text-sm text-gray-700"
            rows={3}
          />
          <Button
            type="submit"
            label="Kaydol"
            className="bg-blue-700 text-white rounded-md py-2"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;