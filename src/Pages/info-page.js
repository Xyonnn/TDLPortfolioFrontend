import { Link } from "react-router-dom";

export function InfoPage(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">

        <button className="absolute top-6 left-6 text-gray-300 hover:text-white text-lg">
            <Link to="/tdlpage">← Back</Link>
        </button>

        <div className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                About This App
            </h2>
                <div className="text-gray-300 text-sm sm:text-base space-y-4 leading-relaxed">
                    <p></p>
                    <p></p>
                    <p></p>
                </div>

                <div className="border-t border-gray-700 my-6"></div>
                    <div className="text-gray-300 text-sm sm:text-base space-y-2">
                        <h3 className="text-white font-semibold text-lg mb-2">
                            Contact
                        </h3>

                        <p>GitHub: https://github.com/Xyonnn</p>
                        <p>Email: pj.kostera@gmail.com</p>
          
                    </div>
                </div>
        </div>
    );
}