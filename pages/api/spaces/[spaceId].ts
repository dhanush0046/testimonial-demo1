// pages/api/spaces/[spaceId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { spaceId } = req.query;

  if (req.method === 'GET') {
    try {
      const space = await prisma.space.findUnique({
        where: { id: spaceId as string },
      });

      if (!space) {
        return res.status(404).json({ message: 'Space not found' });
      }

      res.status(200).json(space);
    } catch (error) {
      console.error('Error fetching space:', error);
      res.status(500).json({ message: 'Error fetching space', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}