import React from 'react'
import "../auth.form.scss"

const Login = () => {
    const handlesubmit=(e)=>{
        e.preventDefault();
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='enter email address' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='enter password' />

                </div>

               <button className="button primary-button">Login</button>

            </form>

        </div>
    </main>
  )
}

export default Login