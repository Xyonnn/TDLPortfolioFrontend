import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import "../index.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


function RegisterPage() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    const RegisterFunction = async (e) => {
        e.preventDefault();
        

        try{
            if (!email || !password || !username) {
                alert("Fill all fields!");
            return;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters");
            return;
            }
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            console.log("FIREBASE OK:", user);

            const res = await fetch("http://localhost:1412/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    firebaseUid: user.uid,
                    email,
                    username
                })
            });

            const data = await res.json();
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

                <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"/>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"/>
                <input type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"/>
                <input type="password" placeholder="Confirm Password" className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"/>

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