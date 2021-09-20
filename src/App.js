import * as React from "react";
import { ethers } from "ethers";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MyNFT from "./artifacts/contracts/MyNFT.sol/MyNFT.json";
import Button from "@mui/material/Button";
const metadata = require("./contractMetadata.json");

function convertHex(hex) {
  return parseInt(hex._hex, 16);
}

async function fetchNFTsMetadata() {
  await window.ethereum.enable();
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // could suffice to use provider, but then one gets a diferent adress in setBetting
    // so we can use signer in both places or come up with a different id mechanism (probably bet id or so)
    const contract = new ethers.Contract(metadata.address, MyNFT.abi, signer);

    const allNFTs = await contract.getAllNFTs();

    const arrOfPromises = allNFTs.map((nft) =>
      fetch(nft).then((response) => response.json())
    );
    return Promise.all(arrOfPromises);
  }
}

function App() {
  const [data, setData] = React.useState(undefined);

  React.useEffect(() => {
    fetchNFTsMetadata().then((response) => setData(response));
  }, []);

  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <div className="App">
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <Typography variant="h4" component="div" gutterBottom>
          Horse NFTs
        </Typography>
        {data.map((horseMetadata) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={horseMetadata.image} />
              </ListItemAvatar>
              <ListItemText
                primary={`Age: ${horseMetadata.age}, Fitness: ${horseMetadata.fitness}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {horseMetadata.name}
                    </Typography>
                    {` — ${horseMetadata.description}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </div>
  );
}

export default App;
