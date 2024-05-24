import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
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
    const curr = await login(email, password);

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 50);

    console.log('sdfdsasf');

    try {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize(
          'auth-token1', curr.accessToken,
          {
            expires: expireDate
          }
        )
      );

    } catch(ex) {
      console.error('noooooo', ex);
    }


    res.status(200).json({
      message: 'success'
    });
  } catch (ex: any) {
    const statusCode =  ex.statusCode || 400;
    res.status(statusCode).json({
      message: 'Invalid auth'
    });
  }
}
