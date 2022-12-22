
export const createMetadata = ({
  name,
  description,
  playbackId,
}: {
  name: string;
  description: string;
  playbackId: string;
}) => ({
  name: name,
  description: description,
  animation_url: "https://player-generator.vercel.app/iframe?sources=" + playbackId,
  external_url: "https://player-generator.vercel.app/iframe?sources=" + playbackId,
  image: "https://player-generator.vercel.app/iframe?sources=" + playbackId,
  properties: {
    creator_address: "",
    LNFTId: "",
  },
});

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
