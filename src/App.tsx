import { useState, useRef } from 'react';
import TableContainer from './table/TableContainer';
import TasksCreator from './tasksCreator/TasksCreator';
import './App.css';
interface ITask {
  description: string,
  _id: string
}
interface IState {
  todo: Array<ITask>, inprogress: Array<ITask>, done: Array<ITask>
}


function App() {
 const [tasks, setTasks] = useState<IState>({todo: [], inprogress: [], done: []})
 const [dragged, setDragged] = useState<ITask>({description: '', _id: ''})
  const addTask = (task: ITask) => {
    setTasks((current) => {
      const news = [...current.todo, task ]
      return  {...current, todo: news}
    })
  }
  const draggableTodo = useRef(null);
  const groupName = useRef<string | null>(null);

  const dragStart = (event: any) => {
    const { target } = event;
    const id = target.id;
    const parentElementId = target.parentElement.id;
    setTimeout(() => {
      target.style.display = "none";
      draggableTodo.current = target;
    }, 0);
    setTasks((prevState) => {
      const state = { ...prevState };
      const fn = (name: string) => {
        groupName.current = name;
        const findedElement = state[name as keyof IState]?.find((i) => i._id.toString() === id);
        if (findedElement && findedElement !== undefined){
           setDragged(findedElement)
        }
       
      };

      switch (parentElementId) {
        case "todo_div":
          fn("todo");
          return state;
        case "inprogress_div":
          fn("inprogress");
          return state;
        case "done_div":
          fn("done");
          return state;
        default:
          return state;
      }
    });
  };
  const dragEnd = (event: any) => {
    event.preventDefault();
    if (draggableTodo.current) {
      const element = draggableTodo.current as HTMLElement
      element.style.display = "block";
    }
    
  };

  const dragOver = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const dragDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const { currentTarget } = event;
    const id = currentTarget.id;
    setTasks((prevState) => {
      const state = { ...prevState };
      const fn = (name: string) => {
        const { current } = groupName;
        let previousParentId = '';
        if (draggableTodo.current) {
          const element = draggableTodo.current as HTMLElement
          previousParentId = element.parentElement?.id  || '';
        }
        if (previousParentId !== id && current) {
          state[current as keyof IState] = state[current as keyof IState].filter((i) => i._id !== dragged._id);
          state[name as keyof IState] = [...state[name as keyof IState], dragged];
        } else {
          if (draggableTodo.current) {
            const element = draggableTodo.current as HTMLElement
            element.style.display = "block";
          }
        }
      };

      switch (id) {
        case "todo_div":
          fn("todo");
          return state;
        case "inprogress_div":
          fn("inprogress");
          return state;
        case "done_div":
          fn("done");
          return state;
        default:
          return state;
      }
    });
  };

  return (
    <div className="app">
      <div className='titleContainer'>Tablero de tareas</div>
      <TasksCreator onSubmit={addTask} />
      <TableContainer
      dragDrop={dragDrop}
      dragOver={dragOver}
      dragEnd={dragEnd}
      dragStart={dragStart}
      toDo={tasks.todo}
      inProgress={tasks.inprogress}
      done={tasks.done}
      />
    </div>
  );
}

export default App;
