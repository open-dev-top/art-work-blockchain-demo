/* eslint-disable jest/valid-expect */
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
    let NFTMarketplace, nftMarketplace, owner, seller, buyer;
    const listPrice = ethers.utils.parseEther("0.01");
    const nftPrice = ethers.utils.parseEther("1");

    beforeEach(async function () {
        [owner, seller, buyer] = await ethers.getSigners();
        NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        nftMarketplace = await NFTMarketplace.deploy();
        await nftMarketplace.deployed();
    });

    it("Should set the correct listing price", async function () {
        expect(await nftMarketplace.getListPrice()).to.equal(listPrice);
    });

    it("Should allow a user to create an NFT and list it", async function () {
        await expect(
            nftMarketplace.connect(seller).createToken("tokenURI1", nftPrice, { value: listPrice })
        )
            .to.emit(nftMarketplace, "TokenListedSuccess")
            .withArgs(1, nftMarketplace.address, seller.address, nftPrice, true);
    });

    it("Should retrieve all NFTs listed on the marketplace", async function () {
        await nftMarketplace.connect(seller).createToken("tokenURI1", nftPrice, { value: listPrice });
        await nftMarketplace.connect(seller).createToken("tokenURI2", nftPrice, { value: listPrice });
        const allNFTs = await nftMarketplace.getAllNFTs();
        expect(allNFTs.length).to.equal(2);
    });

    it("Should allow a user to purchase an NFT", async function () {
        await nftMarketplace.connect(seller).createToken("tokenURI1", nftPrice, { value: listPrice });
        await expect(
            nftMarketplace.connect(buyer).executeSale(1, { value: nftPrice })
        ).to.changeEtherBalances([seller, owner], [nftPrice, listPrice]);
        
        const token = await nftMarketplace.getListedTokenForId(1);
        expect(token.seller).to.equal(buyer.address);
    });
});
