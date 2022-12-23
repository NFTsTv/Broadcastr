import type { NextApiRequest, NextApiResponse } from "next";
import Infura from "services/infura";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const infura = new Infura();
  if (req.method === "POST") {
    const result = await infura.uploadMetadata(req.body);
    try {
      return res.status(200).json(result);
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  } else {
    console.log("Invalid request");
    return res.status(400).json({});
  }
}
