// import React from 'react';
import "./LoginForm.css"

export default function LoginForm({handleLogin, handleSignUp}) {
  return (
   <div className="loginForm">
    <div className="containerLogin">
    <input id="register_toggle" type="checkbox"/>
    <div className="slider">
      <form className="form">
        <span className="title">Login</span>
        <div className="form_control">
          <input required="" className="input" type="text"/>
          <label className="label">Username</label>
        </div>
        <div className="form_control">
          <input required="" className="input" type="password"/>
          <label className="label">Password</label>
        </div>
        <button onClick={handleLogin}>Login</button>
  
        <span className="bottom_text">Don't have an account? <label className="swtich" htmlFor="register_toggle">Sign Up</label> </span>
      </form>
      <form className="form">
        <span className="title">Sign Up</span>
        <div className="form_control">
          <input required="" className="input" type="text" name="user"/>
          <label className="label">Username</label>
        </div>
        <div className="form_control">
          <input required="" className="input" type="email" name="user"/>
          <label className="label">Email</label>
        </div>
        <div className="form_control">
          <input required="" className="input" type="password" name="user"/>
          <label className="label">Password</label>
        </div>
        <button onClick={handleSignUp}>Sign Up</button>
  
        <span className="bottom_text">Already have an account? <label className="swtich" htmlFor="register_toggle">Sign In</label> </span>
      </form> 
      </div>
    </div>
  </div>
  )
}
