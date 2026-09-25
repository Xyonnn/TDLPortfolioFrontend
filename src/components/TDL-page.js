import "../index.css"
import { useState, useEffect, useRef } from "react";
import api from "../api/axiosInstance";

export default function TDLPage({user}){
    const [getUser, setUser] = useState(null);

    const [tasks, setTasks] = useState(Array(10).fill(null));
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTaskBox, setShowTaskBox] = useState(false);
    const taskBoxRef = useRef(null);

    const [boxData, setBoxData] = useState({ taskName: "", description: "", dueDay: "", priority: "" });

    useEffect(() => {
        if (!user) return;
        const fetchTasks = async () => {
            try {
                const profRes = await api.get('/api/user');
                setUser(profRes.data);

                const taskRes = await api.get('/api/tasks');
                const fetchedTasks = taskRes.data;

                const slots = Array(10).fill(null);

                fetchedTasks.forEach((task, i) =>{
                    if(i < 10) slots[i] = task;
                });

                setTasks(slots);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTasks();
    }, [user]);

    useEffect(()=>{
        if(selectedTask === null) return;
        const task = tasks[selectedTask];
        setBoxData(task 
            ? { taskName: task.taskName, description: task.description || "", dueDay: task.dueDay || "", priority: task.priority || "" } 
            : { taskName: "", description: "", dueDay: "", priority: "" });
    }, [selectedTask, tasks]);

    const toggleTaskBox = (id) =>{
            const isSameTask = selectedTask === id;
            const willOpen = !(showTaskBox && isSameTask);

            setSelectedTask(willOpen ? id : null);
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

    const saveTask = () =>{
        if(selectedTask === null) return;
        /* update task na teraz pozniej zmienic na 2 osobne funkcje (nowytask/edytujTask) */
        const updateTask = [...tasks];
        updateTask[selectedTask] = { ...(tasks[selectedTask] || {}), 
            taskName: boxData.taskName,
            description: boxData.description,
            dueDay: boxData.dueDay,
            priority: boxData.priority
        }
        setTasks(updateTask);
        setShowTaskBox(false);
        setSelectedTask(null);
    }

    return( 
        <div className="flex flex-1 items-center justify-center py-10 px-4">
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl md:items-start md:justify-center">
                <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md h-fit flex-shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">
                            To Do List
                        </h2>
                    </div>
                    {tasks.map((task, index) => (
                        <button key={index} onClick={() => toggleTaskBox(index)}
                        className={`w-full mb-2 px-3 py-2 rounded-lg text-left transition ${task ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-700/50 hover:bg-gray-700 text-gray-400"} ${selectedTask === index ? "ring-2 ring-blue-500" : ""}`}>
                            {task ? task.taskName : `+ Add task ${index + 1}`}
                        </button>
                    ))}
                </div>

                <div ref={taskBoxRef} className={`overflow-hidden transition-all duration-500 ease-in-out grid ${showTaskBox ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} md:grid-rows-none md:block ${showTaskBox ? "md:w-full md:max-w-md" : "md:w-0"}`}>
                    <div className="overflow-hidden">
                        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4 text-center">
                                Task Options
                            </h2>
                            {/* Nazwa taska */}
                            <input type="text" placeholder="Task Name" value={boxData.taskName} 
                            onChange={(e)=> {setBoxData({ ...boxData, taskName: e.target.value})}}
                            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                            {/* Nazwa description */}
                            <input type="text"placeholder="Description" value={boxData.description} 
                            onChange={(e)=> {setBoxData({ ...boxData, description: e.target.value})}}
                             className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                            {/* due time */}
                            <input type="number" placeholder="Due Time (days)" value={boxData.dueDay} 
                            onChange={(e)=> {setBoxData({ ...boxData, dueDay: e.target.value})}}
                            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                            {/* waznosc taska (wyswietlanie) */}
                            <input type="number" placeholder="Priority (1-10)" value={boxData.priority} 
                            onChange={(e)=> {setBoxData({ ...boxData, priority: e.target.value})}}
                            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                            <div className="flex justify-start mt-2">
                                <button onClick={saveTask} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Add new task</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}