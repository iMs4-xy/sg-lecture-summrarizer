require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const { processLecture } = require('./summarizer');
const app = express();

// Middleware for Singapore timezone
process.env.TZ = 'Asia/Singapore';

app.use(fileUpload());
app.use(express.json());

// API endpoint for Singapore lectures
app.post('/api/upload', async (req, res) => {
  try {
    const { university, course } = req.body;
    const video = req.files.video;
    
    // Save video temporarily
    const videoPath = `./uploads/${Date.now()}-${video.name}`;
    await video.mv(videoPath);
    
    // Process lecture for SG university
    const docUrl = await processLecture(videoPath, university, course);
    
    res.json({ 
      success: true, 
      docUrl,
      message: `Lecture processed for ${university} ${course}`
    });
  } catch (error) {
    console.error('SG Processing error:', error);
    res.status(500).json({ error: 'Lecture processing failed' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    region: 'Singapore',
    time: new Date().toString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SG Lecture Server running on port ${PORT}`));
