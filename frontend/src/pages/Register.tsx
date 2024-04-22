import { useState } from "react";
import LoginForm from "../components/loginForm/loginForm"
import Navbar from "../components/navbar/Navbar";

const Register: React.FC = () => {
    const [isCartUpdated,setIsCartUpdated] = useState(false);
    return(
        <>
        <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>
        <LoginForm type="signup"/>
        </>
    )
}
export default Register;