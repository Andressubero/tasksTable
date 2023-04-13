import React from 'react'
interface IProps {
    task: any,
    dragStart: (event: any) => void
    dragEnd: (event: any) => void
}
const TaskContainer = ({ task, dragStart, dragEnd }: IProps) => {
  return (
    <div
    key={task._id}
    draggable={true}
    onDragStart={dragStart}
    onDragEnd={dragEnd}
    id={task._id}
    className='taskContainer'>
        {task.description}
    </div>
  )
}

export default TaskContainer