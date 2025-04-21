import React from 'react';
import ModalWrapper from './ModalWrapper';
import { Dialog } from '@headlessui/react';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Textbox from './Textbox';
import Loading from './Loading';
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice';

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [updatePassword, {isLoading}] = useChangePasswordMutation();
    
    const handleOnSubmit = async(data) => {
        if(data.password !== data.cpass){
            toast.warning("Password doesn't match");
            return;
        }

        try{
            const res = await changeUserPassword(data).unwrap();
            toast.success(res.message);
            
            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };
        
  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)}></form>
        <Dialog.Title 
            as="h2" 
            className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
            Change Password
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
            <Textbox
            placeholder='New password'
            type='password'
            name='password'
            label='New password'
            className='w-full rounded'
            register={register('password', {
                required: "New Password is required",
            })}
            error={errors.password ? errors.password.message : ""}
            />

            <Textbox
            placeholder='Confirm new password'
            type='password'
            name='cpass'
            label='Confirm new password'
            className='w-full rounded'
            register={register('cpass', {
                required: "Confirm new password is required",
            })}
            error={errors.cpass ? errors.cpass.message : ""}
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
                    label="save"
                />

                <button
                    type='button'
                    className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </button>
            </div>
        )}
        
    </ModalWrapper>
    </>
  )
}

export default ChangePassword