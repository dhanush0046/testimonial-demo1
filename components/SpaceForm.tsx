// // components/SpaceForm.tsx
// import React, { useState } from 'react';
// import { CreateSpaceInput } from '../types/space';

// interface SpaceFormProps {
//   onPreviewChange: (data: CreateSpaceInput) => void;
// }

// export default function SpaceForm({ onPreviewChange }: SpaceFormProps) {
//   const [spaceData, setSpaceData] = useState<CreateSpaceInput>({
//     spaceName: '',
//     headerTitle: '',
//     customMessage: '',
//     questions: [
//       'Who are you / what are you working on?',
//       'How has [our product / service] helped you?',
//       'What is the best thing about [our product / service]?',
//     ],
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: keyof CreateSpaceInput
//   ) => {
//     const updatedData = { ...spaceData, [field]: e.target.value };
//     setSpaceData(updatedData);
//     onPreviewChange(updatedData);
//   };

//   const handleQuestionChange = (index: number, value: string) => {
//     const updatedQuestions = [...spaceData.questions];
//     updatedQuestions[index] = value;
//     const updatedData = { ...spaceData, questions: updatedQuestions };
//     setSpaceData(updatedData);
//     onPreviewChange(updatedData);
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-md p-6">
//       <h2 className="text-2xl font-semibold mb-4">Create Your Space</h2>
//       <div className="space-y-4">
//         <div>
//           <label htmlFor="spaceName" className="block text-sm font-medium text-gray-700">Space Name</label>
//           <input
//             id="spaceName"
//             type="text"
//             value={spaceData.spaceName}
//             onChange={(e) => handleInputChange(e, 'spaceName')}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             placeholder="Enter space name"
//           />
//         </div>
//         <div>
//           <label htmlFor="headerTitle" className="block text-sm font-medium text-gray-700">Header Title</label>
//           <input
//             id="headerTitle"
//             type="text"
//             value={spaceData.headerTitle}
//             onChange={(e) => handleInputChange(e, 'headerTitle')}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             placeholder="Enter header title"
//           />
//         </div>
//         <div>
//           <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700">Custom Message</label>
//           <textarea
//             id="customMessage"
//             value={spaceData.customMessage}
//             onChange={(e) => handleInputChange(e, 'customMessage')}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             rows={3}
//             placeholder="Enter your custom message"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
//           {spaceData.questions.map((question, index) => (
//             <input
//               key={index}
//               type="text"
//               value={question}
//               onChange={(e) => handleQuestionChange(index, e.target.value)}
//               className="mt-1 block w-full border  border-gray-300 rounded-md shadow-sm p-2 mb-2"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// components/SpaceForm.tsx
import React, { useState } from 'react';
import { CreateSpaceInput } from '../types/space';

interface SpaceFormProps {
  onPreviewChange: (data: CreateSpaceInput) => void;
}

export default function SpaceForm({ onPreviewChange }: SpaceFormProps) {
  const [spaceData, setSpaceData] = useState<CreateSpaceInput>({
    spaceName: '',
    headerTitle: '',
    customMessage: '',
    questions: [
      'Who are you / what are you working on?',
      'How has [our product / service] helped you?',
      'What is the best thing about [our product / service]?',
    ],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof CreateSpaceInput
  ) => {
    const updatedData = { ...spaceData, [field]: e.target.value };
    setSpaceData(updatedData);
    onPreviewChange(updatedData);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...spaceData.questions];
    updatedQuestions[index] = value;
    const updatedData = { ...spaceData, questions: updatedQuestions };
    setSpaceData(updatedData);
    onPreviewChange(updatedData);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-2xl rounded-xl p-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Your Space</h2>
      <div className="space-y-6">
        <div className="relative">
          <label htmlFor="spaceName" className="block text-sm font-medium text-gray-700">Space Name</label>
          <input
            id="spaceName"
            type="text"
            value={spaceData.spaceName}
            onChange={(e) => handleInputChange(e, 'spaceName')}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none hover:shadow-md"
            placeholder="Enter space name"
          />
        </div>
        <div className="relative">
          <label htmlFor="headerTitle" className="block text-sm font-medium text-gray-700">Header Title</label>
          <input
            id="headerTitle"
            type="text"
            value={spaceData.headerTitle}
            onChange={(e) => handleInputChange(e, 'headerTitle')}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-500 focus:outline-none hover:shadow-md"
            placeholder="Enter header title"
          />
        </div>
        <div className="relative">
          <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700">Custom Message</label>
          <textarea
            id="customMessage"
            value={spaceData.customMessage}
            onChange={(e) => handleInputChange(e, 'customMessage')}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-500 focus:outline-none hover:shadow-md"
            rows={3}
            placeholder="Enter your custom message"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
          {spaceData.questions.map((question, index) => (
            <input
              key={index}
              type="text"
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 mb-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-green-500 focus:outline-none hover:shadow-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
