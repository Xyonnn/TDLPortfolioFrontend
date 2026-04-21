import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { ResetToast } from "./savedToast";

function ResetPassword(){

    const auth = getAuth();
    const [email, setEmail] = useState("");
    const isValidEmail = email.includes("@");
    const [showToast, setShowToast] = useState(false);

    const sendResetPassoword = () =>{
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3500);
            
        }).catch((error) => {
            console.error(error.message);
        });
    }

    return(
        <div className="h-screen flex items-center justify-center bg-gray-900">

        <button className="absolute top-6 left-6 text-gray-300 hover:text-white text-lg"><Link to="/">← Home</Link></button>

            <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-3 text-center">You forget your password?</h2>
                <p className="text-gray-400 text-sm text-left">If an account is created for this email address, we will send the message to it.</p>

                <div className="flex flex-col gap-4 mt-4">
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                    <button type="button" onClick={sendResetPassoword} disabled={!isValidEmail} className={`p-3 rounded font-semibold transition mt-4 
                        ${isValidEmail ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"  : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}>
                        Recover Password
                    </button>
            </div>
            <ResetToast title="Mail has been sent" message="Please check the email address you used to change your password (the email may have been marked as spam!)" visible={showToast}/>
        </div>
    );
}

export default ResetPassword;