import "../index.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { ValidationWarnings } from "./savedToast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setError] = useState(false);
  const navigate = useNavigate();

  const LoginFunction = async (e) => {
    e.preventDefault();

    try{
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();

      await fetch(`${process.env.REACT_APP_API_URL}/api/protected`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/tdlpage");

      }catch (err) {
        setError(true);
      }
    };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">

      <button className="absolute top-6 left-6 text-gray-300 hover:text-white text-lg"><Link to="/">← Home</Link></button>

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

        <form onSubmit={LoginFunction} className="flex flex-col gap-4">
        
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"/>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) =>{ setPassword(e.target.value); setError(false)}} className="p-3 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 w-full"/>
            <button type="button" onClick={() =>{ setShowPassword(!showPassword); setError(false)}} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <p className="text-blue-400 text-sm text-right"><Link to="/resetPassword">Forgot password?</Link></p>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold transition">Login</button>
          <div className="text-center">
            <ValidationWarnings message="Wrong mail or password" visible={showError}></ValidationWarnings>
          </div>
        </form>
          <p className="text-gray-400 text-sm mt-4 text-center">Don't have an account?{" "}
            <span className="text-blue-400 cursor-pointer"><Link to="/register">Register</Link></span>
          </p>
      </div>
    </div>
  );
}

export default LoginPage;