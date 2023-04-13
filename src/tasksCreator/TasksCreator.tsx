import { useContext, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { TextField } from '@mui/material'
import Button from '@mui/material/Button/Button'
import './TaskCreator.css'
import { ITask } from '../interfaces'
import { TableContext } from '../context'

const TasksCreator = () => {
    const [task, setTask] = useState<ITask>({description: '', _id: ''})
    const { addTask: onSubmit } = useContext(TableContext)
    const handleClick = () => {
        if (task && task.description.length > 4){
            onSubmit(task)
            setTask({description: '', _id: ''})
        }
    }

    const handleChange = (e: any) => {
        const newTask = e?.target?.value
        setTask({ description: newTask, _id: `${uuid()}` })
    }
  return (
    <div className='taskCreatorContainer'>
     <TextField value={task.description} onChange={handleChange} label="Task description" />
     <Button onClick={handleClick} sx={{ ml: '20px' }} variant="contained">Add task</Button>
    </div>
  )
}

export default TasksCreator