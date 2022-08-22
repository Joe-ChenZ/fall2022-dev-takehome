import React, { useState } from 'react'
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';
import TodoForm from './TodoForm';
import {TodoItem, CompleteTodoType, RemoveTodoType, UpdateTodoType, Tag} from './TodoTypes';
const Todo = ({ todos, completeTodo, removeTodo, updateTodo } : {
    todos: TodoItem[],
    completeTodo: CompleteTodoType, 
    removeTodo: RemoveTodoType, 
    updateTodo: UpdateTodoType}) => {

    const [edit, setEdit] = useState<{id: number | null, value:string}>({
        id: null, 
        value: ''
    });

    const submitUpdate = (value: TodoItem) => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        });
    }

    // if (edit.id) {
    //     return <TodoForm 
    //         edit={edit} 
    //         date={}
    //         addTodo={submitUpdate}
    //         addTag={undefined} 
    //         removeTag={undefined}
    //         tags={[]}
    //         />
    // }
    return (
        <>
            {todos.map((todo: TodoItem, index: number) => (
            <>
                <div className='tag-container'>
            
                    {todo.tagList.map((tag: Tag) => (
                        <div key={tag.id} className='displayed-tag-box'>
                            {tag.tag}
                        </div>
                    ))}
                    
                </div>
                
                <div 
                    className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
                    key={index}>
                    
                        
                    <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                        {todo.title}
                    </div>

                    <div>
                        <text> 
                            Due: {todo.dueDate}
                        </text>

                        <div className="icons">
                            <RiCloseCircleLine 
                                onClick={(() => removeTodo(todo.id))}
                                className='delete-icon'/>
                            <TiEdit 
                                onClick={(() => setEdit({id: todo.id, value: todo.title}))}
                                className='edit-icon'/>
                        </div>
                    </div>
                    

                    
                </div>
            </>
            ))}
        </>
    )
};

export default Todo;
// export type {Todo};