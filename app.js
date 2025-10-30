import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/users').then(res => setUsers(res.data));
  }, []);

  const addUser = () => {
    axios.post('http://localhost:5000/users', form).then(res => {
      setUsers([...users, res.data]);
      setForm({ name: '', email: '' });
    });
  };

  const deleteUser = id => {
    axios.delete(`http://localhost:5000/users/${id}`).then(() => {
      setUsers(users.filter(u => u._id !== id));
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD App</h1>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <button onClick={addUser}>Add</button>

      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} ({u.email}) <button onClick={() => deleteUser(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
