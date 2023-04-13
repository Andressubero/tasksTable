import { useContext } from 'react'
import { ITaskContainer } from '../interfaces'
import { TableContext } from '../context'

const TaskContainer = ({ task }: ITaskContainer) => {
    const { dragStart, dragEnd } = useContext(TableContext)
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