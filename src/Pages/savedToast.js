function SaveToast({ message, visible }) {
    return (
        <div
            className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all duration-300
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} bg-green-600`}
        >
            {message}
        </div>
    );
}
export default SaveToast;