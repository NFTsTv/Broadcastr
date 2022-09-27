import type { NextApiRequest, NextApiResponse } from 'next'
import AlchemyNFT from '../../../services/alchemyNFT';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ownerLNFTS = ["0x115d6240ed1a711de84fdba154e161b704bf2fdf"]
  const alchemyNFT = new AlchemyNFT();

  if (req.method === 'GET') {
    const { id } = req.query

    if (id && typeof id === 'string') {
      try {
        const lnfts = await alchemyNFT.getNFTs(id);
        // return lnfts with 


        return res.status(200).json({ "data": lnfts });
      } catch (e: any) {
        console.log('Unable to fetch lnft', e)
        return res.status(e.statusCode).json(e)
      }
    } else {
      console.log('Invalid request')
      return res.status(400).json({})
    }
  }

  res.status(404).json({})
}
