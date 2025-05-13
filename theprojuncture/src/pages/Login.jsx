import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Loading from '../components/Loading';
import { useLoginMutation, useRegisterMutation } from '../redux/slices/api/authApiSlice';
import { setCredentials } from '../redux/slices/authSlice.js';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import RegisterModal from "../components/RegisterModal"; // yol doğruysa


const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [registerUser] = useRegisterMutation();


  const { user } =useSelector((state) => state.auth);
  const {
    register, 
    handleSubmit, 
    formState: {errors},
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();

  const submitHandler = async (data) => {
    try{
      const result = await login(data).unwrap();

      dispatch(setCredentials(result));
      navigate("/");

    } catch (error) {
      console.error(error);
  
      if (error?.status === 401) {
        toast.error("E-mail veya şifre yanlış!");
      } else {
        toast.error(error?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };


  useEffect(() => {
    user && navigate("/");
  }, [user]);


  return (
  <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
  <Toaster position="top-center" richColors />
    <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
      {/* left side */}
      <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
        <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:mt-20'>
          <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-x-gray-300 text-gray-600'>
            Projelerinize kolayca ekip arkadaşı bulun veya yeni bir projeye katılın
          </span>
          <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
            <span>Projuncture</span>
          </p>

          <div className='cell'>
            <DotLottieReact
            src="https://lottie.host/a01d9cd2-947f-40ac-bfe4-ed5770cbcf8a/fHvVEtEkBn.lottie"
            loop
            autoplay
            />
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit(submitHandler)}
        className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
        >
          <div className=''>
            <p className='text-blue-600 text-3xl font-bold text-center'>Hoşgeldiniz</p>
            <p className='text-center text-base text-gray-700'>Projelerinizi hayata geçirin</p>
          </div>

          <div className='flex flex-col gap-y-5'>
            <Textbox           
            placeholder="email@example.com"
            type="email"
            name="email"
            label="E-mail"
            className="w-full rounded-full"
            register={register("email",{
              required: "Email is required",
            })}
            error={errors.email ? errors.email.message : "" }            
            />

          <Textbox           
            placeholder="Şifre"
            type="password"
            name="password"
            label="Şifre"
            className="w-full rounded-full"
            register={register("password",{
              required: "Password is required",
            })}
            error={errors.password ? errors.password.message : "" }            
            />

            {/* <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
              Şifrenizi mi Unuttunuz?
            </span> */}

            <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'
                  onClick={() => setShowRegister(true)}
            >
              Kayıtlı değil misiniz? Hemen kaydolun.
            </span>
            {isLoading ? (
              <Loading />
            ) : (
              <Button
              type="submit"
              label="Giriş Yap"
              className="w-full h-10 bg-blue-700 text-white rounded-full"
              />
            )}           
          </div>
        </form>
      </div>
    </div>
  {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}

  </div>
    
    
  );
};


export default Login;