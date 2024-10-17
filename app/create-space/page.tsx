// // app/create-space/page.tsx
// "use client";
// import React, { useState } from 'react';
// import Header from '../../components/Header';
// import SpaceForm from '../../components/SpaceForm';
// import LivePreview from '../../components/LivePreview';
// import { CreateSpaceInput, Space } from '../../types/space';
// import { createSpace } from '../../lib/api';

// export default function CreateSpacePage() {
//   const [previewData, setPreviewData] = useState<CreateSpaceInput>({
//     spaceName: 'Space Name',
//     headerTitle: 'Header goes here...',
//     customMessage: 'Please give your testimonial here...',
//     questions: [
//       'Who are you / what are you working on?',
//       'How has [our product / service] helped you?',
//       'What is the best thing about [our product / service]?',
//     ],
//   });
//   const [shareableLink, setShareableLink] = useState('');
//   const [isCreating, setIsCreating] = useState(false);

//   const handleCreateSpace = async () => {
//     setIsCreating(true);
//     try {
//       const newSpace: Space = await createSpace(previewData);
//       if (newSpace && newSpace.id) {
//         const link = `/submit-testimonial/${newSpace.id}`;
//         setShareableLink(`${window.location.origin}${link}`);
//       } else {
//         throw new Error('Failed to get space ID');
//       }
//     } catch (error) {
//       console.error('Error creating space:', error);
//       alert('Failed to create space. Please try again.');
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="max-w-6xl mx-auto p-8">
//         <h1 className="text-3xl font-bold mb-6">Create a Testimonial Space</h1>
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="w-full lg:w-1/2">
//             <SpaceForm onPreviewChange={setPreviewData} />
//           </div>
//           <div className="w-full lg:w-1/2">
//             <LivePreview previewData={previewData} />
//           </div>
//         </div>
//         <div className="mt-8 text-center">
//           <button
//             className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
//             onClick={handleCreateSpace}
//             disabled={isCreating}
//           >
//             {isCreating ? 'Creating...' : 'Create Space'}
//           </button>
//           {shareableLink && (
//             <div className="mt-4">
//               <p className="font-semibold">Your Shareable Link:</p>
//               <a href={shareableLink} className="text-blue-600 break-all">{shareableLink}</a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// ---------down design update ----------

// app/create-space/page.tsx
"use client";
import React, { useState } from 'react';
import Header from '../../components/Header';
import SpaceForm from '../../components/SpaceForm';
import LivePreview from '../../components/LivePreview';
import { CreateSpaceInput, Space } from '../../types/space';
import { createSpace } from '../../lib/api';

export default function CreateSpacePage() {
  const [previewData, setPreviewData] = useState<CreateSpaceInput>({
    spaceName: 'Space Name',
    headerTitle: 'Header goes here...',
    customMessage: 'Please give your testimonial here...',
    questions: [
      'Who are you / what are you working on?',
      'How has [our product / service] helped you?',
      'What is the best thing about [our product / service]?',
    ],
  });
  const [shareableLink, setShareableLink] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSpace = async () => {
    setIsCreating(true);
    try {
      const newSpace: Space = await createSpace(previewData);
      if (newSpace && newSpace.id) {
        const link = `/submit-testimonial/${newSpace.id}`;
        setShareableLink(`${window.location.origin}${link}`);
      } else {
        throw new Error('Failed to get space ID');
      }
    } catch (error) {
      console.error('Error creating space:', error);
      alert('Failed to create space. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 text-center animate-fadeIn">
          Create a Testimonial Space
        </h1>
        <div className="flex flex-col lg:flex-row gap-8 bg-white shadow-2xl rounded-lg p-8 animate-scaleIn">
          <div className="w-full lg:w-1/2">
            <SpaceForm onPreviewChange={setPreviewData} />
          </div>
          <div className="w-full lg:w-1/2 border-l-4 border-gray-100 pl-4 animate-slideIn">
            <LivePreview previewData={previewData} />
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            className={`${
              isCreating ? 'bg-green-400' : 'bg-gradient-to-r from-green-500 to-teal-500'
            } text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 ease-in-out disabled:opacity-50`}
            onClick={handleCreateSpace}
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Space'}
          </button>
          {shareableLink && (
            <div className="mt-6 animate-fadeIn">
              <p className="text-xl font-semibold text-gray-700">Your Shareable Link:</p>
              <a
                href={shareableLink}
                className="text-blue-600 underline break-all hover:text-blue-800 transition-colors"
              >
                {shareableLink}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
