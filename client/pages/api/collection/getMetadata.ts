import type { NextApiRequest, NextApiResponse } from "next";
import Infura from "services/infura";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const infura = new Infura();
  if (req.method === "GET") {
    // get query params
    const { address } = req.query;
    const result = await infura.getBaseUri(address as string);
    const url = process.env.NEXT_PUBLIC_APP_URL + "/view?=" + address;

    // fetch metadata from result.result
    fetch(result)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return res.status(200).json({
          ...data,
          external_url: url,
          animation_url: url,
        });
      });
  } else {
    console.log("Invalid request");
    return res.status(400).json({});
  }
}
