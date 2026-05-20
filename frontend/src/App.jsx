import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Contacts from './pages/Contacts';

function App() {
  return (
    <div className="app-root">
      <nav className="main-nav">
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Login</Link>
        <Link to="/contacts">Contacts</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
