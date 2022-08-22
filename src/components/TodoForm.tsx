import React, { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AddTodoType, AddTagType, Tag } from './TodoTypes';

function TodoForm({tags, addTodo, addTag, removeTag, edit}: {
    tags: Tag[],
    addTodo: AddTodoType,
    addTag: any,
    removeTag: any,
    edit: any
}) {
    const [toDoInput, setTodoInput] = useState('');
    const [tagInput, setTagInput] = useState('');

    const inputRef = useRef<any>(null);
    
    useEffect(() => {
        if (inputRef.current != null) {
            inputRef.current?.focus();
        }
    });

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTodoInput(e.target.value);
    }

    const handleTagChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTagInput(e.target.value);
    }

    const handleTagSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        addTag({
            id: Math.floor(Math.random()*10000),  // could use uuid
            tag: tagInput
        });

        setTagInput('');
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        addTodo({
            id: Math.floor(Math.random()*10000),  // could use uuid
            title: toDoInput,
            dueDate: new Date(),
            tagList: tags,
            isComplete: false,
        });

        setTodoInput('');
    };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {edit ? (
            <>
                <div className='todo-container'>
                    <input 
                        placeholder='Item title'
                        value={toDoInput}
                        onChange={handleChange}
                        name='title'
                        ref={inputRef}
                        className='todo-input edit'
                    />
                </div>
                <div className='todo-container'>
                    <input
                        placeholder='Item tag'
                        name='tag'
                    />
                </div>
              
                <button onClick={handleSubmit} className='todo-button edit'>
                    Update
                </button>
            </>
          ) : (
            <>
                <div className='todo-container'>
                    <label className='todo-label'>Title</label>
                    <input
                        placeholder='Add a todo'
                        value={toDoInput}
                        onChange={handleChange}
                        name='itemTitle'
                        className='todo-input'
                        ref={inputRef}
                    />

                </div>
                
                <div className='todo-container'>
                    <label className='todo-label'>Tag</label>
                    <input
                        placeholder='Enter your item tag'
                        name='tag'
                        value={tagInput}
                        onChange={handleTagChange}
                        className='todo-input'
                        ref={inputRef}
                    />
                    <button className='todo-button' onClick={handleTagSubmit}>
                        Create New Tag
                    </button>
                </div>

                <div className='tag-container'>
                    
                    {tags.map((tag: Tag) => (
                        <div className='tag-box'>
                            <div key={tag.id}>
                                {tag.tag}
                            </div>

                            <div className="icons">
                                <RiCloseCircleLine 
                                    className='delete-icon'
                                    onClick={(() => removeTag(tag.id))}
                                />
                            </div>
                        </div>
                    ))}
                        
                        
                    
                </div>

                <div className='todo-container'>
                    <label className='todo-label'>Due Date</label>
                    <Form.Control type="date" name='dueDate' className='todo-due-date'/>
                </div>
              
                <button onClick={handleSubmit} className='todo-button'>
                    Add todo
                </button>
            </>
          )}
        </form>
      );
}

export default TodoForm