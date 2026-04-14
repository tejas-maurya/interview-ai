import React,{useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
const Register = () => {
  const navigate = useNavigate();   // ✅ FIXED
    const {loading,handleRegister}=useAuth()
    const [username,setUsername]=useState(""); 
    const [email,setEmail]=useState(""); 
    const [password,setPassword]=useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({username , email , password}); 
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
                    <input 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    type="text" name="username" id="username" placeholder='enter username ' />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    type="email" name="email" id="email" placeholder='enter email address' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    type="password" name="password" id="password" placeholder='enter password' />

                </div>

               <button className="button primary-button">register</button>

            </form>
            <p>Already have an account?{" "} <Link to={"/login"} >Login</Link></p>

        </div>
    </main>
  )
}

export default Register