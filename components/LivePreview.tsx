// // components/LivePreview.tsx
// import React from 'react';

// interface LivePreviewProps {
//   previewData: {
//     spaceName: string;
//     headerTitle: string;
//     customMessage: string;
//     questions: string[];
//   };
// }

// const LivePreview: React.FC<LivePreviewProps> = ({ previewData }) => {
//   const { spaceName, headerTitle, customMessage, questions } = previewData;

//   return (
//     <div className="p-4 bg-gray-50 shadow-lg rounded-md">
//       <h2 className="text-2xl font-bold mb-4">{headerTitle}</h2>
//       <p className="text-gray-600 mb-4">{customMessage}</p>
//       <ul className="list-disc pl-6">
//         {questions.map((question, index) => (
//           <li key={index} className="text-gray-700 mb-2">{question}</li>
//         ))}
//       </ul>
//       <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-4">
//         Record a video
//       </button>
//       <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
//         Send in text
//       </button>
//     </div>
//   );
// };

// export default LivePreview;


// // components/LivePreview.tsx

// import React from 'react';
// import { CreateSpaceInput } from '../types/space';

// interface LivePreviewProps {
//   previewData: CreateSpaceInput;
// }

// export default function LivePreview({ previewData }: LivePreviewProps) {
//   const { spaceName, headerTitle, customMessage, questions } = previewData;

//   return (
//     <div className="bg-white shadow-lg rounded-md p-6">
//       <h2 className="text-2xl font-semibold mb-4">Live Preview: {spaceName}</h2>
//       <div className="space-y-4">
//         <h3 className="text-xl font-semibold">{headerTitle}</h3>
//         <p className="text-gray-600">{customMessage}</p>
//         <ul className="list-disc pl-6">
//           {questions.map((question, index) => (
//             <li key={index} className="text-gray-700 mb-2">{question}</li>
//           ))}
//         </ul>
//         <div className="flex space-x-4">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
//             Record a video
//           </button>
//           <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
//             Send in text
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//---------down --- update  design ----------

import React from 'react';
import { CreateSpaceInput } from '@/types/space';

interface LivePreviewProps {
  previewData: CreateSpaceInput;
}

export default function LivePreview({ previewData }: LivePreviewProps) {
  const { spaceName, headerTitle, customMessage, questions } = previewData;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 shadow-2xl rounded-lg p-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Live Preview: {spaceName || "Your Space"}</h2>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-purple-700">{headerTitle || "Header Title"}</h3>
        <p className="text-gray-600 text-lg">{customMessage || "Please give your testimonial here..."}</p>
        <ul className="list-disc pl-6 space-y-2">
          {questions.map((question, index) => (
            <li key={index} className="text-gray-700 text-md">{question}</li>
          ))}
        </ul>
        <div className="flex space-x-4 mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out">
            Record a video
          </button>
          <button className="bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-700 transform hover:scale-105 transition duration-300 ease-in-out">
            Send in text
          </button>
        </div>
      </div>
    </div>
  );
}
