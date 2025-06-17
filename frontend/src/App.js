import React from 'react';
import UploadPage from './pages/UploadPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">SG Lecture Summarizer</Link>
          <div>
            <Link to="/" className="mr-4 hover:text-blue-300">Upload</Link>
            <Link to="/browse" className="mr-4 hover:text-blue-300">Browse</Link>
            <Link to="/subscription" className="hover:text-blue-300">Subscription</Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/browse" element={<div>Browse Lectures (Coming Soon)</div>} />
          <Route path="/subscription" element={<div>Subscription Plans (Coming Soon)</div>} />
        </Routes>
      </div>
      
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} Singapore Lecture Summarizer</p>
          <p className="mt-2">For NUS, NTU, and SMU Students</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
