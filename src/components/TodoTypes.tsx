import { MouseEventHandler } from "react";
export type TodoItem = {
    dueDate: string,
    tagList: Tag[],
    isComplete: boolean,
    title:string,
    id: number,
}

export type AddTodoType = (id: TodoItem) => void;

export type CompleteTodoType = (id: number | null) => void;

export type RemoveTodoType = (id: number | null) => void;

export type UpdateTodoType = (id: number | null, arg1: TodoItem) => void;

export type AddTagType = (tag: Tag | null) => void
 
export type RemoveTagType = (id: number | null) => void;

export type Tag = {
    id: any,
    tag: string,
}