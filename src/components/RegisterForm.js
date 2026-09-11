import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ValidationWarnings } from "../Pages/savedToast";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import api from "../api/axiosInstance";

export default function RegisterForm({switchLogin}){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");

    const [userValidError, setUserValidError] = useState("");
    const [emailValidError, setEmailValidError] = useState("");
    const [passwordValidError, setPasswordValidError] = useState("");
    const [conPasswordValidError, setConPasswordValidError] =useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);

    const RegisterFunction = async (e) => {
        e.preventDefault();
        try{
            const validUsernameChars = /^[a-zA-Z0-9_]+$/;
            const validPasswordChars = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,16}$/;
            
            if(!username){
                setUserValidError("Username is required");
                return;
            }else if(!validUsernameChars.test(username)){
                setUserValidError("Only letters, numbers and underscore allowed in username");
                return;
            }else if(username.length > 16){
                setUserValidError("Username can only contain 16 characters");
                return;
            }

            if(!email){
                setEmailValidError("Email is required");
                return;
            }else if(!email.includes("@")){
                setEmailValidError("Email must contain @");
                return
            }

            if(!password){
                setPasswordValidError("Passowrd is required");
                return;
            }else if(!validPasswordChars.test(password)){
                setPasswordValidError("Password must include uppercase, lowercase, number and special character");
                return;
            }

            if(password !== conPassword){
                setConPasswordValidError("Passwords must be the same");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            await api.post('/api/protected', {
                firebaseUid: user.uid,
                email,
                username
            });
            switchLogin();
        }catch(err){
            console.log(err);
        }

    }
    return(
        <>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
                <form onSubmit={RegisterFunction} className="flex flex-col gap-4">

                    <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value); setUserValidError("")}} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"/>
                    <ValidationWarnings message={userValidError} visible={!!userValidError}></ValidationWarnings>

                    <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value); setEmailValidError("")}} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"/>
                    <ValidationWarnings message={emailValidError} visible={!!emailValidError}></ValidationWarnings>
                    
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => { setPassword(e.target.value); setPasswordValidError("");}} className="p-3 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500 w-full"/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                    </div>
                    <ValidationWarnings message={passwordValidError} visible={!!passwordValidError}></ValidationWarnings>

                    <div className="relative">
                        <input type={showConPassword ? "text" : "password"} placeholder="Confirm Password" onChange={(e) => { setConPassword(e.target.value); setConPasswordValidError("");}} className="p-3 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500 w-full"/>
                            <button type="button" onClick={() => setShowConPassword(!showConPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                {showConPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    <ValidationWarnings message={conPasswordValidError} visible={!!conPasswordValidError}></ValidationWarnings>
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold transition">Register</button>

                </form>

                <p className="text-gray-400 text-sm mt-4 text-center">Already have an account?{" "}
                    <span onClick={switchLogin} className="text-blue-400 cursor-pointer">Login</span>
                </p>
        </>
    )
}