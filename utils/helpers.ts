
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
  animation_url: "",
  external_url: "https://lvpr.tv/?muted=0&v=" + playbackId,
  image: "",
  properties: {
    creator_address: "",
    LNFTId: "",
  },
});

export const parseStringToNumber = (value: string) => {
  // allow floats and integers
  const regex = /^-?\d*(\.\d+)?$/;
  if (regex.test(value)) {
    return Number(value);
  }
  return 0;
};
