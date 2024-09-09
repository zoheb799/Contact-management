import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Contact Management App</h1>
      <div className="text-lg text-center max-w-md">
        <p className="mb-4">
          This application helps you manage your contacts efficiently. You can create, edit, and delete contacts, and view various insights with charts and maps.
        </p>
        <div className="flex space-x-4 mt-4">
          <Link to="/contacts" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Go to Contacts
          </Link>
          <Link to="/charts-maps" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Go to Charts & Maps
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
