import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { ResetToast, ValidationWarnings } from "../Pages/savedToast";

function ResetPassword({switchLogin}){

    const auth = getAuth();
    const [showToast, setShowToast] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    

    const sendResetPassoword = (e) =>{
        e.preventDefault();
        setError("");
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3500);
            
        }).catch((error) => {
            console.error(error.message);
            setError("Could not send reset email. Check email and try again.")
        });
    }
    return(
        <>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Reset Password</h2>
            <form onSubmit={sendResetPassoword} className="flex flex-col gap-4">
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"/>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold transition">Reset Password</button>
                    <div className="text-center">
                        <ValidationWarnings message={error} visible={!!error}></ValidationWarnings>
                    </div>
                </form>
            <ResetToast title="Email has been sent" message="Please check your email address to change your password (the email may have been marked as spam!)" visible={showToast}/>
            <p className="text-gray-400 text-sm mt-4 text-center">
                Back to{" "}<span onClick={switchLogin} className="text-blue-400 cursor-pointer hover:underline">Login</span>
            </p>
        </>
    );
}

export default ResetPassword;