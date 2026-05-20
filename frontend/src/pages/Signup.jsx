import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/authService';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup(form);
    if (res && res.success) {
      navigate('/login');
    } else {
      alert(res.message || 'Signup failed');
    }
  }

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h2>Create Account</h2>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          <input
            type="text"
            placeholder="Enter Name"
            value={form.name}
            onChange={(e)=>
              setForm({
                ...form,
                name:e.target.value
              })
            }
            required
          />

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
            Sign Up
          </button>

        </form>

        <p className="switch-text">
          Already have an account?
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}