import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  // State for managing todos
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editIndex, setEditIndex] = useState(null); // For tracking which todo is being edited

  // Function to add a new todo
  const addTodo = () => {
    if (!title || !body) return; // Prevent empty todos
    const newTodo = { title, body, completed: false };
    setTodos([...todos, newTodo]);
    setTitle('');
    setBody('');
  };

  // Function to delete a todo
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Function to mark todo as done
  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Function to start editing a todo
  const startEdit = (index) => {
    setEditIndex(index);
    setTitle(todos[index].title);
    setBody(todos[index].body);
  };

  // Function to update an existing todo
  const updateTodo = () => {
    const updatedTodos = todos.map((todo, index) => 
      index === editIndex ? { ...todo, title, body } : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setTitle('');
    setBody('');
  };

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Description"
          />
          {editIndex !== null ? (
            <button onClick={updateTodo}>Update Todo</button>
          ) : (
            <button onClick={addTodo}>Add Todo</button>
          )}
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <h3>{todo.title}</h3>
              <p>{todo.body}</p>
              <button onClick={() => toggleComplete(index)}>
                {todo.completed ? 'Undo' : 'Done'}
              </button>
              <button onClick={() => startEdit(index)}>Edit</button>
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
