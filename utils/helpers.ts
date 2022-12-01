
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