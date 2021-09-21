import { fetchContract } from "./App";
import pinataSDK from "@pinata/sdk";
const uuid = require("uuid");

const pinata = pinataSDK(
  process.env.REACT_APP_PINATA_KEY,
  process.env.REACT_APP_PINATA_SECRET
);
console.log(
  process.env.REACT_APP_PINATA_KEY,
  process.env.REACT_APP_PINATA_SECRET
);

export async function breedHorse(horse1, horse2) {
  const id = uuid.v4();

  const body = {
    age: Math.floor(Math.random() * (10 - 1 + 1) + 1),
    fitness: Math.floor(Math.random() * (10 - 4 + 1) + 4),
    description: "The world's most aggresive and sensitive horse.",
    image:
      "https://gateway.pinata.cloud/ipfs/Qmb64vrKvYcP3QNHEPicF9TaYttSxs6Pmd8VH1B67aGWFk/deer.png",
    name: "Flintttttttt",
  };
  const options = {
    pinataMetadata: {
      name: id,
    },
  };

  const { IpfsHash } = await pinata.pinJSONToIPFS(body, options);
  const link = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
  console.log({ link });

  const contract = await fetchContract();

  await contract.breedHorse(link, horse1, horse2);
}
