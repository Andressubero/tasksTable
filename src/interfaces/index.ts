
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
    }, dragDrop: (e: any) => void, dragEnd: (e: any) => void, dragOver: (e: any) => void, dragStart: (e: any) => void, addTask: (e: any) => void
}