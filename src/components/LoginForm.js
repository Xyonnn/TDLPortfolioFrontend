import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ValidationWarnings } from "../Pages/savedToast";
import api from "../api/axiosInstance";

export default function LoginForm({switchRegister, switchReset}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setError] = useState(false);

    const LoginFunction = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            await api.get('/api/protected');
        }catch (err) {
            setError(true);
        }
    };

    return(
        <> 
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
            <form onSubmit={LoginFunction} className="flex flex-col gap-4">
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"/>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) =>{ setPassword(e.target.value); setError(false)}} className="p-3 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 w-full"/>
                        <button type="button" onClick={() =>{ setShowPassword(!showPassword); setError(false)}} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold transition">Login</button>
                <div className="text-center">
                    <ValidationWarnings message="Wrong mail or password" visible={showError}></ValidationWarnings>
                </div>
            </form>
            <div className="w-full text-center">
                <button onClick={switchReset} className="text-blue-400 text-sm text-center">Forgot password?</button>
                <p className="text-gray-400 text-sm mt-4 text-center">Don't have an account?{" "}
                    <span onClick={switchRegister} className="text-blue-400 cursor-pointer">Register</span>
                </p>
            </div>
        </>
    )
}