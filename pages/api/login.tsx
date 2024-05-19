import type { NextApiRequest, NextApiResponse } from 'next';
import { login } from '../../app/singleton/user'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  if (req.method !== "POST") {
    return res.status(404).json({ message: 'invalid path' });
  }

  const {
    email, password
  } = req.body;

  try {
    await login(email, password);
    res.status(200);
  } catch (ex: any) {
    const statusCode =  ex.statusCode || 400;
    res.status(statusCode).json({
      message: 'Invalid auth'
    });
  }
}
