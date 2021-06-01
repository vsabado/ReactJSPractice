import './App.css';
import TodoList from './TodoList.js';
import React, { useState, useRef, useEffect } from 'react';
import uuid from 'react-uuid'

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const LOCAL_STORAGE_KEY = 'todoApp.todos';

  useEffect(() => {
    debugger;
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    debugger;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    debugger;
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete
    setTodos(newTodos);
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  function handleAddToDo(e) {
    debugger;
    const name = todoNameRef.current.value;
    if (name === '') {
      return;
    }
    setTodos(v => {
      debugger;
      return [...v, { id: uuid(), name: name, complete: false }]

    })
    todoNameRef.current.value = null;
  }


  return (<>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddToDo} > Add ToDo</button>
    <button onClick={handleClearTodos }>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
  </>
  );
}

export default App;
