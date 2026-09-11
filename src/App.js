import "./index.css";
import Footer from "./components/footerComp";
import TDLPage from "./components/TDL-page";
import AuthModal from "./components/AuthModal";
import { useState } from "react";

function App() {
  /*
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
  };*/

  const [showAuthModal, setShowAuthModal] = useState(true);

  return (
    <div className="scroll-smooth flex min-h-screen flex-col bg-gray-900 text-white">
      
      {/* 
        wjebac tu mainpage tak jak bylo po zalogowaniu
        dac opacity i dac window z logowaniem albo jako gosc zeby bylo na obczajenie
        logika po zalogowaniu (wylaczenie okna i pozniej to co w notatniku mam)
      */}
      <TDLPage/>
      <Footer/>
      {showAuthModal && <AuthModal guest={() => setShowAuthModal(false)} />}
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
