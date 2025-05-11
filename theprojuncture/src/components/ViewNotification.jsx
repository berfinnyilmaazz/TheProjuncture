import React from 'react';
import ModalWrapper from './ModalWrapper';
import { Dialog } from '@headlessui/react';
import Button from './Button';
import JoinRequestDetail from './JoinRequestDetail';
import { HiOutlineBell } from "react-icons/hi";

const ViewNotification = ({ open, setOpen, el }) => {
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className='py-6 px-4 sm:px-8 w-full flex flex-col items-center'>
        

        {/* İçerik */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md w-full p-4 mb-4 text-sm text-gray-700">
          {el?.notiType === "join_request" ? (
            <JoinRequestDetail userId={el.senderId} projectId={el.projectId} />
          ) : el?.notiType === "info" ? (
            <p className='text-red-600 font-medium'>{el?.text}</p>
          ) : (
            <p className='text-gray-600'>{el?.text}</p>
          )}
        </div>

        {/* Buton */}
        <Button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 text-sm font-medium rounded-lg shadow"
          onClick={() => setOpen(false)}
          label="Kapat"
        />
      </div>
    </ModalWrapper>
  );
};

export default ViewNotification;
