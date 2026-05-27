import { Info } from "lucide-react";

export function InfoAlert({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}/>
        <div className="relative z-10 w-full max-w-md rounded-2xl bg-gray-800 shadow-2xl border border-gray-700 p-6 animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
              <Info size={20} className="animate-pulse" />
            </div>

            <h2 className="text-xl font-bold text-white">
              Important information
            </h2>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            Because this site is built on free hosting providers, some features may take longer than expected (for example login or registration).<br />
            <span className="text-gray-400">Please be patient -- first load may take a few seconds.</span>
          </p>

          <div className="flex justify-end">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 transition text-white font-semibold shadow-md">
              Got it
            </button>
          </div>
      </div>
    </div>
  );
}