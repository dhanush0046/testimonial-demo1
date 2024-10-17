// //pages/api/testimonial.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../lib/prisma';
// import formidable from 'formidable';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error parsing form data', error: err });
//       }

//       const spaceId = fields.spaceId?.[0];
//       const type = fields.type?.[0];

//       if (!spaceId || !type) {
//         return res.status(400).json({ message: 'Missing required fields' });
//       }

//       // Make sure the space exists before creating a testimonial
//       const space = await prisma.space.findUnique({
//         where: { id: spaceId },
//       });

//       if (!space) {
//         return res.status(404).json({ message: 'Space not found' });
//       }

//       let content: string;

//       if (type === 'text') {
//         content = fields.content?.[0] || '';
//       } else if (type === 'video') {
//         const videoFile = files.video?.[0] as formidable.File | undefined;
//         if (!videoFile) {
//           return res.status(400).json({ message: 'Video file is missing' });
//         }
//         // Here you would typically upload the video to a cloud storage service
//         // and store the URL in the database. For this example, we'll just use a placeholder.
//         content = `video_url_for_${videoFile.originalFilename}`;
//       } else {
//         return res.status(400).json({ message: 'Invalid testimonial type' });
//       }

//       // Create the testimonial
//       const newTestimonial = await prisma.testimonial.create({
//         data: {
//           spaceId,
//           content,
//           type,
//         },
//       });

//       return res.status(200).json({ newTestimonial });
//     });
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// }

//---chat GPT----- down----
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../lib/prisma';
// import formidable from 'formidable';
// import fs from 'fs';
// import AWS from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js built-in body parser to handle file uploads
//   },
// };

// // AWS S3 configuration
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// async function uploadToS3(file: formidable.File) {
//   const fileContent = fs.readFileSync(file.filepath);
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME!,
//     Key: `${uuidv4()}_${file.originalFilename}`, // Unique filename
//     Body: fileContent,
//     ContentType: file.mimetype || 'video/webm', // Content type
//   };

//   // Upload the file to S3
//   const { Location } = await s3.upload(params).promise();
//   return Location; // Return the URL of the uploaded file
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error parsing form data', error: err });
//       }

//       const spaceId = fields.spaceId?.[0];
//       const type = fields.type?.[0];

//       if (!spaceId || !type) {
//         return res.status(400).json({ message: 'Missing required fields' });
//       }

//       // Ensure the space exists
//       const space = await prisma.space.findUnique({
//         where: { id: spaceId },
//       });

//       if (!space) {
//         return res.status(404).json({ message: 'Space not found' });
//       }

//       let content: string;

//       if (type === 'text') {
//         content = fields.content?.[0] || '';
//       } else if (type === 'video') {
//         const videoFile = files.video?.[0] as formidable.File | undefined;
//         if (!videoFile) {
//           return res.status(400).json({ message: 'Video file is missing' });
//         }

//         // Upload video to S3
//         const videoUrl = await uploadToS3(videoFile);
//         content = videoUrl; // Store the S3 URL in the database
//       } else {
//         return res.status(400).json({ message: 'Invalid testimonial type' });
//       }

//       // Create the testimonial in the database
//       const newTestimonial = await prisma.testimonial.create({
//         data: {
//           spaceId,
//           content,
//           type,
//         },
//       });

//       return res.status(200).json({ newTestimonial });
//     });
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// }


// -------------- down ---- v0000000000000000

// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../lib/prisma';
// import { IncomingForm, File } from 'formidable';
// import { S3Client } from '@aws-sdk/client-s3';
// import { Upload } from '@aws-sdk/lib-storage';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// async function uploadToS3(file: File): Promise<string> {
//   const fileStream = fs.createReadStream(file.filepath);
//   const upload = new Upload({
//     client: s3Client,
//     params: {
//       Bucket: process.env.AWS_S3_BUCKET_NAME!,
//       Key: `testimonials/${Date.now()}-${file.originalFilename}`,
//       Body: fileStream,
//     },
//   });

//   const result = await upload.done();
//   return result.Location!;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const form = new IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error parsing form data', error: err });
//       }

//       const spaceId = fields.spaceId?.[0];
//       const type = fields.type?.[0];

//       if (!spaceId || !type) {
//         return res.status(400).json({ message: 'Missing required fields' });
//       }

//       try {
//         // Make sure the space exists before creating a testimonial
//         const space = await prisma.space.findUnique({
//           where: { id: spaceId },
//         });

//         if (!space) {
//           return res.status(404).json({ message: 'Space not found' });
//         }

//         let content: string;

//         if (type === 'text') {
//           content = fields.content?.[0] || '';
//         } else if (type === 'video') {
//           const videoFile = files.video?.[0] as File | undefined;
//           if (!videoFile) {
//             return res.status(400).json({ message: 'Video file is missing' });
//           }
//           content = await uploadToS3(videoFile);
//         } else {
//           return res.status(400).json({ message: 'Invalid testimonial type' });
//         }

//         // Create the testimonial
//         const newTestimonial = await prisma.testimonial.create({
//           data: {
//             spaceId,
//             content,
//             type,
//           },
//         });

