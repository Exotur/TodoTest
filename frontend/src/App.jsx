import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Todos abrufen
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: newTodo }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.todos);
        setNewTodo(''); 
      })
      .catch((error) => console.error('Error adding todo:', error));
  };


  const deleteTodo = (index) => {
    fetch(`http://localhost:5000/api/todos/${index}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.error('Error deleting todo:', error));
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Neues Todo hinzufügen"
      />
      <button onClick={addTodo}>Hinzufügen</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
