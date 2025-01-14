import React, { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { RiCloseCircleLine } from 'react-icons/ri';
import {TodoItem, AddTodoType, AddTagType, RemoveTagType, Tag} from './TodoTypes';
import { useGlobalContext } from "../Context";
// import AlertBox from './AlertBox';
import Alert from 'react-bootstrap/Alert';
import { render } from '@testing-library/react';
import AlertBox from './AlertBox';
import FormControl from 'react-bootstrap/esm/FormControl';

function TodoForm({tags, addTodo, addTag, removeTag, sortTodoByDate, sortTodoByCompletion, todos, forceVal, setForceVal, edit}: {
    tags: Tag[],
    // checkedTags: number[],
    // setSelectedTags: any,
    addTodo: AddTodoType,
    addTag: AddTagType,
    removeTag: RemoveTagType,
    sortTodoByDate: (todos: TodoItem[]) => void,
    sortTodoByCompletion: (todos: TodoItem[]) => void,
    todos: TodoItem[],
    forceVal: number,
    setForceVal: (forceVal: number) => void,
    edit: number
}) {
    const [toDoInput, setTodoInput] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [date, setDate] = useState<string | undefined>(undefined);
    const [show, setShow] = useState(false);
    const [field, setField] = useState([]);
    const {checkedTags, setCheckedTags} = useGlobalContext();
    const [stateButton, setStateButton] = useState(1);
    
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
            if (!date || !(date[0] <= '9' && date[0] >= '0') || !toDoInput) {
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
            setForceVal(forceVal + 1); // force re-render
            
        }

        if (stateButton === 3) {
            sortTodoByCompletion(todos);
            setForceVal(forceVal + 1); // force re-render
        }
        // console.log(todos);
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
                        className='todo-input edit'
                    />
                </div>
                <div className='todo-container'>
                    <input
                        placeholder='Item tag'
                        name='tag'
                        value={tagInput}
                        onChange={handleTagChange}
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
                {/* <div className='todo-container'>
                    <label className='todo-label'>Select tags to filter</label>
                    
                    <Form.Select 
                        multiple value={tags.map(function(tag) {return tag.tag})}
                        className='form-select'
                        >
                        {tags.map(tag => (
                        <option key={tag.id} value={tag.tag}>
                            {tag.tag}
                        </option>
                        ))}
                    </Form.Select>
                 

                </div> */}
                
                
                
                <button name="btn1" onClick={() => setStateButton(1)} className='todo-button'>
                    Add todo
                </button>

                <button name="btn2" onClick={() => setStateButton(2)} className='todo-button'>
                    Sort todo by date
                </button>

                <button name="btn3" onClick={() => setStateButton(3)} className='todo-button'>
                    Sort todo by completeness
                </button>

                {(show) ? (
                    // <AlertBox show={show} setShow={setShow}/>
                
                    <Alert className="alert" variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Input Error!</Alert.Heading>
                        <p>
                            Both the todo title and due date need to be specified!
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

export default TodoForm;
// render(<></>);