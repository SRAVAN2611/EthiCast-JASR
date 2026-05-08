const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const Replicate = require('replicate');
const Log = require('../models/Log');

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || 'your_fallback_token',
});

// In-memory job store for Phase 2 MVP
const jobs = new Map();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/')),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const generateHash = (text) => crypto.createHash('sha256').update(text).digest('hex');

const runPythonScript = (scriptPath, args) => {
  return new Promise((resolve, reject) => {
    const process = spawn('python', [scriptPath, ...args]);
    let output = '';
    let errorOutput = '';
    process.stdout.on('data', (data) => { output += data.toString(); });
    process.stderr.on('data', (data) => { errorOutput += data.toString(); });
    process.on('close', (code) => {
      if (code !== 0) reject(new Error(`Python Error (${code}): ${errorOutput}`));
      else {
        try { resolve(JSON.parse(output)); }
        catch (e) { resolve({ raw: output }); }
      }
    });
  });
};

/**
 * @route POST /api/generate
 * Initiates the AI generation pipeline asynchronously
 */
router.post('/generate', upload.single('media'), async (req, res) => {
  const { prompt, safetyStrictness = 0.5 } = req.body;
  const jobId = crypto.randomBytes(16).toString('hex');
  
  // Initialize Job State
  jobs.set(jobId, {
    status: 'processing',
    step: 'Safety Audit',
    progress: 10,
    result: null,
    error: null
  });

  // Respond immediately with jobId
  res.status(202).json({ jobId });

  // Background Processing Pipeline
  (async () => {
    try {
      const job = jobs.get(jobId);
      
      // 1. Safety Audit (Agentic Guardrail)
      const safetyScript = path.join(__dirname, '../../ai/safety_agent.py');
      // Updated to pass strictness as a flagged argument
      const safetyResult = await runPythonScript(safetyScript, [prompt, '--strictness', safetyStrictness.toString()]);

      if (safetyResult.status === 'Fail') {
        job.status = 'failed';
        job.error = safetyResult.reason;
        return;
      }

      // 2. AI Video Generation (Stable Video Diffusion via Replicate)
      job.step = 'AI Generation';
      job.progress = 40;
      
      let remoteVideoUrl;
      try {
        if (!process.env.REPLICATE_API_TOKEN || process.env.REPLICATE_API_TOKEN === 'your_fallback_token') {
          throw new Error('Using mock generation due to missing API token.');
        }
        const prediction = await replicate.predictions.create({
          version: "3f0ad1c8d5500d47efd049f53e0129792019b8df79f22533358dfa5b17454984", // SVD model
          input: { prompt: prompt, video_length: "14_frames_with_svd" }
        });

        // Poll Replicate for completion (simplified for MVP)
        let polledPrediction = await replicate.predictions.get(prediction.id);
        while (polledPrediction.status !== 'succeeded' && polledPrediction.status !== 'failed') {
          await new Promise(r => setTimeout(r, 3000));
          polledPrediction = await replicate.predictions.get(prediction.id);
        }

        if (polledPrediction.status === 'failed') {
          throw new Error('AI Generation failed at provider.');
        }
        remoteVideoUrl = polledPrediction.output[0];
      } catch (e) {
        console.log("Mocking AI Generation:", e.message);
        await new Promise(r => setTimeout(r, 2000)); // Simulate delay
        remoteVideoUrl = path.join(__dirname, '../../mock_data/raw_video.mp4');
      }

      // 3. DCT Watermarking & Artifact Localizing
      job.step = 'DCT Watermarking';
      job.progress = 80;

      const watermarkScript = path.join(__dirname, '../../ai/watermark.py');
      const watermarkId = crypto.randomBytes(8).toString('hex');
      const localOutputPath = path.join(__dirname, `../../frontend/public/outputs/${watermarkId}.mp4`);
      
      await runPythonScript(watermarkScript, [remoteVideoUrl, localOutputPath, watermarkId]);

      // 4. Completion
      job.status = 'completed';
      job.progress = 100;
      job.result = `/outputs/${watermarkId}.mp4`;
      
      await Log.create({
        promptHash: generateHash(prompt),
        status: 'Success',
        watermarkId,
        timestamp: new Date()
      });

    } catch (error) {
      console.error(`Job ${jobId} failed:`, error);
      const job = jobs.get(jobId);
      if (job) {
        job.status = 'failed';
        job.error = error.message;
      }
    }
  })();
});

/**
 * @route GET /api/status/:jobId
 * Returns the current status of the background generation job
 */
router.get('/status/:jobId', (req, res) => {
  const job = jobs.get(req.params.jobId);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

module.exports = router;
