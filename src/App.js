import "./index.css";
import Footer from "./components/footerComp";
import TDLPage from "./components/TDL-page";
import AuthModal from "./components/AuthModal";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState(false);

  useEffect(() => {
      
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading
      </div>
    );
  }

  const showAuthModal = !user && !guest;

  return (
    <div className="scroll-smooth flex min-h-screen flex-col bg-gray-900 text-white">
      
      {/* 
        wjebac tu mainpage tak jak bylo po zalogowaniu
        dac opacity i dac window z logowaniem albo jako gosc zeby bylo na obczajenie
        logika po zalogowaniu (wylaczenie okna i pozniej to co w notatniku mam)
      */}
      <TDLPage user={user}/>
      <Footer/>
      {showAuthModal && <AuthModal guest={() => setGuest(true)} />}
    </div>
    /*
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
    </BrowserRouter>*/
  );
}

export default App;
