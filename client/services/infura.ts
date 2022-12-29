import { create } from "ipfs-http-client";
import { LNFTMetadata } from "../types/general";
import LNFTcontractABI from "contracts/LNFTcontract-abi";
const web3 = require("web3");

export default class Infura {
  public ipfsClient;
  public web3Client;
  private readonly projectId = process.env.INFURA_IPFS_PROJECT_ID;
  private readonly projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET;
  private readonly rcpEndpoint =
    "https://goerli.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_API_KEY;

  constructor() {
    const auth =
      "Basic " +
      Buffer.from(this.projectId + ":" + this.projectSecret).toString("base64");
    this.ipfsClient = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });

    this.web3Client = new web3(this.rcpEndpoint);
  }

  public async getBaseUri(address: string) {
    const contract = new this.web3Client.eth.Contract(LNFTcontractABI, address);
    const baseUri = await contract.methods.baseTokenURI().call();
    return baseUri;
  }

  public async uploadMetadata(metadata: LNFTMetadata) {
    const cid = await this.ipfsClient.add(JSON.stringify(metadata));
    return {
      cid: cid.path,
      url: `https://lnfts.infura-ipfs.io/ipfs/${cid.path}`,
    };
  }
}
