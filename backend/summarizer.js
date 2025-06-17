const { SpeechClient } = require('@google-cloud/speech');
const { OpenAI } = require('openai');
const { google } = require('googleapis');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Singapore university course mapping
const SG_COURSES = {
  'NUS': require('./university-data/nus-courses.json'),
  'NTU': require('./university-data/ntu-courses.json'),
  'SMU': require('./university-data/smu-courses.json')
};

// Extract audio using FFmpeg (Singapore timezone aware)
async function extractAudio(videoPath) {
  const audioPath = videoPath.replace(/\.[^/.]+$/, '.wav');
  await exec(`ffmpeg -i ${videoPath} -vn -acodec pcm_s16le -ar 16000 -ac 1 ${audioPath}`);
  return audioPath;
}

// Transcribe with Singapore accent support
async function transcribeSG(audioFile) {
  const client = new SpeechClient();
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-SG',
    enableSpeakerDiarization: true,
    diarizationConfig: { minSpeakerCount: 1, maxSpeakerCount: 3 }
  };
  
  const audio = {
    content: fs.readFileSync(audioFile).toString('base64'),
  };
  
  const [response] = await client.recognize({ config, audio });
  return response.results.map(r => r.alternatives[0].transcript).join('\n');
}

// Generate Google Doc with Singapore university formatting
async function createSummaryDoc(summary, course) {
  const docs = google.docs({ version: 'v1', auth: process.env.GOOGLE_API_KEY });
  
  const doc = await docs.documents.create({
    requestBody: {
      title: `${course.university} ${course.code} Summary - ${new Date().toLocaleDateString('en-SG')}`
    }
  });
  
  const docId = doc.data.documentId;
  
  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: {
      requests: [{
        insertText: {
          text: summary,
          location: { index: 1 }
        }
      }]
    }
  });
  
  return `https://docs.google.com/document/d/${docId}/edit`;
}

// Main processing function for SG lectures
async function processLecture(videoPath, university, courseCode) {
  // 1. Extract audio
  const audioFile = await extractAudio(videoPath);
  
  // 2. Transcribe with SG accent support
  const transcript = await transcribeSG(audioFile);
  
  // 3. University-specific summarization
  const course = SG_COURSES[university].find(c => c.code === courseCode);
  if (!course) throw new Error('Course not found in Singapore database');
  
  const summary = await summarizeForCourse(transcript, course);
  
  // 4. Generate Google Doc
  const docUrl = await createSummaryDoc(summary, course);
  
  // Cleanup
  fs.unlinkSync(audioFile);
  
  return docUrl;
}

// Singapore university specific summarization
async function summarizeForCourse(transcript, course) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const prompt = `Summarize this ${course.university} ${course.name} (${course.code}) lecture for Singapore curriculum.
Focus on:
${course.key_topics.join(', ')}
Format:
- **Key Concepts** (with Singapore examples)
- **Exam Focus Areas** (tag with #${course.university}_Exam)
- **Important Formulas/Theorems** (in LaTeX)
- **Tutorial/Assignment Notes**
Use bullet points and Singapore English spelling.`;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: `${prompt}\n\n${transcript.substring(0, 120000)}` }],
    temperature: 0.2,
    max_tokens: 1500
  });
  
  return response.choices[0].message.content;
}

module.exports = { processLecture };
