// // pages/api/spaces.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// // import prisma from '../../lib/prisma';
// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { spaceName, headerTitle, customMessage, questions } = req.body;
    
//     const newSpace = await prisma.space.create({
//       data: {
//         spaceName,
//         headerTitle,
//         customMessage,
//         questions,
//         shareableLink: `/testimonials/${Date.now()}`,
//       },
//     });

//     res.status(200).json({ newSpace });
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


//---doem test

// // pages/api/spaces.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { spaceName, headerTitle, customMessage, questions } = req.body;

//     try {
//       // First, create the space without the shareable link
//       const newSpace = await prisma.space.create({
//         data: {
//           spaceName,
//           headerTitle,
//           customMessage,
//           questions,
          
//         },
//       });

//       // Generate the shareable link using the space ID
//       const shareableLink = `/submit-testimonial/${newSpace.id}`;

//       // Update the space with the generated shareable link
//       const updatedSpace = await prisma.space.update({
//         where: { id: newSpace.id },
//         data: {
//           shareableLink,  // Now the shareable link is part of the space data
//         },
//       });

//       res.status(200).json({ newSpace: updatedSpace });
//     } catch (error) {
//       console.error('Error creating space:', error);
//       res.status(500).json({ message: 'Failed to create space', error });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  if (req.method === 'POST') {
    const { spaceName, headerTitle, customMessage, questions } = req.body;

    if (!spaceName || !headerTitle || !customMessage || !Array.isArray(questions)) {
      return res.status(400).json({ message: 'Missing or invalid required fields' });
    }

    try {
      const newSpace = await prisma.space.create({
        data: {
          spaceName,
          headerTitle,
          customMessage,
          questions,
        },
      });

      // Generate the shareable link using the space ID
      const shareableLink = `/submit-testimonial/${newSpace.id}`;

      // Update the space with the generated shareable link
      const updatedSpace = await prisma.space.update({
        where: { id: newSpace.id },
        data: {
          shareableLink,
        },
      });

      res.status(201).json({ newSpace: updatedSpace });
    } catch (error) {
      console.error('Error creating space:', error);
      res.status(500).json({ message: 'Error creating space', error: error instanceof Error ? error.message : String(error) });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}