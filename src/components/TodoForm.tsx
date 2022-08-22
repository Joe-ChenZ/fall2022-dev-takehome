import React, { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AddTodoType, AddTagType, Tag } from './TodoTypes';

function TodoForm({tags, addTodo, addTag, removeTag, edit}: {
    tags: Tag[]
    addTodo: AddTodoType,
    addTag: any,
    removeTag: any,
    edit: any
}) {
    const [toDoInput, setTodoInput] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [date, setDate] = useState<string | undefined>(undefined);

    const inputRef = useRef<any>(null);
    
    // useEffect(() => {
    //     if (inputRef.current != null) {
    //         inputRef.current?.focus();
    //     }
    // });

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
        console.log(date == null);
        if (!date || !(date[0] <= '9' && date[0] >= '0')) {
            return (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            )
        }
        addTodo({
            id: Math.floor(Math.random()*10000),  // could use uuid
            title: toDoInput,
            dueDate: date,
            tagList: tags,
            isComplete: false,
        });

        setTodoInput('');
        setTagInput('');
        setDate('mm/dd/yyyy');
    };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {/* {edit ? (
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
                        value={tagInput}
                        onChange={handleTagChange}
                        ref={inputRef}
                        className='todo-input edit'
                    />
                </div>
              
                <button onClick={handleSubmit} className='todo-button edit'>
                    Update
                </button>
            </>
          ) :  */}
          
          {/* ( */}
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
                                    style={{scale:'75%'}}
                                    onClick={(() => removeTag(tag.id))}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className='todo-container'>
                    <label className='todo-label'>Due Date</label>
                    <Form.Control 
                        type="date" 
                        name='dueDate' 
                        className='todo-due-date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
              
                <button onClick={handleSubmit} className='todo-button'>
                    Add todo
                </button>
            </>
          {/* )} */}
        </form>
      );
}

export default TodoForm