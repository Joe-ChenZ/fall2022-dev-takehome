import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import {TodoItem, RemoveTodoType, CompleteTodoType, UpdateTodoType, AddTagType, Tag} from './TodoTypes';

export default function TodoList() {
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
