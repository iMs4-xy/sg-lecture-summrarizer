import subprocess
import os
import sys

def extract_audio(video_path):
    """Extract audio from video for Singapore lecture processing"""
    audio_path = os.path.splitext(video_path)[0] + '.wav'
    
    # Run FFmpeg command
    command = [
        'ffmpeg',
        '-i', video_path,
        '-vn',
        '-acodec', 'pcm_s16le',
        '-ar', '16000',
        '-ac', '1',
        audio_path
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f"Audio extracted: {audio_path}")
        return audio_path
    except subprocess.CalledProcessError as e:
        print(f"Error extracting audio: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python video-processor.py <video_path>")
        sys.exit(1)
    
    video_path = sys.argv[1]
    extract_audio(video_path)
