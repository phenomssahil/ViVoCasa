import React, { useEffect, useState } from "react";
import './loginForm.css';
import axios from "axios";
import Cookies from 'js-cookie'

interface LoginFormProps{
    type:string
}

const LoginForm : React.FC<LoginFormProps> = ({type}) => {
    useEffect(()=>{
        var token = Cookies.get('token')
        if(token) {
            window.location.href = '/profile'
        }
    },[])

    const [isPasswordVerified,setIsPasswordVerified] = useState<boolean>();

    function handleSubmit(event: any) {
        event.preventDefault();

        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/${type}`,{
            name:event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        },{
            withCredentials: true,
        })
        .then(response=>{
            console.log(response);
            if(response.status === 200){
                window.location.href = '/profile'
            }
        })
        .catch(error=>{
            console.log(error);
            if(error.response.status === 401){
                setIsPasswordVerified(false);
            }
        })
    }
    return (
        <div id="login-form" className="border-[3px] border-black rounded-[5px] w-[30vw] 
        minh-[30vw] pb-[2vw] mx-auto absolute top-[50vh] left-[50vw] -translate-x-1/2 -translate-y-1/2 
        text-center flex-col gap-4 items-center justify-center">
            
            {type=='login' && (<h1 className="font-futura text-[5.5vw] mt-[1vw] font-extrabold uppercase">sign in</h1>)}
            {type=='signup' && (<h1 className="font-futura text-[5.5vw] mt-[1vw] font-extrabold uppercase">sign up</h1>)}

            <form onSubmit={handleSubmit} >
                
                {type=='signup' && (<div className="input-box">
                    <input className="w-[22vw] h-[2.8vw] border-2 border-black 
                    rounded-[20px] p-[1vw] font-helvetica text-[1vw] mt-[1vw] mb-[1vw]" 
                    type="text" name="name" placeholder="Name" id="input-name" required />
                </div>)}
                <div className="input-box">
                    <input className="w-[22vw] h-[2.8vw] border-2 border-black 
                    rounded-[20px] p-[1vw] font-helvetica text-[1vw] mb-[1vw]" 
                    type="text" name="email" placeholder="Email" id="input-email" required />
                </div>
                <div className="input-box">
                    <input className="w-[22vw] h-[2.8vw] border-2 border-black 
                    rounded-[20px] p-[1vw] font-helvetica text-[1vw] mb-[1vw]" 
                    type="password" name="password"  placeholder="Password" id="input-password" 
                    required />
                    {isPasswordVerified==false && (
                        <div className="font-helvetica text-[0.9vw] text-red-500">Email or password is wrong</div>
                    )}
                </div>

                {/* {type=='login' && (<div className="w-[22vw] mx-auto mt-[0.5vw] remember-forget flex gap-[1vw] justify-between">
                    <label className="font-helvetica "><input className="mx-2" type="checkbox" name="rememberme" id="remember-me"/>
                    Remember Me</label>
                    <a href="http://localhost:5173/forgot-password" className="font-helvetica ">Forgot Me</a>
                </div>)} */}

                {type=='login' && (<button className="font-helvetica w-[22vw] h-[2.8vw] rounded-[20px] text-white my-3
                 bg-black" type="submit">Login</button>)}

                {type=='signup' && (<button className="font-helvetica w-[22vw] h-[2.8vw] rounded-[20px] text-white my-3
                 bg-black" type="submit">Create Account</button>)}

                {type=='login' && (<div className="register-link">
                    <p className="font-helvetica">Dont Have an Account? <a className="font-helvetica font-bold" href="/signup">Register</a></p>
                </div>)}
            </form>
        </div>
    )
}
export default LoginForm