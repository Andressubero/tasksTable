import { useContext } from 'react';
import Column from './Column';

import './Table.css';
import { TableContext } from '../context';
// dragDrop={dragDrop}
// dragOver={dragOver}
// dragEnd={dragEnd}
// dragStart={dragStart}
// toDo={tasks.news}
// inProgress={tasks.doing}
// done={tasks.done}

const TableContainer = () => {
    const { tasks } = useContext(TableContext)
    const { news, doing, done } = tasks
  return (
    <div className='tableContainer'>
       <Column data={news} title={'TO DO'} id={'news'} />
       <Column data={doing} title={'IN PROGRESS'} id={'doing'} />
       <Column data={done} title={'DONE'} id={'done'} />
    </div>
  )
}

export default TableContainer