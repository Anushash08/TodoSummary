import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post('http://localhost:5000/api/todos', { title });
      setTodos([...todos, res.data]);
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const summarizeAndSend = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setSummary(data.summary);
      } else {
        setError(data.error || "Failed to get summary.");
      }
    } catch (err) {
      setError("Error fetching summary.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚀 Todo Summary Assistant</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new todo"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>➕ Add</button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <span>{todo.title}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteButton}
              title="Delete"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button onClick={summarizeAndSend} style={styles.summarizeButton}>
        ✨ Summarize Todos
      </button>

      {loading && <div style={styles.spinner}></div>}

      {error && <p style={styles.error}>{error}</p>}

      {summary && (
        <div style={styles.summaryBox}>
          <h2 style={styles.summaryTitle}>📝 Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: 'auto',
    padding: 30,
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    marginBottom: 30,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    padding: 12,
    width: '60%',
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #ccc',
    transition: 'all 0.3s',
    outline: 'none',
  },
  addButton: {
    padding: '12px 20px',
    fontSize: 16,
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    transition: '0.3s ease',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: 10,
  },
  listItem: {
    background: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease',
  },
  deleteButton: {
    background: 'transparent',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
    color: '#dc3545',
    transition: '0.2s ease-in',
  },
  summarizeButton: {
    marginTop: 30,
    padding: '12px 25px',
    fontSize: 16,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 8,
    transition: 'all 0.3s ease-in-out',
  },
  summaryBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#eaf4ff',
    borderRadius: 10,
    textAlign: 'left',
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    color: '#007bff',
  },
  error: {
    color: 'red',
    marginTop: 15,
  },
  spinner: {
    margin: '20px auto',
    width: 40,
    height: 40,
    border: '5px solid #ccc',
    borderTop: '5px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default App;
