jsx

import React from 'react';

import UploadPage from './pages/UploadPage';

import './App.css';

function App() {

return (

<div className="App">

<header style={{ background: '#333', color: 'white', padding: '10px' }}>

<h1>SG Lecture Summarizer</h1>

</header>

<UploadPage />

</div>

);

}

export default App;
