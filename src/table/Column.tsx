import  { Fragment, useContext } from 'react';
import { TableContext } from '../context';
import TaskContainer from './TaskContainer';
import { IColumn } from '../interfaces';
import './Table.css';


const Column = ({ title, data = [], id}: IColumn) => {
    const { dragOver, dragDrop } = useContext(TableContext)
  return (
    <div className='columnContainer'>
    <div className='columnTitle'>{title}</div>
    <div
    id={`${id.replaceAll(' ', '')}_div`}
    className='tasksContainer'
    onDragOver={dragOver}
    onDropCapture={dragDrop}
    >
        {data.map((task, i: number) => (
            <Fragment key={`title-${i}`}>
                <TaskContainer task={task} />
            </Fragment>
        ))}
    </div>
</div>
  )
}

export default Column