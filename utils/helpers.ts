
import { LiveNFT } from "context/createContext";

export const createMetadata = ({
  name,
  description,
  LNFTId,
  playbackUrl,
  address
}: {
  name: string;
  description: string;
  LNFTId: string;
  playbackUrl: string;
  address: string
}) => ({
  name: name,
  description: description,
  animation_url: "https://player-generator.vercel.app/iframe?sources=" + playbackUrl,
  external_url: "https://player-generator.vercel.app/iframe?sources=" + playbackUrl,
  image: "https://player-generator.vercel.app/iframe?sources=" + playbackUrl,
  properties: {
    creator_address: address,
    LNFTId: LNFTId,
  },
});

export const parseParams = (params: Array<string>): LiveNFT => {
  return {
    baseUri: params[0],
    name: params[1],
    description: params[2],
  };
};

export function getRandomTailwindColor(): string {
  const tailwindColors = [
    'red-500',
    'orange-500',
    'yellow-500',
    'green-500',
    'teal-500',
    'blue-500',
    'indigo-500',
    'purple-500',
    'pink-500',
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
