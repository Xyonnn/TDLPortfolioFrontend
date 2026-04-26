import "../index.css"
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { SaveToast } from "./savedToast";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

    

function TDLPage({user}){

    
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [tasks, setTasks] = useState(Array(10).fill(""));
    const [username, setUsername] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const fetchTasks = async () => {
        if (!user) return;

        try {
            const token = await user.getIdToken();

            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            const data = await res.json();

            if (data.length > 0) {
            const loadedTasks = Array(10).fill("");

            data.forEach((task, index) => {
                if (index < 10) {
                loadedTasks[index] = task.taskName;
                }
            });

            setTasks(loadedTasks);
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoadingTasks(false);
        }
        };

        fetchTasks();
    }, [user]);

    useEffect(() =>{
        const fetchUserData = async () =>{
            if(!user) return;

            try{
                const token = await user.getIdToken();
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}`}
                });
                const data = await res.json();
                setUsername(data.username);
            }catch(err){
                console.log(err);
            }
        };
        fetchUserData();
    }, [user]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const harvestSaveTasks = async () => {
        if(!user) return;

        try{
            const token = await user.getIdToken();
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({tasks})
            });
            const data = await res.json();
            console.log(data);

            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        }catch(err){
            console.log(err);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
        }
    };


    return(
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">

            <div className="w-full flex justify-between items-center px-6 py-4 bg-gray-800">
                    <Link to="/">
                        <h1 className="text-xl font-bold">Homepage</h1>
                    </Link>
                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link to="/loginpage">
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                                    Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
                                    Register
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="relative" ref={menuRef}>
                            <div onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-600 transition">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                                    {username?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm">{username}</span>
                            </div>
                                {menuOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700">
                                            Info
                                        </button>
                                        <Link to="/changePassword">
                                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700">
                                                User Settings
                                            </button>
                                        </Link>
                                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700">
                                            Logout
                                        </button>
                                        
                                    </div>
                                )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center">
                <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        To Do List
                    </h2>

                {tasks.map((task, index) => (
                    <input key={index} type="text" value={task} maxLength={35} placeholder={`Task ${index + 1}`}
                    onChange={(e) => { const newTasks = [...tasks]; newTasks[index] = e.target.value; setTasks(newTasks);}}
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                ))}

                 <div className="flex justify-start mt-2">
                    <button onClick={harvestSaveTasks} disabled={loadingTasks} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Save Tasks</button>
                </div>
                    <SaveToast message="Saved" visible={showToast} />
                </div>

            </div>

            <div className="w-full text-center py-4 bg-gray-800">
                <p className="text-gray-400">Portfolio</p>
            </div>
            
            
        </div>
        
    )
}

export default TDLPage;