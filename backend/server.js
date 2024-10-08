import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 


let todos = ['Todo 1', 'Todo 2', 'Todo 3'];


app.get('/api/todos', (req, res) => {
  res.json(todos);
});


app.post('/api/todos', (req, res) => {
  const newTodo = req.body.todo;
  if (newTodo) {
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo hinzugefügt', todos });
  } else {
    res.status(400).json({ message: 'Kein Todo-Inhalt angegeben' });
  }
});


app.delete('/api/todos/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < todos.length) {
    todos.splice(index, 1);
    res.json({ message: 'Todo gelöscht', todos });
  } else {
    res.status(404).json({ message: 'Todo nicht gefunden' });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
