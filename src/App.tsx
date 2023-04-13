import { TableProvider } from './context';
import TableContainer from './table/TableContainer';
import TasksCreator from './tasksCreator/TasksCreator';
import './App.css';


function App() {
  return (
    <TableProvider>
       <div className="app">
          <div className='titleContainer'>Tablero de tareas</div>
          <TasksCreator />
          <TableContainer />
      </div>
    </TableProvider>
   
  );
}

export default App;
