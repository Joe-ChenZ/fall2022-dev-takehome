import React, { Dispatch, SetStateAction, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import {TodoItem, RemoveTodoType, CompleteTodoType, UpdateTodoType, AddTagType, Tag} from './TodoTypes';

// export default function TodoList({checkedTags, setSelectedTags}:{
//   checkedTags: number[];
//   setSelectedTags: any;
// }) {


export default function TodoList({forceVal, setForceVal} : {
  forceVal: number,
  setForceVal : any,
}) {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [tags, setTags] = useState<Tag[]>([]);

  // --------------------- todo functions ----------------------

  const addTodo = (todo: TodoItem) => {
    if(!todo.title || /^\s*$/.test(todo.title)) {
      return ;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    // console.log(...newTodos);
  };

  const updateTodo: UpdateTodoType = (todoId: number | null, newValue: TodoItem) => {
    if(!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
  }

  const removeTodo: RemoveTodoType = (id: number | null) => {
    const removeArr = [...todos].filter(todo => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo: CompleteTodoType = (id: number | null) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete
      }
      return todo;
    })
    setTodos(updatedTodos);
  };

  const sortTodoByDate = (todos: TodoItem[]) => {
    todos.sort(function(a, b) {
        const dateA = a.dueDate;
        const dateB = b.dueDate;
        // if (!dateA || !dateB) {
        //     if (date)
        // }
        return (dateA < dateB) ? -1 : 1;
    })
    console.log("sorted");
  }

  const sortTodoByCompletion = (todos: TodoItem[]) => {
    todos.sort(function(a: TodoItem, b: TodoItem) {
        const completeA = a.isComplete;
        const completeB = b.isComplete;
        // if (!dateA || !dateB) {
        //     if (date)
        // }
        if (completeA && !completeB) {
          return -1;
        }
        if (!completeA && completeB) {
          return 1;
        }
        return 0;
    })
    console.log("sorted");
  }

  // --------------------- tag functions ----------------------

  const addTag = (tag: Tag | null) => {
    if (!tag || /^\s*$/.test(tag.tag)) {
      return;
    }
    const newTags = [...tags, tag];
    console.log(newTags);
    setTags(newTags);
  }

  const removeTag = (id: number | null) => {
    const removeArr = [...tags].filter(tag => tag.id !== id);
    setTags(removeArr);
  };

  // --------------------- due date functions ----------------------

  // const addDueDate = (date: Date | null) => {
  //   if (!date) {
  //     return;
  //   }

  //   setDate(date);
  // }


  return (
    <div>
      <TodoForm 
        tags={tags}
        // date={date}
        addTodo={addTodo}
        addTag={addTag}
        removeTag={removeTag}
        sortTodoByDate={sortTodoByDate}
        sortTodoByCompletion={sortTodoByCompletion}
        todos={todos}
        forceVal={forceVal}
        setForceVal={setForceVal}
        edit={0}
      />

      <Todo 
        todos={todos} 
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        // addTag={}
      />
    </div>
  );
}
