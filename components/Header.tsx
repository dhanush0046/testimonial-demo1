// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const Header = () => {
//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         <div className="logo">
//           <Link href="/">
//             <Image
//               src="/testiy.png"
//               alt="Logo"
//               width={50}
//               height={50}
//               className="cursor-pointer"
//             />
//           </Link>
//         </div>
//         <nav>
//           <ul className="flex space-x-8 text-lg font-semibold text-gray-700">
//             <li className="hover:text-blue-600 transition-colors">
//               <Link href="/">Dashboard</Link>
//             </li>
//             <li className="hover:text-blue-600 transition-colors">
//               <Link href="/create-space">Create Space</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

//---------------------design update --------------------------

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="logo">
          <Link href="/">
            <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-md hover:scale-105 transform transition-transform duration-300">
              <Image
                src="/testiy.png"
                alt="Logo"
                width={48}
                height={48}
                className="cursor-pointer"
              />
            </div>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-8 text-lg font-semibold text-white">
            <li className="hover:text-gray-200 transition-colors">
              <Link href="/">Dashboard</Link>
            </li>
            <li className="hover:text-gray-200 transition-colors">
              <Link href="/create-space">Create Space</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;



