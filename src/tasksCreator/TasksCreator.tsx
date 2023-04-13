import { useState } from 'react'
import './TaskCreator.css'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button/Button'

interface IProps {
    onSubmit: (value: any) => void
}

const TasksCreator = ({ onSubmit }: IProps) => {
    const [task, setTask] = useState<any>({description: '', _id: ''})
    const handleClick = () => {
        if (task && task.description.length > 4){
            onSubmit(task)
            setTask({description: '', _id: ''})
        }
    }

    const handleChange = (e: any) => {
        const newTask = e?.target?.value
        setTask({ description: newTask, _id: new Date().getTime() })
    }
  return (
    <div className='taskCreatorContainer'>
     <TextField value={task.description} onChange={handleChange} label="Task description" />
     <Button onClick={handleClick} sx={{ ml: '20px' }} variant="contained">Add task</Button>
    </div>
  )
}

export default TasksCreator