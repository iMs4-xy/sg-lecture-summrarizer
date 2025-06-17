import React, { useState } from 'react';
import { NUSLogo, NTULogo, SMULogo } from '../components/UniversityLogos';

const UploadPage = () => {
  const [university, setUniversity] = useState('NUS');
  const [course, setCourse] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);

  // Sample Singapore university courses
  const courses = {
    NUS: ['CS1010', 'EC2101', 'MA1521', 'LSM1301'],
    NTU: ['SC1003', 'MH1810', 'AB1201', 'EE2007'],
    SMU: ['IS101', 'ECON101', 'ACCT101', 'COR101']
  };

  const handleUpload = async () => {
    if (!file || !course) return;
    
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('video', file);
    formData.append('university', university);
    formData.append('course', course);
    
    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        setResult(data);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Upload Singapore Lecture</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Select University</h2>
        <div className="flex space-x-4">
          <button 
            onClick={() => setUniversity('NUS')} 
            className={`flex items-center px-4 py-2 rounded-lg ${university === 'NUS' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            <NUSLogo className="mr-2" /> NUS
          </button>
          <button 
            onClick={() => setUniversity('NTU')} 
            className={`flex items-center px-4 py-2 rounded-lg ${university === 'NTU' ? 'bg-red-700 text-white' : 'bg-gray-200'}`}
          >
            <NTULogo className="mr-2" /> NTU
          </button>
          <button 
            onClick={() => setUniversity('SMU')} 
            className={`flex items-center px-4 py-2 rounded-lg ${university === 'SMU' ? 'bg-blue-800 text-white' : 'bg-gray-200'}`}
          >
            <SMULogo className="mr-2" /> SMU
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Select Course
        </label>
        <select 
          value={course} 
          onChange={(e) => setCourse(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select a course</option>
          {courses[university].map(code => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Upload Lecture Video
        </label>
        <input 
          type="file" 
          accept="video/*" 
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <p className="text-sm text-gray-500 mt-1">MP4, MOV, or AVI files (max 2GB)</p>
      </div>
      
      <button 
        onClick={handleUpload} 
        disabled={isUploading || !file || !course}
        className={`w-full py-3 rounded-lg text-white font-semibold ${
          isUploading || !file || !course ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isUploading ? 'Processing Singapore Lecture...' : 'Upload & Summarize'}
      </button>
      
      {result && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">Summary Created!</h3>
          <a 
            href={result.docUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 block"
          >
            Open Google Doc Summary
          </a>
          <p className="mt-2 text-gray-600">{result.message}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
