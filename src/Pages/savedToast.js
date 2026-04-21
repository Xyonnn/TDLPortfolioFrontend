import { X } from "lucide-react";

export function SaveToast({ message, visible }) {
    return (
        <div
            className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all duration-300
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} bg-green-600`}
        >
            {message}
        </div>
    );
}

export function ResetToast({ title, message, visible }) {
    return (
        <div
            className={`fixed top-6 left-1/2 transform -translate-x-1/2  w-[90%] max-w-md px-6 py-4 rounded-xl shadow-lg text-white transition-all duration-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"} bg-blue-600`}>
            <h2 className="text-lg font-bold mb-1">
                {title}
            </h2>

            <p className="text-sm text-blue-100">
                {message}
            </p>
        </div>
    );
}

export function Alert({ title, message, visible, onClose }){
    return(
        <div  className={`fixed bottom-6 right-6 w-[90%] max-w-sm px-5 py-4 rounded-xl shadow-lg flex items-start justify-between gap-4 text-yellow-900 transition-all duration-300
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} bg-yellow-400`}>
            <h2 className="text-lg font-bold mb-1">
                {title}
            </h2>

            <p className="text-sm text-black-100 font-bold">
                {message}
            </p>

            <button onClick={onClose} className="hover:opacity-70 transition">
                <X size={18} />
            </button>
        </div>
    );
}
