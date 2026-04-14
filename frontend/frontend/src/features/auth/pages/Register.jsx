import React from 'react'
import { useNavigate ,Link} from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();   // ✅ FIXED

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example navigation after submit
    navigate("/login");
  };
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder='enter username ' />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='enter email address' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='enter password' />

                </div>

               <button className="button primary-button">register</button>

            </form>
            <p>Already have an account?{" "} <Link to={"/login"} >Login</Link></p>

        </div>
    </main>
  )
}

export default Register