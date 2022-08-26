import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { RiCloseCircleLine } from 'react-icons/ri';
import { AddTodoType, AddTagType, Tag, TodoItem } from './TodoTypes';
import { useGlobalContext } from "../Context";
// import AlertBox from './AlertBox';
import Alert from 'react-bootstrap/Alert';
function useForceUpdate(){
    // integer state
     const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}


function TodoForm({tags, addTodo, addTag, removeTag, sortTodoByDate, todos, value, setValue, edit}: {
    tags: Tag[],
    // checkedTags: number[],
    // setSelectedTags: any,
    addTodo: AddTodoType,
    addTag: any,
    removeTag: any,
    sortTodoByDate: any,
    todos: TodoItem[],
    value: number,
    setValue: any,
    edit: any
}) {
    // const [val, setVal] = useState([]);
    const [toDoInput, setTodoInput] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [date, setDate] = useState<string | undefined>(undefined);
    const [show, setShow] = useState(false);
    const {checkedTags, setCheckedTags} = useGlobalContext();
    const [stateButton, setStateButton] = useState(1);
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

    const handleCheckedBoxChange = (e: { target: any; }) => {
        // Destructuring
        const { value, checked } = e.target;
          
        // console.log(`${value} is ${checked}`);
         
        // setSelectedTags([...checkedTags, checked]);
        // Case 1 : The user checks the box
        if (checked) {
            setCheckedTags([...checkedTags, value]);
        }
        
        // Case 2  : The user unchecks the box
        else {
            setCheckedTags(
                [...checkedTags].filter((e) => e !== value)
            );
        }
        
    };
    // console.log(checkedTags);
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("button number :" + stateButton);
        // Add todo
        if (stateButton === 1) {
            setShow(false);
        
            // console.log(date == null);
            if (!date || !(date[0] <= '9' && date[0] >= '0')) {
                setShow(true);
                return;
            }
            addTodo({
                id: Math.floor(Math.random()*10000),  // could use uuid
                title: toDoInput,
                dueDate: date,
                tagList: tags.filter((tag) => checkedTags.includes(tag.id.toString())),
                isComplete: false,
            });
    
            setTodoInput('');
            setTagInput('');
            setDate('');
        }

        if (stateButton === 2) {
            sortTodoByDate(todos);
            // console.log("sorted");
            // setCheckedTags(checkedTags);
            // force rerendering
            setValue(value + 1);
            
        }

        if (stateButton === 3) {
            ;
        }
        
    };
    // setValue(value + 1);
    // if (stateButton === 2) {
        
    // }

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

                            <input 
                                className='form-check-input' 
                                type='checkbox' 
                                key={tag.id + 10000} 
                                value = {tag.id}
                                onChange={handleCheckedBoxChange}
                            />

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
                        className='todo-due-date-box'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                
                <button 
                    name="btn1" 
                    onClick={() => setStateButton(1)} 
                    className='todo-button'
                    >
                    Add todo
                </button>

                <button 
                    name="btn2" 
                    onClick={() => {
                        // sortTodoByDate(todos)
                        setStateButton(2);
                        setValue(value + 1);
                        console.log(value);
                    }}
                    className='todo-button'
                    >
                    Sort todo by date
                </button>

                <button name="btn3" onClick={() => setStateButton(3)} className='todo-button'>
                    Sort todo by completeness
                </button>

                {(show) ? (
                    <Alert className='danger' variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Error</Alert.Heading>
                        <p>
                            Both the todo title and the due date need to be specified!
                        </p>
                    </Alert>
                    
                ) : (
                    <></>
                )}
            </>
          {/* )} */}
        </form>
      );
}

export default TodoForm