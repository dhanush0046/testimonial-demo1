// //pages/api/testimonials.ts
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
//       let body;
//       try {
//         body = JSON.parse(await new Promise((resolve) => {
//           let data = '';
//           req.on('data', (chunk) => {
//             data += chunk;
//           });
//           req.on('end', () => {
//             resolve(data);
//           });
//         }));
//       } catch (error) {
//         return res.status(400).json({ message: 'Invalid JSON' });
//       }

//       const { spaceId, content, type } = body;

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

//----------down -- new aws s3 ----signed url----------
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../lib/prisma';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// async function generateSignedUrl(fileName: string, fileType: string): Promise<string> {
//   const command = new PutObjectCommand({
//     Bucket: process.env.AWS_S3_BUCKET_NAME!,
//     Key: `testimonials/${Date.now()}-${fileName}`,
//     ContentType: fileType,
//   });

//   const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
//   return signedUrl;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { spaceId, content, type, fileName, fileType } = req.body;

//     if (!spaceId || !type) {
//       return res.status(400).json({ message: 'Missing required fields: spaceId or type' });
//     }

//     try {
//       const space = await prisma.space.findUnique({
//         where: { id: spaceId },
//       });

//       if (!space) {
//         return res.status(404).json({ message: 'Space not found' });
//       }

//       if (type === 'text') {
//         if (!content) {
//           return res.status(400).json({ message: 'Missing required field: content' });
//         }

//         const newTestimonial = await prisma.testimonial.create({
//           data: {
//             spaceId,
//             content,
//             type,
//           },
//         });

//         return res.status(200).json({ newTestimonial });
//       } else if (type === 'video') {
//         if (!fileName || !fileType) {
//           return res.status(400).json({ message: 'Missing required fields: fileName or fileType' });
//         }

//         const signedUrl = await generateSignedUrl(fileName, fileType);
//         const videoUrl = signedUrl.split('?')[0];

//         const newTestimonial = await prisma.testimonial.create({
//           data: {
//             spaceId,
//             content: videoUrl,
//             type,
//           },
//         });

//         return res.status(200).json({ signedUrl, newTestimonial });
//       } else {
//         return res.status(400).json({ message: 'Invalid testimonial type' });
//       }
//     } catch (error) {
//       console.error('Error creating testimonial:', error);
//       return res.status(500).json({ message: 'Error creating testimonial', error: (error as Error).message });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// }


//-----------------------finall-----------------------
//pages/api/testimonials.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { spaceId, content, type, videoUrl } = req.body;

    if (!spaceId || !type) {
      return res.status(400).json({ message: 'Missing required fields: spaceId or type' });
    }

    try {
      const space = await prisma.space.findUnique({
        where: { id: spaceId },
      });

      if (!space) {
        return res.status(404).json({ message: 'Space not found' });
      }

      if (type === 'text') {
        if (!content) {
          return res.status(400).json({ message: 'Missing required field: content' });
        }

        const newTestimonial = await prisma.testimonial.create({
          data: {
            spaceId,
            content,
            type,
          },
        });

        return res.status(200).json({ newTestimonial });
      } else if (type === 'video') {
        if (!videoUrl) {
          return res.status(400).json({ message: 'Missing required field: videoUrl' });
        }

        const newTestimonial = await prisma.testimonial.create({
          data: {
            spaceId,
            content: videoUrl,
            type,
          },
        });

        return res.status(200).json({ newTestimonial });
      } else {
        return res.status(400).json({ message: 'Invalid type. Must be "text" or "video".' });
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

// ------------------final----uppp------------------------------------------