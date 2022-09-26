import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {

    try {
      // return res.status(200).json(stream);
    } catch (e: any) {
     //  console.log("Unable to fetch stream", id);
      return res.status(e.statusCode).json(e);
    }
  } else {
    console.log("Invalid request");
    return res.status(400).json({});
  }

  res.status(404).json({});
}
