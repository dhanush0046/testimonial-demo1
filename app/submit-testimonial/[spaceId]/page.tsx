// //app/submit-testimonial/[spaceId]/page.tsx

// "use client";
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Header from '../../../components/Header';
// import { Space } from '../../../types/space';
// import { getSpace, createTestimonial, createVideoTestimonial } from '../../../lib/api';

// export default function TestimonialSubmissionPage() {
//   const params = useParams();
//   const spaceId = params?.spaceId as string;
//   const [spaceData, setSpaceData] = useState<Space | null>(null);
//   const [testimonialText, setTestimonialText] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

//   useEffect(() => {
//     const fetchSpaceData = async () => {
//       try {
//         const data = await getSpace(spaceId);
//         setSpaceData(data);
//       } catch (error) {
//         console.error('Error fetching space data:', error);
//         alert('Failed to load space data. Please try again.');
//       }
//     };

//     if (spaceId) {
//       fetchSpaceData();
//     }
//   }, [spaceId]);

//   const handleSubmitText = async () => {
//     if (!spaceData) return;

//     try {
//       await createTestimonial({
//         spaceId: spaceData.id,
//         content: testimonialText,
//         type: 'text',
//       });
//       alert('Thank you for your testimonial!');
//       setTestimonialText('');
//     } catch (error) {
//       console.error('Error submitting testimonial:', error);
//       alert('Failed to submit testimonial. Please try again.');
//     }
//   };

//   const handleRecordVideo = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       const chunks: BlobPart[] = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const blob = new Blob(chunks, { type: 'video/webm' });
//         setVideoBlob(blob);
//         setIsRecording(false);
//       };

//       mediaRecorder.start();
//       setIsRecording(true);

//       setTimeout(() => {
//         mediaRecorder.stop();
//         stream.getTracks().forEach(track => track.stop());
//       }, 60000); // Stop recording after 60 seconds
//     } catch (error) {
//       console.error('Error recording video:', error);
//       alert('Failed to start video recording. Please check your camera permissions.');
//     }
//   };

//   const handleSubmitVideo = async () => {
//     if (!spaceData || !videoBlob) return;

//     try {
//       await createVideoTestimonial(spaceData.id, videoBlob);
//       alert('Thank you for your video testimonial!');
//       setVideoBlob(null);
//     } catch (error) {
//       console.error('Error submitting video testimonial:', error);
//       alert('Failed to submit video testimonial. Please try again.');
//     }
//   };

//   if (!spaceData) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="max-w-4xl mx-auto p-8">
//         <h1 className="text-3xl font-bold mb-4">{spaceData.headerTitle}</h1>
//         <p className="text-lg mb-6">{spaceData.customMessage}</p>
//         <ul className="list-disc pl-6 mb-8">
//           {spaceData.questions.map((question, index) => (
//             <li key={index} className="text-gray-700 mb-2">{question}</li>
//           ))}
//         </ul>

//         <div className="space-y-8">
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Submit Text Testimonial</h2>
//             <textarea
//               className="w-full p-2 border rounded-md"
//               rows={6}
//               placeholder="Enter your feedback here"
//               value={testimonialText}
//               onChange={(e) => setTestimonialText(e.target.value)}
//             />
//             <button
//               onClick={handleSubmitText}
//               className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
//             >
//               Submit Text
//             </button>
//           </div>

//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Submit Video Testimonial</h2>
//             {!videoBlob && (
//               <button
//                 onClick={handleRecordVideo}
//                 className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
//                 disabled={isRecording}
//               >
//                 {isRecording ? 'Recording...' : 'Record Video'}
//               </button>
//             )}
//             {videoBlob && (
//               <div>
//                 <video src={URL.createObjectURL(videoBlob)} controls className="mb-4 w-full" />
//                 <button
//                   onClick={handleSubmitVideo}
//                   className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
//                 >
//                   Submit Video
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//-------------------design update -----------------

// //app/submit-testimonial/[spaceId]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast, Toaster } from "sonner"; // Import Sonner toast
import { Space } from "@/types/space";
import { getSpace, createTestimonial } from "@/lib/api";
import VideoUploader from "@/components/VideoUploader"; // Import the VideoUploader component

export default function TestimonialSubmissionPage() {
  const params = useParams();
  const spaceId = params?.spaceId as string;
  const [spaceData, setSpaceData] = useState<Space | null>(null);
  const [testimonialText, setTestimonialText] = useState("");
  const [isSubmittingText, setIsSubmittingText] = useState(false);

  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        const data = await getSpace(spaceId);
        setSpaceData(data);
      } catch (error) {
        console.error("Error fetching space data:", error);
        toast.error("Failed to load space data. Please try again."); // Use toast for error message
      }
    };

    if (spaceId) {
      fetchSpaceData();
    }
  }, [spaceId]);

  const handleSubmitText = async () => {
    if (!spaceData || !testimonialText.trim()) return;
    setIsSubmittingText(true);

    try {
      await createTestimonial({
        spaceId: spaceData.id,
        content: testimonialText,
        type: "text",
      });
      console.log("testimonial submitted");
      toast.success("Thank you for your testimonial!"); // Success message
      setTestimonialText("");
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Failed to submit testimonial. Please try again."); // Error message
    } finally {
      setIsSubmittingText(false);
    }
  };

  if (!spaceData)
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex justify-center items-center">
      <div className="max-w-4xl w-full mx-auto p-8 rounded-lg relative overflow-hidden shadow-2xl bg-gradient-to-r from-purple-200 via-white to-blue-200 animate-bg-shift">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 animate-fade-in">
          {spaceData.headerTitle}
        </h1>
        <p className="text-xl text-gray-700 text-center mb-8 animate-fade-in delay-100">
          {spaceData.customMessage}
        </p>

        <ul className="list-disc pl-8 text-lg text-gray-800 mb-8 animate-fade-in delay-200">
          {spaceData.questions.map((question, index) => (
            <li key={index} className="mb-3">{question}</li>
          ))}
        </ul>

        <div className="space-y-12">
          {/* Text Testimonial */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Submit Text Testimonial
            </h2>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition"
              rows={5}
              placeholder="Enter your testimonial here"
              value={testimonialText}
              onChange={(e) => setTestimonialText(e.target.value)}
              disabled={isSubmittingText}
            />
            <button
              onClick={handleSubmitText}
              disabled={isSubmittingText || !testimonialText.trim()}
              className={`mt-4 w-2/3 mx-auto bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 block ${
                isSubmittingText || !testimonialText.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmittingText ? "Submitting..." : "Submit Text"}
            </button>
          </div>

          {/* Video Testimonial */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Submit Video Testimonial
            </h2>
            <VideoUploader spaceId={spaceId} /> {/* Embed the VideoUploader here */}
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}