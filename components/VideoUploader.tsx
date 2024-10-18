//Components/VideoUploader.tsx
import React, { useRef, useState } from 'react';
import { FaVideo, FaStopCircle, FaCloudUploadAlt } from 'react-icons/fa'; // Use icons for buttons

const VideoUploader: React.FC<{ spaceId: string }> = ({ spaceId }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null); 
    const [recording, setRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            const recorder = new MediaRecorder(stream);
            recorder.ondataavailable = (e) => setVideoBlob(e.data);
            recorder.start();
            setMediaRecorder(recorder);
            setRecording(true);
        } catch (err) {
            console.error('Error accessing camera or microphone: ', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
            }
            setRecording(false);
        }
    };

    const uploadVideo = async () => {
        if (!videoBlob) return;
        
        setIsUploading(true);

        const videoName = `video-${Date.now()}.mp4`;
        const videoType = 'video/mp4';

        try {
            const response = await fetch('/api/signed-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoName, videoType }),
            });

            const { url } = await response.json();

            const uploadResponse = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': videoType },
                body: videoBlob,
            });

            if (uploadResponse.ok) {
                const videoUrl = url.split('?')[0];
                await fetch('/api/testimonials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        spaceId,
                        type: 'video',
                        videoUrl,
                    }),
                });

                alert('Video uploaded and URL stored successfully');
                setVideoBlob(null);
            } else {
                console.error('Error uploading video');
            }
        } catch (error) {
            console.error('Error during video upload:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-8 p-8 bg-gradient-to-br from-green-200  to-blue-200 rounded-lg shadow-2xl w-full max-w-xl mx-auto mt-12 text-white">
            <h1 className="text-3xl font-bold text-black">Record Your Video Testimonial</h1>

            <div className="relative w-full">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-auto rounded-lg shadow-md border-4 border-white"
                ></video>

                {!recording && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-lg text-white text-lg font-semibold">
                        Video Preview
                    </div>
                )}

                {recording && (
                    <div className="absolute top-4 right-4 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center">
                        <span className="relative flex items-center justify-center">
                            {/* Outer circle */}
                            <span className="absolute border-2 border-red-600 rounded-full w-4 h-4"></span>
                            {/* Pulsing red dot */}
                            <span className="animate-pulse text-red-600">●</span>
                        </span>
                        <span className="ml-2">REC</span>
                    </div>
                )}

            </div>

            {recording ? (
                <button
                    onClick={stopRecording}
                    className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-red-600 transform hover:scale-105 transition-all duration-300"
                >
                    <FaStopCircle size={20} />
                    <span>Stop Recording</span>
                </button>
            ) : (
                <button
                    onClick={startRecording}
                    className="bg-green-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
                >
                    <FaVideo size={20} />
                    <span>Start Recording</span>
                </button>
            )}

            {videoBlob && !isUploading && (
                <button
                    onClick={uploadVideo}
                    className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
                >
                    <FaCloudUploadAlt size={20} />
                    <span>Upload Video</span>
                </button>
            )}

            {isUploading && (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>
                    <p className="text-white font-semibold">Uploading...</p>
                </div>
            )}
        </div>
    );
};

export default VideoUploader;
