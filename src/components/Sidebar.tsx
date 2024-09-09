import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaChevronLeft, FaUser, FaMap } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };
  return (
    <>
      <div className={`hidden md:flex flex-col h-full bg-gray-800 text-white ${!isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
        <div>
        <button onClick={toggleSidebar} className="p-4 focus:outline-none">
        {!isOpen ? <FaChevronLeft size={20} /> : <FaBars size={20} />}
      </button>
      <nav className="mt-10 flex-1">
        <ul>
        <li className={`mb-4 relative group flex items-center ${isOpen ? 'justify-center': 'justify-start'}`}>
            <Link to="/contacts" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaUser size={20} />
              <span className={`${isOpen && 'hidden'} ml-4`}>Contacts</span>
            </Link>
            {isOpen && (
              <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Contacts
              </span>
            )}
          </li>
          <li className={`mb-4 relative group flex items-center ${isOpen ? 'justify-center': 'justify-start'}`}>

            <Link to="/charts-maps" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FaMap size={20} />
              <span className={`${isOpen && 'hidden'} ml-4`}>Maps & Charts</span>
            </Link>
            {isOpen && (
              <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Maps & Charts
              </span>
            )}
          </li>
        </ul>
      </nav>
        </div>
    </div>

    <div className={`flex flex-col h-full bg-gray-800 text-white md:hidden ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
    <button onClick={toggleSidebar} className="p-4 focus:outline-none">
        {!isOpen ? <FaBars size={20} /> : <FaChevronLeft size={20} />}
      </button>
      <nav className="mt-10 flex-1">
        <ul className="">
          <li className={`mb-4 relative group flex items-center ${!isOpen ? 'justify-center': 'justify-start'}`}>
            <Link to="/contacts" className="flex items-center p-2 hover:bg-gray-700 rounded" onClick={handleNavClick}>
              <FaUser size={20} />
              <span className={`${!isOpen && 'hidden'} ml-4`}>Contacts</span>
            </Link>
            {!isOpen && (
              <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Contacts
              </span>
            )}
          </li>
          <li className={`mb-4 relative group flex items-center ${!isOpen ? 'justify-center': 'justify-start'}`}>
            <Link to="/charts-maps" className="flex items-center p-2 hover:bg-gray-700 rounded" onClick={handleNavClick}>
              <FaMap size={20} />
              <span className={`${!isOpen && 'hidden'} ml-4`}>Maps & Charts</span>
            </Link>
            {!isOpen && (
              <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Maps & Charts
              </span>
            )}
          </li>
        </ul>
      </nav>
    </div>
    </>
  
  );
};

export default Sidebar;
