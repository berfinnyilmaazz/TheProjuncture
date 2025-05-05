import React from 'react';
import ModalWrapper from './ModalWrapper';
import { Dialog } from '@headlessui/react';
import Button from './Button';
import JoinRequestDetail from './JoinRequestDetail';

const ViewNotification = ({open, setOpen, el}) => {
  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
    <Dialog.Title as='h3' className='font-semibold text-lg'>
        {el?.task?.title} 
    </Dialog.Title>

    {el?.notiType === "join_request" ? (
    <JoinRequestDetail userId={el.senderId} projectId={el.projectId} />
    ) : el?.notiType === "info" ? (
      <p className='text-red-600'>{el?.text}</p>
    ) : (
      <p className='text-gray-600'>{el?.text}</p>
    )}


    <Button 
    type="button"
    className="bg-white px-8 mt-3 text-sm font-semibold text-gray-900 sm:w-auto border"
    onClick={() => setOpen(false)}
    label="Ok"  
    />
    </div>
    </ModalWrapper>
    </>
  )
}

export default ViewNotification