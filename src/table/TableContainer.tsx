import { useContext } from 'react';
import Column from './Column';

import './Table.css';
import { TableContext } from '../context';
// dragDrop={dragDrop}
// dragOver={dragOver}
// dragEnd={dragEnd}
// dragStart={dragStart}
// toDo={tasks.todo}
// inProgress={tasks.inprogress}
// done={tasks.done}

const TableContainer = () => {
    const { tasks } = useContext(TableContext)
    const { todo, inprogress, done } = tasks
  return (
    <div className='tableContainer'>
       <Column data={todo} title={'TO DO'} />
       <Column data={inprogress} title={'IN PROGRESS'} />
       <Column data={done} title={'DONE'} />
    </div>
  )
}

export default TableContainer