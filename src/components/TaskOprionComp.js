export function AddTaskBox({boxData, setBoxData, onSave}){
    return(
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Task Options
            </h2>

            <input type="text" placeholder="Task Name" value={boxData.taskName} 
            onChange={(e)=> {setBoxData({ ...boxData, taskName: e.target.value})}}
            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <input type="text"placeholder="Description" value={boxData.description} 
            onChange={(e)=> {setBoxData({ ...boxData, description: e.target.value})}}
            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <input type="date" placeholder="Due Time (day)" value={boxData.dueDate} 
            onChange={(e)=> {setBoxData({ ...boxData, dueDate: e.target.value})}}
            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <input type="number" placeholder="Priority (1-10)" value={boxData.priority} 
            onChange={(e)=> {setBoxData({ ...boxData, priority: e.target.value})}}
            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <div className="flex justify-start mt-2">
                <button onClick={onSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Add new task</button>
            </div>
        </div>
    )
}

export function EditTaskBox({boxData, setBoxData, onSave}){
    return(
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Task Options
            </h2>

            <input type="text" placeholder="Task Name" value={boxData.taskName} 
            onChange={(e)=> {setBoxData({ ...boxData, taskName: e.target.value})}}
            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <input type="text"placeholder="Description" value={boxData.description} 
            onChange={(e)=> {setBoxData({ ...boxData, description: e.target.value})}}
            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <input type="date" placeholder="Due Time (day)" value={boxData.dueDate} 
            onChange={(e)=> {setBoxData({ ...boxData, dueDate: e.target.value})}}
            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <input type="number" placeholder="Priority (1-10)" value={boxData.priority} 
            onChange={(e)=> {setBoxData({ ...boxData, priority: e.target.value})}}
            className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <div className="flex justify-start mt-2">
                <button onClick={onSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Update Task</button>
            </div>
        </div> 
    )
}