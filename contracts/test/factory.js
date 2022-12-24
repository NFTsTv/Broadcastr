

const { expect } = require("chai");

describe("LNFTFactory", function () {
  let lnftFactory;
  let alice;

  beforeEach(async function () {
    // Deploy the LNFTFactory contract
    const LnftFactory = await ethers.getContractFactory("LNFTFactory")
    lnftFactory = await LnftFactory.deploy();
    // Get the first available account as the creator
    alice = (await ethers.getSigners())[0];
  });

  it("should create a new LiveNFT contract", async function () {
    // Define the parameters for the createLiveNFT function
    uri = "https://example.com/my-nft";
    name = "My NFT";
    description = "This is my NFT";
    totalSupply = 2;
    mintPrice = BigInt(1)

    // Call the createLiveNFT function
    const tx = await lnftFactory.createLiveNFT(
      uri,
      name,
      description,
      totalSupply,
      mintPrice
    );
    // Wait for the transaction to be mined
    await tx.wait();

    // Get the address of the new LiveNFT contract
    const liveNFTAddress = await lnftFactory.livenfts(0)
    // Load the LiveNFT contract at the given address
    liveNFT = await ethers.getContractAt("LiveNFT", liveNFTAddress);

  })

  it("should have the correct URI, name, description, and total supply", async function () {
    // Retrieve the values of the LiveNFT contract
    const retrievedURI = await liveNFT.baseTokenURI();
    const retrievedName = await liveNFT.name();
    const retrievedDescription = await liveNFT.description();
    const retrievedTotalSupply = await liveNFT.totalSupply();

    // Use Chai's expect function to check that the values match the expected ones
    expect(retrievedURI).to.equal(uri);
    expect(retrievedName).to.equal(name);
    expect(retrievedDescription).to.equal(description);
    expect(retrievedTotalSupply).to.equal(totalSupply);
  });

  it("should have the correct owner", async function () {
    // Retrieve the owner of the LiveNFT contract
    const retrievedOwner = await liveNFT.owner();

    // Use Chai's expect function to check that the owner is the creator (Alice)
    expect(retrievedOwner).to.equal(alice.address);
  });

  it("should not allow Alice to mint new tokens due to price", async function () {
    // Define the parameters for the mint function
    const to = alice.address;
    const value = 0;  // set the value of the NFT token
    // Call the buy function
    try {
      // Call the mintTo function
      const tx = await liveNFT.mintTo(to, { value: value });
      // Wait for the transaction to be mined
      await tx.wait();
      expect.fail();
    } catch (error) {
      console.log(error.message)
      // Check that the error is the expected one (revert)
      expect(error.message).to.include("revert");
    }
  })

  it("should allow Alice to mint new tokens", async function () {
    // Define the parameters for the mint function
    const to = alice.address;
    const tokenId = 1;
    const value = BigInt(1);  // set the value of the NFT token
    // Call the mintTo function
    const tx = await liveNFT.mintTo(to, { value: value });
    // Wait for the transaction to be mined
    await tx.wait();

    // Retrieve the owner of the token with the given tokenId
    const retrievedOwner = await liveNFT.ownerOf(tokenId);

    // Use Chai's expect function to check that the owner of the token is now Alice
    expect(retrievedOwner).to.equal(alice.address);
  });



  it("should not allow Alice to mint new tokens due to supply limit", async function () {
    // Define the parameters for the mint function
    const to = alice.address;
    const value = 1;  // set the value of the NFT token
    // Call the buy function
    try {
      // Call the mintTo function
      const tx = await liveNFT.mintTo(to, { value: value });
      // Wait for the transaction to be mined
      await tx.wait();
      expect.fail();
    } catch (error) {
      console.log(error.message)

      // Check that the error is the expected one (revert)
      expect(error.message).to.include("revert");
    }
  })

});
