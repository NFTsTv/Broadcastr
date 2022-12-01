import { create } from "ipfs-http-client";
import { LNFTMetadata } from "../types/general";



export default class Infura {
  public ipfsClient;
  private readonly projectId = process.env.INFURA_IPFS_PROJECT_ID;
  private readonly projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET;
  
  constructor() {

    const auth =
    "Basic " + Buffer.from(this.projectId + ":" + this.projectSecret).toString("base64");
    this.ipfsClient = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
  }

  public async uploadMetadata(metadata: LNFTMetadata) {
    const cid = await this.ipfsClient.add(JSON.stringify(metadata));
    return {
      cid: cid.path,
      url: `https://lnfts.infura-ipfs.io/ipfs/${cid.path}`,
    };
  }
}
