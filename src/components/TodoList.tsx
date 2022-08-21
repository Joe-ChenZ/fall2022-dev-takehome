import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import {TodoItem, RemoveTodoType, CompleteTodoType, UpdateTodoType} from './TodoTypes';

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (todo:TodoItem) => {
    if(!todo.text || /^\s*$/.test(todo.text)) {
      return ;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log(...newTodos);
  };

  const updateTodo: UpdateTodoType = (todoId: number | null, newValue: TodoItem) => {
    if(!newValue.text || /^\s*$/.test(newValue.text)) {
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

  return (
    <div>
      <TodoForm 
        onSubmit={addTodo}
        
      />

      <Todo 
        todos={todos} 
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}
