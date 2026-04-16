import "./index.css";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import LoginPage from "./Pages/login-page.js";
import RegisterPage from "./Pages/register-page.js";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Cog } from "lucide-react";
import TDLPage from "./Pages/TDL-page.js";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/loginpage" />;
    }
    return children;
  };

  function Homepage() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">

        <div className="w-full flex justify-between items-center px-6 py-4 bg-gray-800">
          <Link to="/">
            <h1 className="text-xl font-bold">Homepage</h1>
          </Link>

          <div className="flex items-center gap-4">
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
              <Cog size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center gap-8">
          <Link to="/tdlpage">
            <div className="w-64 h-64 bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl">
              To Do App
            </div>
          </Link>

          <div className="w-64 h-64 bg-gray-800 rounded-2xl shadow-lg text-center flex items-center justify-center text-white text-xl">
            Mini Shop<br></br>
            Under Construction
          </div>
        </div>

        <div className="w-full text-center py-4 bg-gray-800">
          <p className="text-gray-400">Portfolio</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/tdlpage"
          element={<ProtectedRoute user={user}><TDLPage user={user}/></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
