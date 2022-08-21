import React, { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
function TodoForm(props:any) {
    const [input, setInput] = useState('');

    const inputRef = useRef<any>(null);
    
    useEffect(() => {
        if (inputRef.current != null) {
            inputRef.current?.focus();
        }
    });

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setInput(e.target.value);
    }
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random()*10000), 
            text: input
        });

        setInput('');
    };
    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {props.edit ? (
            <>
                <div className='todo-container'>
                    <input 
                        placeholder='Item title'
                        value={input}
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
                    value={input}
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
                        className='todo-input'
                    />
                    <button className='todo-button'>
                        Create New Tag
                    </button>
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