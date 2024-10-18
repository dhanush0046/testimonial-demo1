// pages/api/signed-url.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextApiRequest, NextApiResponse } from 'next';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { videoName, videoType } = req.body;

  if (!videoName || !videoType) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const Key = `testimonials/videos/${videoName}`;
    const signedUrl = await getS3SignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key,
        ContentType: videoType,
      }),
      { expiresIn: 60 * 15 } // 15 minutes
    );
    
    res.status(200).json({ url: signedUrl });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
}
