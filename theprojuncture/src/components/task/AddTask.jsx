import React, { useEffect, useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import { Dialog } from '@headlessui/react'
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import UserList from './UserList';
import SelectList from '../SelectList';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {app} from "../../utils/firebase";
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../redux/slices/api/taskApiSlice.js';
import { toast } from "sonner";
import { dateFormatter } from '../../utils/index.js';
import { useGetAssignableUsersQuery } from '../../redux/slices/api/projectApiSlice.js';

 

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadedFileURLs = [];

const AddTask = ({open, setOpen, task, project, onTaskAdded}) => {

  const [selected, setSelected] = useState("");


  const defaultValues = {
    title: task?.title || "",
    date: dateFormatter(task?.date || new Date()),
    team : [],
    stage: "",
    priority: "",
    assets: [],
  };

  // const assignableUsers = [
  //   ...(project?.members || []),
  //   project?.owner
  // ];
  

    const {
        register, 
        handleSubmit, 
        reset,
        formState: {errors},
    } = useForm({defaultValues});

    const [team, setTeam] = useState(task?.team || []);
    const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
    const [priority, setPriority] = useState(
        task?.priority?.toUpperCase() || PRIORITY[2]
    );
    const [assets, setAssets] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [createTask, { isLoading }] = useCreateTaskMutation();
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
    const URLS = task?.assets ? [...task.assets] : [];

    useEffect(() => {
      if (task) {
        reset({
          title: task.title || "",
          date: dateFormatter(task.date || new Date()),
        });
        setTeam(task.team || []);
        setStage(task.stage?.toUpperCase() || LISTS[0]);
        setPriority(task.priority?.toUpperCase() || PRIORITY[2]);
      }
    }, [task, reset]);


    const submitHandler = async(data) => {
      for(const file of assets) {
        setUploading(true);
        try{
          await uploadFile(file);
        } catch (error) {
          console.error("Error uploading file:", error.message);
          return;
        }
        finally {
          setUploading(false);
        }
      }

      try {
        const newData = {
          ...data,
          projectId: project?._id,
          assets: [ ...URLS, ...uploadedFileURLs],
          team,
          stage,
          priority,
        };

        const res = task?._id
        ? await updateTask({...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

        toast.success(res.message);
        if (onTaskAdded) onTaskAdded(); // ✅ refetch'i çağır
        setTimeout(() => {
          setOpen(false);
        }, 500);
      } catch(err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
    };

    

    console.log(project?._id)


    const handleSelect = () => {
        setAssets(e.target.files);
    };


    const uploadFile = async(file) => {
      const storage = getStorage(app);

      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log("Uploading");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              uploadedFileURLs.push(downloadURL);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
          }
        );
      });
    };


  return (
    <>
    <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {task ? "TASK GÜNCELLE" : "TASK EKLE"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Task Başlığı'
              type='text'
              name='title'
              label='Task Başlığı'
              className='w-full rounded'
              register={register("title", { required: "Başlık gerekli" })}
              error={errors.title ? errors.title.message : ""}
          />

            <UserList
              team={team}
              setTeam={setTeam}
              projectId={project?._id}
            />

            <div className='flex gap-4'>
              <SelectList
                label='Task Aşaması'
                //lists={assignableUsers.map(user => `${user.name} - ${user.title}`)}
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Tarih'
                  type='date'
                  name='date'
                  label='Tarih'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Öncelik Seviyesi'
                lists={PRIORITY}
                selected={priority}
                setSelected={setPriority}
              />

            {/* <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div> */}
            </div>

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Kaydet'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='İptal'
              />
            </div>
            
          </div>
        </form>
    </ModalWrapper>
    </>
  )
}

export default AddTask