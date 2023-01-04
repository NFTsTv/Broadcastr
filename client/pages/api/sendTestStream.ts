import type { NextApiRequest, NextApiResponse } from "next";

const sendTestStream = async (streamKey: string) => {
  return fetch("https://teststream.live/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      streamKey: streamKey,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body)
  if (req.method === "POST") {
    try {
      const result = await sendTestStream(body.streamKey);
      return res.status(200).json(result);
    } catch (e: any) {
      return res.status(e.statusCode).json(e);
    }
  } else {
    return res.status(400).json({});
  }
}
