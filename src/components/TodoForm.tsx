import React, { useEffect, useRef, useState } from 'react'

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
              <input
                placeholder='Update your item'
                value={input}
                onChange={handleChange}
                name='text'
                ref={inputRef}
                className='todo-input edit'
              />
              <button onClick={handleSubmit} className='todo-button edit'>
                Update
              </button>
            </>
          ) : (
            <>
              <input
                placeholder='Add a todo'
                value={input}
                onChange={handleChange}
                name='text'
                className='todo-input'
                ref={inputRef}
              />
              <button onClick={handleSubmit} className='todo-button'>
                Add todo
              </button>
            </>
          )}
        </form>
      );
}

export default TodoForm