export type TodoItem = {
    title: string,
    dueDate: Date,
    tagList: string[],
    isComplete: boolean,
    text:string,
    id: number,
}

export type CompleteTodoType = (id: number | null) => void;

export type RemoveTodoType = (id: number | null) => void;

export type UpdateTodoType = (id: number | null, arg1: TodoItem) => void;