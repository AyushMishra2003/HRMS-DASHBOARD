import React, { useEffect, useState } from "react";
import { Clock, LogIn, LogOut } from "lucide-react";

const CheckInCheckOut = () => {
  const [buttonStatus, setButtonStatus] = useState(true);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (!buttonStatus) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [buttonStatus]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden border shadow">
        <button
          className={`px-6 py-2.5 flex items-center font-medium transition-all duration-200 transform hover:scale-105 shadow-sm text-white ${
            buttonStatus
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={() => setButtonStatus(!buttonStatus)}
        >
          {buttonStatus ? <LogIn size={16} className="mr-2" /> : <LogOut size={16} className="mr-2" />}
          <span className="hidden sm:inline">{buttonStatus ? "Check In" : "Check Out"}</span>
          <span className="sm:hidden">{buttonStatus ? "In" : "Out"}</span>
        </button>

        <div className="bg-white px-4 py-2.5 flex items-center border-l min-w-[120px]">
          <div className="relative flex items-center">
            <Clock size={16} className="text-blue-600 mr-2" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-mono text-blue-600 font-semibold text-sm">
              {formatTime(timer)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInCheckOut;
