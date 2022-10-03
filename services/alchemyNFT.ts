import {lnft} from "../types/general";
import {get} from "../utils/requests";


const baseApiUrl = `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_ID}`

export default class AlchemyNFT {

  async getNFTs(id: string): Promise<lnft[]> {
    console.log(id)
    const lnfts = await get(`${baseApiUrl}/getNFTs?withMetadata=true&owner=${id}`);
    console.log(lnfts)  
    return lnfts.ownedNfts;
  }
}