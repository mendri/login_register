import React, { useState, useEffect } from "react";
import HTTP_REQUEST from "../axios/config";
import { useNavigate } from "react-router-dom";
import "../css/Login-And-Register.css";


function Register() {
    const [email, setEmaill] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const EMAIL_REGEX = /^[\w-/.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const IS_THE_FORM_CORRECTLY_TYPED = EMAIL_REGEX.test(email) && password.length >= 8;
    const NAVIGATE = useNavigate();

    useEffect(() => {
        localStorage.removeItem("user");
    }, []);

    async function handleRegisterBtn() {
        try {
            const { data } = await HTTP_REQUEST.post("/register", { user: {
                email,
                password
            }});
            localStorage.setItem("user", JSON.stringify({ token: data.token, email: data.email }));
            return NAVIGATE("/home");
        } catch(e) {
            return setErrMessage(e.response.data.message);
        }
    }

    return(
        <section className="h-screen w-full flex justify-center items-center">
            <form className="w-1/2 h-4/5 flex flex-wrap justify-center items-center border-4 rounded-md shadow-xl" onClick={(e) => e.preventDefault()}>
                <p className="text-red-600">{ errMessage }</p>
                <label className="w-full m-4 text-center flex justify-between" htmlFor="register-email-input">
                    <p className="w-3/12">Email</p>
                    <input onChange={(e) => setEmaill(e.target.value)} className="w-9/12 border border-gray-300 rounded-md bg-gray-50" id="register-email-input" type="email"  data-testid="register-email-input"/>
                </label>
                <label className="w-full m-4 text-center flex justify-between" htmlFor="register-password-input">
                    <p className="w-3/12">Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} className="w-9/12 border border-gray-300 rounded-md bg-gray-50" id="register-password-input" type="password"  data-testid="register-password-input"/>
                </label>
                <div className="w-full flex flex-col justify-center items-center">
                    <button id="register-input-btn" disabled={!IS_THE_FORM_CORRECTLY_TYPED} onClick={handleRegisterBtn} className="w-4/12 h-8 border rounded-md bg-teal-500 text-neutral-50 font-bold" data-testid="register-input-btn">Registrar</button>
                    <button onClick={() => NAVIGATE("/login")} className="w-4/12 h-8 mt-4 border rounded-md bg-orange-500 text-neutral-50 font-bold" data-testid="login-input-btn">Logar</button>
                </div>
            </form>
        </section>
    );
}

export default Register;