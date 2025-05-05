import React from 'react'
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../utils';
import { FaTasks } from "react-icons/fa";
import { IoMdSettings } from 'react-icons/io';
import { useLogoutMutation } from '../redux/slices/api/authApiSlice';
import { toast } from 'sonner';
import { logout } from '../redux/slices/authSlice.js';

const UserAvatar = () => {
    const [open, setOpen] = useState(false);
    const [openProjects, setOpenProjects] =useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    console.log("User from Redux store:", user);


    const [logoutUser] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
          await logoutUser().unwrap(); // Backend token silme işlemi
      
          dispatch(logout()); // Redux + localStorage temizleme
      
          navigate("/"); // Anasayfaya yönlendir
        } catch (error) {
          console.error("Logout Error:", error);
          toast.error("Çıkış yapılırken bir hata oluştu.");
        }
      };
      


  return (
    <div>
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="w-10 h-10 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
                    {user ? (
                        <span className='text-gray-700 font-semibold'>                       
                            {getInitials(user?.name)}
                        </span>
                    ) : (
                        <FaUser className="text-gray-600 text-xl" />
                    )}
                </Menu.Button>
            </div>

            <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
            >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none z-50">
                <div className='p-4'>
                    {user ? (
                        <>
                            <Menu.Item>
                                {({active}) => (
                                    <button
                                    onClick={() => navigate("/my-profile")}
                                    className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base'
                                    >
                                        <FaUser className='mr-2' aria-hidden="true" />
                                        Profil
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({active}) => (
                                    <button
                                    onClick={() => navigate("/project-details")}
                                    className={'text-gray-700 dark:text-gray-300 group flex w-full items-center rounded-md px-2 py-2 text-base'}
                                    >
                                    <FaTasks className='mr-2' aria-hidden="true" />
                                        Projelerim
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({active}) => (
                                    <button
                                    onClick={() => navigate("/settings")}
                                    className={'text-gray-700 dark:text-gray-300 group flex w-full items-center rounded-md px-2 py-2 text-base'}
                                    >
                                        <IoMdSettings className='mr-2' aria-hidden="true" />
                                        Ayarlar
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({active}) => (
                                    <button
                                    onClick={logoutHandler}
                                    className={'text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base'}
                                    >
                                        <IoLogOutOutline className='mr-2' aria-hidden="true" />
                                        Çıkış Yap
                                    </button>
                                )}
                            </Menu.Item>
                        </>
                    ) : (
                        <Menu.Item>
                            {({active}) => (
                                <button
                                onClick={handleLoginClick}
                                className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-gray-100'
                                >
                                    <FaUser className='mr-2' aria-hidden="true" />
                                    Giriş Yap / Kaydol
                                </button>
                            )}
                        </Menu.Item>
                    )}
                </div>
            </Menu.Items>
            </Transition>
        </Menu>
    </div>
  )
}

export default UserAvatar