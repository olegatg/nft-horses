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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
