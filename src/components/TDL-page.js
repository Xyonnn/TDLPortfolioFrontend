import "../index.css"
import { useState, useEffect, useRef } from "react";
import api from "../api/axiosInstance";

export default function TDLPage({user}){

    const [tasks, setTasks] = useState([]);
    const [getUser, setUser] = useState(null);
    const [showTaskBox, setShowTaskBox] = useState(false);
    const taskBoxRef = useRef(null);

    useEffect(() => {
        if (!user) return;
        const fetchTasks = async () => {
            try {
                const profRes = await api.get('/api/user');
                setUser(profRes.data);

                const taskRes = await api.get('/api/tasks');
                setTasks(taskRes.data);

            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
    }, [user]);

    const toggleTaskBox = () =>{
        const willOpen = !showTaskBox;
        setShowTaskBox(willOpen);

        if(willOpen){
            setTimeout(() =>{
                taskBoxRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);
        }
    }
    return( 
        <div className="flex flex-1 items-center justify-center py-10 px-4">
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl md:items-start md:justify-center">
                <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md h-fit flex-shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">
                            To Do List
                        </h2>
                        <button onClick={toggleTaskBox} className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition text-xl font-bold leading-none">
                            {showTaskBox ? "-" : "+"}
                        </button>
                    </div>
                    {tasks.map((task, index) => (
                        <input key={index} type="text" value={task} maxLength={35} placeholder={`Task ${index + 1}`}
                        onChange={(e) => { const newTasks = [...tasks]; newTasks[index] = e.target.value; setTasks(newTasks);}}
                        className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    ))}
                </div>

                <div ref={taskBoxRef} className={`overflow-hidden transition-all duration-500 ease-in-out grid ${showTaskBox ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} md:grid-rows-none md:block ${showTaskBox ? "md:w-full md:max-w-md" : "md:w-0"}`}>
                    <div className="overflow-hidden">
                        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4 text-center">
                                Task Options
                            </h2>
                            {/* Nazwa taska */}
                            <input type="text" className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            {/* Nazwa description */}
                            <input type="text" className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            {/* due time */}
                            <input type="number" className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            {/* waznosc taska (wyswietlanie) */}
                            <input type="text" className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                            <div className="flex justify-start mt-2">
                                <button onClick={() => {}} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Add new task</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}