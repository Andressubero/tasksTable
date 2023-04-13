import { TableProvider } from './context';
import TableContainer from './table/TableContainer';
import TasksCreator from './tasksCreator/TasksCreator';
import './App.css';


function App() {
  return (
    <TableProvider>
       <div className="app">
          <h1 className='titleContainer'>Tasks Table</h1>
          <TasksCreator />
          <TableContainer />
      </div>
    </TableProvider>
   
  );
}

export default App;
