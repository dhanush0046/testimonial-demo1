// // app/page.tsx
// "use client";
// import React from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '../components/Header';

// const HomePage = () => {
//   const router = useRouter();

//   const handleCreateSpace = () => {
//     router.push('/create-space');
//   };

//   return (
//     <>
//     <div>
//       <Header/>
//     </div>
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
//       <h1 className="text-5xl font-bold mb-8 text-gray-800">Welcome to Testimonial</h1>
//       <p className="text-lg text-gray-600 mb-6">No spaces created yet. Get started by creating a new space.</p>
//       <button
//         className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
//         onClick={handleCreateSpace}
//       >
//         Create a New Space
//       </button>
//     </div>
//     </>
    
//   );
// };

// export default HomePage;

//-----------------design for the homepage----------------

// app/page.tsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

const HomePage = () => {
  const router = useRouter();

  const handleCreateSpace = () => {
    router.push('/create-space');
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-8">
          Welcome to Testimonial
        </h1>
        <p className="text-xl text-gray-700 mb-6 max-w-lg text-center">
          No spaces created yet. Get started by creating a new space and collecting testimonials in a few clicks.
        </p>
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
          onClick={handleCreateSpace}
        >
          Create a New Space
        </button>
      </div>
    </>
  );
};

export default HomePage;

