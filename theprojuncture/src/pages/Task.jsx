import React, { useState } from 'react'
import { FaList } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { useLocation, useParams } from 'react-router-dom';
import Loading from "../components/Loading";
import Title from '../components/Title';
import Button from '../components/Button';
import { IoMdAdd } from 'react-icons/io';
import Tabs from '../components/Tabs';
import TaskTitle from '../components/TaskTitle';
import BoardView from '../components/BoardView';
import { tasks } from '../assets/data.js';
import Table from '../components/task/Table';
import AddTask from '../components/task/AddTask';
import { useGetAllTaskQuery } from '../redux/slices/api/taskApiSlice.js';
import { useSelector } from "react-redux";
import { useGetProjectByIdQuery } from "../redux/slices/api/projectApiSlice";
import { useNavigate } from "react-router-dom";

const TABS = [
  { title: "Board", icon: <MdGridView />},
];

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};



  const Task = () => {
    const { status, projectId } = useParams();

    const [selected, setSelected] = useState (0);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    //const {status, projectId} = params?.status || "";

    const { data: taskData = [], isLoading } = useGetAllTaskQuery({
      stage: "all",
      isTrashed: false,
      search: "",
      projectId,
    });

const navigate = useNavigate();
const user = useSelector((state) => state.auth.user);

const { data: project, isLoading: isProjectLoading } = useGetProjectByIdQuery(projectId, {
  skip: !projectId,
});

console.log("projectId:", projectId);
console.log("typeof projectId:", typeof projectId); // "string" olması normal, ama backend'de ObjectId yapılmalı



if (isProjectLoading) return <p>Yükleniyor...</p>;

// Erişim kontrolü
// const isOwner = project?.owner?._id === userInfo?._id;
// const isMember = project?.members?.some((member) =>
//   typeof member === "object"
//     ? member._id === userInfo._id
//     : member === userInfo._id
// );


if (project?.owner?._id !== user?._id && !project?.members?.some(m => m._id === user?._id)) {
  return <p className="text-red-500">Bu projeye erişim yetkiniz yok.</p>;
}


if (!projectId) {
  return <div>Hatalı yönlendirme: Proje bilgisi yok.</div>;
}

console.log(taskData)
    

      return isLoading ? (
        <div className='py-10'>
          <Loading />
        </div>
      ) : (
        <div className='w-full'>
          <div className='flex items-center justify-between mb-4'>
          <Title title={project?.title || "Görevler"} />
            {
              !status && (
              <Button
              onClick={() => setOpen(true)}
                label="Task Ekle"
                icon={<IoMdAdd className="text-lg" />}
                className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
               />
            )}
          </div>

          <div>
            <Tabs tabs={TABS} >
              {!status && (
                <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
                  <TaskTitle label="To Do" className={TASK_TYPE.todo} />
                  <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
                  <TaskTitle label="Completed" className={TASK_TYPE.completed} />
                </div>
              )}

              
              {taskData?.tasks?.length > 0 ? (
                <BoardView task={taskData?.tasks} />
              ) : (
                <p className="text-gray-500 text-center py-10">Henüz görev yok.</p>
              )}


              
            </Tabs>

            <AddTask open={open} setOpen={setOpen} project={project} />

          </div>
        </div>
      );
  };


export default Task