import React, { useState, useContext } from 'react'
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';
import {TodoItem, CompleteTodoType, RemoveTodoType, UpdateTodoType, Tag} from './TodoTypes';
import { useGlobalContext } from '../Context';
const Todo = ({ todos, completeTodo, removeTodo, updateTodo } : {
    todos: TodoItem[],
    completeTodo: CompleteTodoType, 
    removeTodo: RemoveTodoType, 
    updateTodo: UpdateTodoType,
}) => {

    const [edit, setEdit] = useState<{id: number | null, value:string}>({
        id: null, 
        value: ''
    });

    const {checkedTags, setCheckedTags} = useGlobalContext();

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
    
    // todos.map((todo: TodoItem) => {
    //     console.log(todo)
        
    //     todo.tagList.map((tag: Tag) => {
    //         console.log(checkedTags.includes(tag.id.toString()));
    //         console.log(tag.id);
    //         return null;
    //     })
    //     return null;
    // })
    console.log(todos);
    return (
        <>
            {todos.map((todo: TodoItem, index: number) => (
            <>
                <div className='tag-container'>
                    
                    {todo.tagList.map((tag: Tag) => (
                        <>
                            { true ? (
                                <div key={tag.id} className='displayed-tag-box'>
                                    {tag.tag}
                                </div>
                                ) : (
                                    <></>
                                )
                            }
                            
                        </>
                        
                    ))}
                    
                </div>
                
                <div 
                    className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
                    key={index}>
                       
                    <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                        {todo.title}
                    </div>

                    <div className='todo-inline'>
                        <span className='todo-due-date-text'> 
                            Due: {todo.dueDate}
                        </span>

                        <span className="icons">
                            <RiCloseCircleLine 
                                onClick={(() => removeTodo(todo.id))}
                                className='delete-icon'/>
                            {/* <TiEdit 
                                onClick={(() => setEdit({id: todo.id, value: todo.title}))}
                                className='edit-icon'/> */}
                        </span>
                    </div>
                    

                    
                </div>
            </>
            ))}
        </>
    )
};

export default Todo;