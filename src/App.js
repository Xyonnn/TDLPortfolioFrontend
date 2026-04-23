import "./index.css";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import LoginPage from "./Pages/login-page.js";
import RegisterPage from "./Pages/register-page.js";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import TDLPage from "./Pages/TDL-page.js";
import ResetPassword from "./Pages/resetPassword-page.js";
import ChangePassword from "./Pages/changePassword-page.js"
import { Alert } from "./Pages/savedToast.js"
import { InfoAlert } from "./Pages/modalWindow.js";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [infoVisible, setinfoVisible] = useState(false);

  useEffect(() => {
      setinfoVisible(true);
      
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

  const VisibilityofWarnings = () =>{
    setinfoVisible(false);
        setToastVisible(true);
  }

  function Homepage() {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <div className="w-full flex justify-between items-center px-6 py-4 bg-gray-800">
          <Link to="/">
            <h1 className="text-xl font-bold">Homepage</h1>
          </Link>
        </div>

        <div className="flex flex-1 flex-col md:flex-row items-center justify-center gap-5 px-4">
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
        <Alert title="Warning!" message="This website was created solely for my portfolio purposes. Please do not use any sensitive information." visible={toastVisible} onClose={()=> setToastVisible(false)} ></Alert>
        <InfoAlert visible={infoVisible} onClose={VisibilityofWarnings}></InfoAlert>
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
