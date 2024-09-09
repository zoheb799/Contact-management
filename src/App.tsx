import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactsPage from './components/Contact';
import CreateContactPage from './components/contacts/Createcontact';
import ChartsAndMaps from './components/mapsCharts';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1  overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/contacts/create" element={<CreateContactPage />} />
            <Route path="/contacts/edit/:id" element={<CreateContactPage />} />
            <Route path="/charts-maps" element={<ChartsAndMaps/>} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
}


export default App;
