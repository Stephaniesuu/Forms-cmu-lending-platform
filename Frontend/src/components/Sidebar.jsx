import { useState } from 'react';
import { PiCaretDoubleLeftBold, PiCaretDoubleRightBold } from "react-icons/pi";

const Sidebar = () => {
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className={`flex flex-col ${isMinimized ? 'w-10' : 'w-64'} h-full bg-gray-800 text-white transition-width duration-300`}>
            <button 
                className="p-2 bg-gray-700 hover:bg-gray-600"
                onClick={toggleSidebar}
            >
                {isMinimized ? <PiCaretDoubleRightBold /> : <PiCaretDoubleLeftBold />}
            </button>
            <div className={`flex-grow p-4 ${isMinimized ? 'hidden' : 'block'}`}>
                <h2 className="text-xl font-bold">Sidebar Content</h2>
                <p>Here is some content for the sidebar.</p>
            </div>
        </div>
    );
};

export default Sidebar;
