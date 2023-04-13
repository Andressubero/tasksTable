import React, { createContext, useState, useRef } from 'react';
import { IState, ITask } from '../interfaces';
import { IContext } from '../interfaces';

const initialContext = {
	tasks: { news: [], doing: [], done: []},
	addTask: (e: ITask) => {},
	dragDrop: (e: React.MouseEvent<unknown>) => {}, dragEnd: (e: React.MouseEvent<unknown>) => {}, dragOver: (e: React.MouseEvent<unknown>) => {}, dragStart: (e: React.MouseEvent<unknown>) => {}

}



export const TableContext = createContext<IContext>(initialContext);

export const TableProvider = (props: any) => {
	const [tasks, setTasks] = useState<IState>({news: [], doing: [], done: []})
	const [dragged, setDragged] = useState<ITask>({description: '', _id: ''})
	 const addTask = (task: ITask) => {
	   setTasks((current) => {
		 const news = [...current.news, task ]
		 return  {...current, news: news}
	   })
	 }
	 const draggableTodo = useRef<HTMLElement | null>(null);
	 const groupName = useRef<string | null>(null);
   
	 const dragStart = (event: React.MouseEvent<unknown>) => {
	   const target  = event.target as HTMLDivElement;
	   const id = target.id;
	   const parentElementId = target.parentElement?.id;
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
		   case "news_div":
			 fn("news");
			 return state;
		   case "doing_div":
			 fn("doing");
			 return state;
		   case "done_div":
			 fn("done");
			 return state;
		   default:
			 return state;
		 }
	   });
	 };
	 const dragEnd = (event: React.MouseEvent<unknown>) => {
	   event.preventDefault();
	   if (draggableTodo.current) {
		 const element = draggableTodo.current as HTMLElement
		 element.style.display = "block";
	   }
	   
	 };
   
	 const dragOver = (event: React.MouseEvent<unknown>) => {
	   event.stopPropagation();
	   event.preventDefault();
	 };
   
	 const dragDrop = (event: React.MouseEvent<unknown>) => {
	   event.preventDefault();
	   event.stopPropagation();
	   const  currentTarget  = event.currentTarget as HTMLDivElement;
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
		   case "news_div":
			 fn("news");
			 return state;
		   case "doing_div":
			 fn("doing");
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