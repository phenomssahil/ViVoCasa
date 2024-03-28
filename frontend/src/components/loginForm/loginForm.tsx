import React from "react";
import './loginForm.css';

const LoginForm : React.FC = () => {
    return (
        <div className="login-main">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" name="email" placeholder="email" id="input-email" required />
                </div>
                <div className="input-box">
                    <input type="password" name="password" placeholder="password" id="input-password" required />
                </div>

                <div className="remember-forget">
                    <label ><input type="checkbox" name="rememberme" id="remember-me" />Remember Me</label>
                    <a href="">Forgot Me</a>
                </div>

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>Dont Have an Account? <a href="">Register</a></p>
                </div>
            </form>
        </div>
    )
}
export default LoginForm