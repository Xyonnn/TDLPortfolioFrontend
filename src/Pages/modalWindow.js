export function InfoAlert({ visible, onClose }){
   if (!visible) return null;
  return(
    <div className={`fixed inset-0 z-50 flex items-center justify-center 
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

      <div className="absolute inset-0 bg-black/50"/>

        <div className="relative z-10 bg-gray-600 rounded-2xl shadow-lg p-6 w-96">

          <h2 className="text-lg font-bold mb-1">
            Important information
          </h2>

          <p className="text-sm text-blue-100 mb-4 font-bold">
            Because this site is built on free providers,<br></br> some features may take longer than expected <br></br>(for example, registration or login), so please be patient.
          </p>

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500">
              Confirm
            </button>
          </div>

        </div>

    </div>
  );
}