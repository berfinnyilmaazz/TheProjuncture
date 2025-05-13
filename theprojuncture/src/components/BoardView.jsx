import React from 'react'
import TaskCard from './TaskCard'

const BoardView = ({task, projectId, refetch}) => {
  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
        {task.map((task, index) => (
            <TaskCard 
              task={task} 
              key={index} 
              projectId={projectId} 
              onTaskDeleted={refetch}
            />
        ))}
    </div> 
  )
}

export default BoardView