import React, { createContext, useState, useRef } from 'react';
import { IState, ITask } from '../interfaces';
import { IContext } from '../interfaces';

const initialContext = {
	tasks: { todo: [], inprogress: [], done: []},
	addTask: (e: any) => {},
	dragDrop: (e: any) => {}, dragEnd: (e: any) => {}, dragOver: (e: any) => {}, dragStart: (e: any) => {}

}



export const TableContext = createContext<IContext>(initialContext);

export const TableProvider = (props: any) => {
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
		<TableContext.Provider value={{tasks, dragDrop, dragEnd, dragOver, dragStart, addTask}}>
			{props.children}
		</TableContext.Provider>
	);
};