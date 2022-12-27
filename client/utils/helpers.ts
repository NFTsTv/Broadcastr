import { LiveNFT } from "types/general";

export const createMetadata = ({
  name,
  description,
  LNFTId,
  playbackUrl,
  address,
  streamId,
}: {
  name: string;
  description: string;
  LNFTId: string;
  playbackUrl: string;
  address: string;
  streamId: string;
}) => {
  const url =
    "https://player-generator.vercel.app/iframe?poster=https://streameth.tv/social.png&streamid=" +
    streamId;
  return {
    name: name,
    description: description,
    animation_url: url,
    external_url: url,
    image: url,
    properties: {
      creator_address: address,
      LNFTId: LNFTId,
    },
  };
};

export const parseParams = (params: Array<string>): LiveNFT => {
  return {
    baseUri: params[0],
    name: params[1],
    description: params[2],
    price: BigInt(params[3]),
    totalSupply: Number(params[4]),
  };
};

export function getRandomTailwindColor(): string {
  const tailwindColors = [
    "red-500",
    "orange-500",
    "yellow-500",
    "green-500",
    "teal-500",
    "blue-500",
    "indigo-500",
    "purple-500",
    "pink-500",
  ];

  const randomIndex = Math.floor(Math.random() * tailwindColors.length);
  return tailwindColors[randomIndex];
}

export const parseStringToNumber = (value: string) => {
  // allow floats and integers
  const regex = /^-?\d*(\.\d+)?$/;
  if (regex.test(value)) {
    return Number(value);
  }
  return 0;
};
