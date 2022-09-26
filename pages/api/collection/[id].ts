import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query

    if (id && typeof id === 'string') {
      try {
        return res.status(200).json({"a": "b"})
      } catch (e: any) {
        console.log('Unable to fetch lnft', id)
        return res.status(e.statusCode).json(e)
      }
    } else {
      console.log('Invalid request')
      return res.status(400).json({})
    }
  }

  res.status(404).json({})
}
