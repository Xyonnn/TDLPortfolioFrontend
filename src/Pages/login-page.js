import "../index.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        console.error(err);
      }
    };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">

      <button className="absolute top-6 left-6 text-gray-300 hover:text-white text-lg"><Link to="/">← Home</Link></button>

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

        <form onSubmit={LoginFunction} className="flex flex-col gap-4">

          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"/>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"/>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold transition">Login</button>
        </form>
          <p className="text-gray-400 text-sm mt-4 text-center">Don't have an account?{" "}
            <span className="text-blue-400 cursor-pointer"><Link to="/register">Register</Link></span>
          </p>
      </div>
    </div>
  );
}

export default LoginPage;