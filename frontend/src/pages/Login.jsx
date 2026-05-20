import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login(form);
    if (res && res.token) {
      localStorage.setItem('token', res.token);
      navigate('/contacts');
    } else {
      alert(res.message || 'Login failed');
    }
  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2>Welcome Back</h2>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={(e)=>
              setForm({
                ...form,
                email:e.target.value
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={(e)=>
              setForm({
                ...form,
                password:e.target.value
              })
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="switch-text">
          Don't have an account?
          <Link to="/signup">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}