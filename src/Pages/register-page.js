import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import "../index.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ValidationWarnings } from "./savedToast";


function RegisterPage() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");

    const [userValidError, setUserValidError] = useState("");
    const [emailValidError, setEmailValidError] = useState("");
    const [passwordValidError, setPasswordValidError] = useState("");
    const [conPasswordValidError, setConPasswordValidError] =useState("");

    const navigate = useNavigate();
    

    const RegisterFunction = async (e) => {
        e.preventDefault();
        

        try{
            //Register Validation
            setUserValidError("");
            setEmailValidError("");
            setPasswordValidError("");
            setConPasswordValidError("");
            const validChars = /^[a-zA-Z0-9_]+$/;

            if(!username){
                setUserValidError("Username is required");
                return;
            }

            if (!validChars.test(username)) {
                setUserValidError("Only letters, numbers and underscore allowed in username");
                return;
            }

            if(!email){
                setEmailValidError("Email is required");
                return;
            }

            if(!email.includes("@")){
                setEmailValidError("Email must contain @");
                return
            }

            if(!password){
                setPasswordValidError("Passowrd is required");
                return;
            }

            if(password !== conPassword){
                setConPasswordValidError("Passwords must be the same");
                return;
            }

            if (password.length < 6) {
                setPasswordValidError("Password must be at least 6 characters");
                return;
            }

            if(password.length > 16){
                setPasswordValidError("Password can only contain 16 characters");
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    firebaseUid: user.uid,
                    email,
                    username
                })
            });
            navigate("/loginpage");
        }catch(err){
            console.error("FULL ERROR:", err);
            console.log("CODE:", err.code);
            console.log("MESSAGE:", err.message);
        }
    }

   return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900">

        <button className="absolute top-6 left-6 text-gray-300 hover:text-white text-lg"><Link to="/">← Home</Link></button>
      
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>

            <form onSubmit={RegisterFunction} className="flex flex-col gap-4">

                <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value); setUserValidError("")}} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"/>
                <ValidationWarnings message={userValidError} visible={!!userValidError}></ValidationWarnings>

                <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value); setEmailValidError("")}} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"/>
                <ValidationWarnings message={emailValidError} visible={!!emailValidError}></ValidationWarnings>

                <input type="password" placeholder="Password"  onChange={(e)=>{setPassword(e.target.value); setPasswordValidError("")}} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"/>
                <ValidationWarnings message={passwordValidError} visible={!!passwordValidError}></ValidationWarnings>

                <input type="password" placeholder="Confirm Password" onChange={(e)=>{setConPassword(e.target.value); setConPasswordValidError("")}} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"/>
                <ValidationWarnings message={conPasswordValidError} visible={!!conPasswordValidError}></ValidationWarnings>

                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold transition">Register</button>

            </form>

                <p className="text-gray-400 text-sm mt-4 text-center">Already have an account?{" "}
                    <span className="text-blue-400 cursor-pointer"><Link to="/loginpage">Login</Link></span>
                </p>

        </div>
    </div>
  );
}

export default RegisterPage;