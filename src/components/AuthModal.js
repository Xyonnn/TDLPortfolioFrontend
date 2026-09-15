import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPassword from "./ResetPasswordForm";

export default function AuthModal({guest}){
    const [mode, setMode] = useState("login");
    return(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
                {mode === "login" && (
                    <LoginForm switchRegister={()=> setMode('register')} switchReset={() => setMode('reset')}/>
                )}
                {mode === "register" && (
                    <RegisterForm switchLogin={()=> setMode('login')}/>
                )}
                {mode === "reset" && (
                    <ResetPassword switchLogin={()=> setMode('login')}></ResetPassword>
                )}
                <button onClick={guest} className="text-gray-400 hover:text-white text-sm mt-4 w-full text-center underline">
                    Continue as guest
                </button>
            </div>
        </div>
    )
}