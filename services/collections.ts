import { lnft } from "../types/general";

export const getNFTs = async (id: string) : Promise<lnft[]> => {
  const response = await fetch(`/api/collection/${id}`);
  const lnfts = await response.json();
  return lnfts;
};
