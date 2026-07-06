import "./index.css";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import LoginPage from "./Pages/login-page.js";
import RegisterPage from "./Pages/register-page.js";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import TDLPage from "./Pages/TDL-page.js";
import ResetPassword from "./Pages/resetPassword-page.js";
import ChangePassword from "./Pages/changePassword-page.js";
import { Alert } from "./Pages/savedToast.js";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastVisible, setToastVisible] = useState(true);

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
        <div className="flex flex-1 flex-col md:flex-row items-center justify-center gap-6 px-4 py-10">
          <Link to="/tdlpage" className="w-full max-w-sm">
            <div className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-2xl shadow-xl p-8 h-64 flex flex-col justify-between border border-gray-700 hover:border-blue-500 hover:scale-[1.02]">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  To Do App
                </h2>

                <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                  Simple task management application built with React, Node.js and Tailwind CSS.
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <span className="bg-gray-700 text-xs text-gray-300 px-3 py-1 rounded-full">
                  React
                </span>

                <span className="bg-gray-700 text-xs text-gray-300 px-3 py-1 rounded-full">
                  Node.js
                </span>

                <span className="bg-gray-700 text-xs text-gray-300 px-3 py-1 rounded-full">
                  Firebase
                </span>

                <span className="bg-gray-700 text-xs text-gray-300 px-3 py-1 rounded-full">
                  MongoDB
                </span>
              </div>
            </div>
          </Link>

          <div className="w-full max-w-sm">
            { /* 
              =======================
              dodac link do minishop 
              =======================
            */}
            <a href="https://mini-shop-portfolio-six.vercel.app">
            <div className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-2xl shadow-xl p-8 h-64 flex flex-col justify-between border border-gray-700 hover:border-blue-500 hover:scale-[1.02]">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Mini Shop
                </h2>

                <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                  Small e-commerce project built with TypeScript, Next.js and Tailwind CSS.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-700 text-xs text-gray-300 px-3 py-1 rounded-full">
                    TypeScript
                  </span>

                  <span className="bg-gray-700 text-xs text-gray-300 px-3 py-1 rounded-full">
                    MongoDB
                  </span>

                  <span className="bg-gray-700 text-xs text-gray-300 px-3 py-1 rounded-full">
                    Next.js
                  </span>
                </div>

                <span className="text-yellow-400 text-sm font-medium">
                  Under Construction
                </span>
              </div>
            </div>
            </a>
          </div>
        </div>

        <div className="w-full text-center py-4 bg-gray-800">
          <span className="text-gray-400">Made by </span>
            <a href="https://github.com/Xyonnn" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors duration-200 font-medium">
              Xyon
            </a>
        </div>
        <Alert title="Warning!" message="This website was created solely for my portfolio purposes. Please do not use any sensitive information." visible={toastVisible} onClose={() => setToastVisible(false)}/>
      </div>
      
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/resetPassword" 
          element={<ResetPassword/>}>
        </Route>
        <Route
          path="/changePassword" 
          element={<ProtectedRoute user={user} loading={loading}><ChangePassword user={user}/></ProtectedRoute>}>
        </Route>
        <Route
          path="/tdlpage"
          element={<ProtectedRoute user={user} loading={loading}><TDLPage user={user}/></ProtectedRoute>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
