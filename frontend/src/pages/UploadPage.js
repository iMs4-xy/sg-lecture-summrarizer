jsx

import React, { useState } from 'react';

import { NUSLogo, NTULogo, SMULogo } from '../components/UniversityLogos';

export default function UploadPage() {

const [university, setUniversity] = useState('NUS');

const [course, setCourse] = useState('');

const [file, setFile] = useState(null);

const [isUploading, setIsUploading] = useState(false);

const courses = {

NUS: ['CS1010', 'MA1521'],

NTU: ['SC1003', 'MH1810'],

SMU: ['IS101', 'ECON101']

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

if (data.docUrl) {

window.open(data.docUrl, '_blank');

}

} catch (error) {

console.error('Upload failed', error);

alert('Upload failed. Please try again.');

} finally {

setIsUploading(false);

}

};

return (

<div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>

<h1>Upload Lecture</h1>

<div className="university-selector" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>

<button

onClick={() => setUniversity('NUS')}

style={{ display: 'flex', alignItems: 'center', gap: '5px', background: university === 'NUS' ? '#ddd' : '#eee' }}

>

<NUSLogo /> NUS

</button>

<button

onClick={() => setUniversity('NTU')}

style={{ display: 'flex', alignItems: 'center', gap: '5px', background: university === 'NTU' ? '#ddd' : '#eee' }}

>

<NTULogo /> NTU

</button>

<button

onClick={() => setUniversity('SMU')}

style={{ display: 'flex', alignItems: 'center', gap: '5px', background: university === 'SMU' ? '#ddd' : '#eee' }}

>

<SMULogo /> SMU

</button>

</div>

<div style={{ marginBottom: '20px' }}>

<label>Select Course: </label>

<select

value={course}

onChange={(e) => setCourse(e.target.value)}

style={{ padding: '8px', width: '100%' }}

>

<option value="">Select Course</option>

{courses[university].map(code => (

<option key={code} value={code}>{code}</option>

))}

</select>

</div>

<div style={{ marginBottom: '20px' }}>

<label>Lecture Video: </label>

<input

type="file"

accept="video/*"

onChange={(e) => setFile(e.target.files[0])}

style={{ width: '100%' }}

/>

</div>

<button

onClick={handleUpload}

disabled={!file || !course || isUploading}

style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}

>

{isUploading ? 'Processing...' : 'Upload and Summarize'}

</button>

</div>

);

}
