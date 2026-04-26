import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ValidationWarnings, ResetToast } from "./savedToast";

function ChangePassword(){
    const validChars = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,16}$/;

    // var for changing pass
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showToast, setShowToast] = useState(false);

    // validation for changing pass
    const [passwordValidError, setPasswordValidError] = useState("");
    const [oldPasswordValidError, setOldPasswordValidError] =useState("");


    //var for deleting acc
    const [showDelPass, setShowDelPass] = useState(false);
    const [showConDelPass, setShowConDelPass] = useState(false);
    const [curDelPass, setCurDelPass] = useState("");
    const [conDelPass, setConDelPass] = useState("");

    // validation deleting acc
    const [delPasswordValidError, setDelPasswordValidError] = useState("");

    const auth = getAuth();
    
    async function changePasswordFun(currentPassword, newPassword) {
    const user = auth.currentUser;

    if(!currentPassword){
        setOldPasswordValidError("Current password is required");
        return;
    }

    if (currentPassword === newPassword) {
        setPasswordValidError("New password must be different");
        return;
    }

    if (!newPassword) {
        setPasswordValidError("New password is required");
        return;
    }

    if (newPassword.length < 6) {
        setPasswordValidError("Password must be at least 6 characters");
        return;
    }

    if(newPassword.length > 16){
        setPasswordValidError("Password can only contain 16 characters");
        return;
    }

    if(!validChars.test(newPassword)){
        setPasswordValidError("Password must include uppercase, lowercase, number and special character");
        return;
    }

    try {

    const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword.trim()
    );

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword.trim());

    setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
    }, 3500);

    }catch (error) {
        if (error.code === "auth/wrong-password") {
            setOldPasswordValidError("Current password is incorrect");
        } else if (error.code === "auth/invalid-credential") {
            setOldPasswordValidError("Invalid credentials");
        } else if (error.code === "auth/requires-recent-login") {
            setPasswordValidError("Please log in again");
        } else {
            setPasswordValidError("Something went wrong");
        }
    }}
    
    async function deleteUserFun(curDelPass, conDelPass) {
        const user = auth.currentUser;

        if(!curDelPass || !conDelPass){
            setDelPasswordValidError("Both passwords are required");
            return;
        }

        if(curDelPass!==conDelPass){
            setDelPasswordValidError("Passwords must match");
            return;
        }

        try{
            const credential = EmailAuthProvider.credential(
                user.email,
                curDelPass.trim()
            );
            await reauthenticateWithCredential(user, credential);

            const idToken = await user.getIdToken();

            await fetch(`${process.env.REACT_APP_API_URL}/api/deleteAccount`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`
                }
            });

            await deleteUser(user);
            window.location.href = "/";
        }catch(err){
            if (err.code === "auth/wrong-password") {
                setDelPasswordValidError("Incorrect password");
            }else {
                setDelPasswordValidError("Something went wrong");
            }
        }
    }
    

    return (
    <div className="min-h-screen flex flex-col md:items-center md:justify-center bg-gray-900 px-4">
        <div className="w-full max-w-4xl sticky top-0 z-40 bg-gray-900 py-4 md:fixed md:top-6 md:left-6 md:w-auto md:bg-transparent md:p-0">
            <button className="text-gray-300 hover:text-white text-lg">
                <Link to="/tdlpage">← Back</Link>
            </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mt-4 md:mt-0">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full">
                <h2 className="text-2xl font-bold text-white mb-3 text-center">
                    Password Change
                </h2>
                <p className="text-gray-400 text-sm text-left">
                    If an account is created for this email address, we will send the message to it.
                </p>

                    <div className="flex flex-col gap-4 mt-4">
                        <div className="relative">
                            <input type={showCurrentPassword ? "text" : "password"} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password"
                                className="p-3 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                {showCurrentPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                            <ValidationWarnings message={oldPasswordValidError} visible={!!oldPasswordValidError}/>
                        </div>

                        <div className="relative">
                            <input type={showNewPassword ? "text" : "password"} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password"
                                className="p-3 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                            <ValidationWarnings message={passwordValidError} visible={!!passwordValidError}/>
                    </div>

                    <button type="button" onClick={() => changePasswordFun(currentPassword, newPassword)} className="p-3 rounded font-semibold transition mt-4 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
                        Change Password
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full">
                <h2 className="text-2xl font-bold text-white mb-3 text-center">
                    Delete Account
                </h2>

                <p className="text-gray-400 text-sm">
                    If you want to delete your account write your current password twice and click confitm button.
                </p>

                <div className="flex flex-col gap-4 mt-4">
                        <div className="relative">
                            <input type={showDelPass ? "text" : "password"} placeholder="Password" onChange={(e) =>{ setCurDelPass(e.target.value)}}
                                className="p-3 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <button type="button" onClick={() => setShowDelPass(!showDelPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                {showDelPass ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>

                        <div className="relative">
                            <input type={showConDelPass ? "text" : "password"} placeholder="Confirm Password" onChange={(e) =>{ setConDelPass(e.target.value)}}
                                className="p-3 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <button type="button" onClick={() => setShowConDelPass(!showConDelPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                {showConDelPass ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                            <ValidationWarnings message={delPasswordValidError} visible={!!delPasswordValidError}/>
                    </div>

                    <button type="button"onClick={()=>{deleteUserFun(curDelPass, conDelPass)}} className="p-3 rounded font-semibold transition mt-4 bg-red-500 hover:bg-red-600 text-white cursor-pointer">
                        Delete Account
                    </button>
            </div>
        </div>

        </div>
            <ResetToast title="Password Successfully Changed" message="Your password has been successfully changed" visible={showToast}/>
        </div>
    );
}

export default ChangePassword;