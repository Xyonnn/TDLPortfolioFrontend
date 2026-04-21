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
