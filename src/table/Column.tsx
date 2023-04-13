import React, { Fragment } from 'react';
import './Table.css';
import TaskContainer from './TaskContainer';

interface IProps {
    title: string,
    data?: Array<any>,
    dragStart: (event: any) => void
    dragEnd: (event: any) => void
    dragOver: (event: any) => void
    dragDrop: (event: any) => void
}
const Column = ({ title, data = [], dragEnd, dragStart, dragDrop, dragOver }: IProps) => {
    console.log(`${title.toLowerCase().replaceAll(' ', '')}_div`)
  return (
    <div className='columnContainer'>
    <div className='columnTitle'>{title}</div>
    <div
    id={`${title.toLowerCase().replaceAll(' ', '')}_div`}
    className='tasksContainer'
    onDragOver={dragOver}
    onDropCapture={dragDrop}
    >
        {data.map((task, i: number) => (
            <Fragment key={`title-${i}`}>
                <TaskContainer dragStart={dragStart} dragEnd={dragEnd} task={task} />
            </Fragment>
        ))}
    </div>
</div>
  )
}

export default Column