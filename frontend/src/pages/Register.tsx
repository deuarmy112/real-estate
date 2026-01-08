import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.register({ email, password, name });
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <section className="container">
      <h2>Create Account</h2>
      <form onSubmit={submit} className="form">
        <label>
          Name
          <input value={name} onChange={(e: any) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={(e: any) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} required />
        </label>
        {error && <div style={{color:'red'}}>{error}</div>}
        <div className="form-actions">
          <button className="btn" type="submit">Create Account</button>
        </div>
      </form>
    </section>
  );
}
