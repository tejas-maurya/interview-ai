import React, { useState } from 'react'
import "../auth.form.scss"
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router';
const Login = () => {
  const { loading, handleLogin } = useAuth();
    const navigate =useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
    navigate("/")
  };

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              value={email}   // ✅ controlled input (important)
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="enter email address"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              value={password}   // ✅ controlled input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="enter password"
            />
          </div>

          <button type="submit" className="button primary-button">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;