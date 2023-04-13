import React from 'react'
import './Table.css';
import Column from './Column';
interface IProps {
    toDo: Array<any>,
    inProgress:  Array<any>,
    done:  Array<any>,
    dragStart: (event: any) => void
    dragEnd: (event: any) => void
    dragOver: (event: any) => void
    dragDrop: (event: any) => void
}
const TableContainer = ({ toDo, dragEnd, dragStart, dragDrop, dragOver, inProgress, done }: IProps) => {

  return (
    <div className='tableContainer'>
       <Column dragDrop={dragDrop} dragOver={dragOver} dragEnd={dragEnd} dragStart={dragStart}  data={toDo} title={'TO DO'} />
       <Column dragDrop={dragDrop} dragOver={dragOver} dragEnd={dragEnd} dragStart={dragStart} data={inProgress} title={'IN PROGRESS'} />
       <Column dragDrop={dragDrop} dragOver={dragOver} dragEnd={dragEnd} dragStart={dragStart} data={done} title={'DONE'} />
    </div>
  )
}

export default TableContainer