//         return res.status(200).json({ newTestimonial });
//       } catch (error) {
//         console.error('Error creating testimonial:', error);
//         return res.status(500).json({ message: 'Error creating testimonial', error });
//       }
//     });
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// }


// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../lib/prisma';
// import { IncomingForm, File } from 'formidable';
// import { S3Client } from '@aws-sdk/client-s3';
// import { Upload } from '@aws-sdk/lib-storage';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// async function uploadToS3(file: File): Promise<string> {
//   const fileStream = fs.createReadStream(file.filepath);
//   const upload = new Upload({
//     client: s3Client,
//     params: {
//       Bucket: process.env.AWS_S3_BUCKET_NAME!,
//       Key: `testimonials/${Date.now()}-${file.originalFilename}`,
//       Body: fileStream,
//     },
//   });

//   const result = await upload.done();
//   return result.Location!;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     if (req.headers['content-type']?.startsWith('application/json')) {
//       // Handle JSON data (text testimonials)
//       const { spaceId, content, type } = req.body;

//       if (!spaceId || !content || !type) {
//         return res.status(400).json({ message: 'Missing required fields' });
//       }

//       try {
//         const space = await prisma.space.findUnique({
//           where: { id: spaceId },
//         });

//         if (!space) {
//           return res.status(404).json({ message: 'Space not found' });
//         }

//         const newTestimonial = await prisma.testimonial.create({
//           data: {
//             spaceId,
//             content,
//             type,
//           },
//         });

//         return res.status(200).json({ newTestimonial });
//       } catch (error) {
//         console.error('Error creating testimonial:', error);
//         return res.status(500).json({ message: 'Error creating testimonial', error });
//       }
//     } else {
//       // Handle form data (video testimonials)
//       const form = new IncomingForm();
//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           return res.status(500).json({ message: 'Error parsing form data', error: err });
//         }

//         const spaceId = fields.spaceId?.[0];
//         const type = fields.type?.[0];

//         if (!spaceId || !type) {
//           return res.status(400).json({ message: 'Missing required fields' });
//         }

//         try {
//           const space = await prisma.space.findUnique({
//             where: { id: spaceId },
//           });

//           if (!space) {
//             return res.status(404).json({ message: 'Space not found' });
//           }

//           let content: string;

//           if (type === 'video') {
//             const videoFile = files.video?.[0] as File | undefined;
//             if (!videoFile) {
//               return res.status(400).json({ message: 'Video file is missing' });
//             }
//             content = await uploadToS3(videoFile);
//           } else {
//             return res.status(400).json({ message: 'Invalid testimonial type' });
//           }

//           const newTestimonial = await prisma.testimonial.create({
//             data: {
//               spaceId,
//               content,
//               type,
//             },
//           });

//           return res.status(200).json({ newTestimonial });
//         } catch (error) {
//           console.error('Error creating testimonial:', error);
//           return res.status(500).json({ message: 'Error creating testimonial', error });
//         }
//       });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { IncomingForm, File } from 'formidable';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function uploadToS3(file: File): Promise<string> {
  const fileStream = fs.createReadStream(file.filepath);
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `testimonials/${Date.now()}-${file.originalFilename}`,
      Body: fileStream,
    },
  });

  const result = await upload.done();
  return result.Location!;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (req.headers['content-type']?.startsWith('application/json')) {
      // Handle JSON data (text testimonials)
      let body;
      try {
        body = JSON.parse(await new Promise((resolve) => {
          let data = '';
          req.on('data', (chunk) => {
            data += chunk;
          });
          req.on('end', () => {
            resolve(data);
          });
        }));
      } catch (error) {
        return res.status(400).json({ message: 'Invalid JSON' });
      }

      const { spaceId, content, type } = body;

      if (!spaceId || !content || !type) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      try {
        const space = await prisma.space.findUnique({
          where: { id: spaceId },
        });

        if (!space) {
          return res.status(404).json({ message: 'Space not found' });
        }

        const newTestimonial = await prisma.testimonial.create({
          data: {
            spaceId,
            content,
            type,
          },
        });

        return res.status(200).json({ newTestimonial });
      } catch (error) {
        console.error('Error creating testimonial:', error);
        return res.status(500).json({ message: 'Error creating testimonial', error });
      }
    } else {
      // Handle form data (video testimonials)
      const form = new IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(500).json({ message: 'Error parsing form data', error: err });
        }

        const spaceId = fields.spaceId?.[0];
        const type = fields.type?.[0];

        if (!spaceId || !type) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
          const space = await prisma.space.findUnique({
            where: { id: spaceId },
          });

          if (!space) {
            return res.status(404).json({ message: 'Space not found' });
          }

          let content: string;

          if (type === 'video') {
            const videoFile = files.video?.[0] as File | undefined;
            if (!videoFile) {
              return res.status(400).json({ message: 'Video file is missing' });
            }
            content = await uploadToS3(videoFile);
          } else {
            return res.status(400).json({ message: 'Invalid testimonial type' });
          }

          const newTestimonial = await prisma.testimonial.create({
            data: {
              spaceId,
              content,
              type,
            },
          });

          return res.status(200).json({ newTestimonial });
        } catch (error) {
          console.error('Error creating testimonial:', error);
          return res.status(500).json({ message: 'Error creating testimonial', error });
        }
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}