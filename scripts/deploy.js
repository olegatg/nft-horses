var fs = require("fs");

async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT");

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy();
  console.log("Contract deployed to address:", myNFT.address);

  fs.writeFileSync(
    "./src/contractMetadata.json",
    JSON.stringify({ address: myNFT.address }),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );

  await myNFT.mintNFT(
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "https://gateway.pinata.cloud/ipfs/QmZTANcaGBNDkxjgrwYibeSzGwa4nCKKAvCRHf45tK87PV/horse1-metadata.json"
  );

  await myNFT.mintNFT(
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "https://gateway.pinata.cloud/ipfs/QmZTANcaGBNDkxjgrwYibeSzGwa4nCKKAvCRHf45tK87PV/horse2-metadata.json"
  );

  await myNFT.mintNFT(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "https://gateway.pinata.cloud/ipfs/QmZTANcaGBNDkxjgrwYibeSzGwa4nCKKAvCRHf45tK87PV/horse3-metadata.json"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
