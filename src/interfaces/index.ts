
export interface IColumn {
    title: string,
    data?: Array<ITask>,
    id: string
}

export interface ITaskContainer {
    task: ITask,
}

export interface ITask {
    description: string,
    _id: string
  }

export interface IState {
    news: Array<ITask>, doing: Array<ITask>, done: Array<ITask>
  }

export interface IContext {
    tasks: {
        news: Array<ITask>,
        doing: Array<ITask>,
        done: Array<ITask>,
    }, dragDrop: (e: React.MouseEvent<unknown>) => void, dragEnd: (e: React.MouseEvent<unknown>) => void, dragOver: (e: React.MouseEvent<unknown>) => void, dragStart: (e: React.MouseEvent<unknown>) => void, addTask: (e: ITask) => void
}