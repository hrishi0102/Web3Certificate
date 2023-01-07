import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ethers } from "ethers";
import sbtContract from "./ethereum/sbt";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Home from "./components/Home";
import Redirection from "./components/Redirection";
import { useNavigation } from "react-router-dom/dist";
const projectId = "2IQSkxfdw8MFjp3naF8d63FXrzz";
const projectSecretKey = "70df5ccae147c222655a4383541a212e";
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState();
  const [SbtContract, setSbtContract] = useState();
  const [SendSuccess, setSendSuccess] = useState("");
  const [SendError, setSendError] = useState("");
  const [TransactionData, setTransactionData] = useState();

  const [uploadedImages, setUploadedImages] = useState();
  const [Inputname, setName] = useState();
  const [Inputdesc, setDesc] = useState();
  const [baseUri, setUri] = useState();
  //const [flg, setflg] = useState(0);

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = event.target.name.value;
    const desc = event.target.desc.value;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];

    // upload files
    const result = await ipfs.add(file);
    setUploadedImages("https://skywalker.infura-ipfs.io/ipfs/" + result.path);
    setName(String(name));
    setDesc(String(desc));
    form.reset();

    const updatedJSON = `{
      "name": "${Inputname}",
      "description": "${Inputdesc}",
      "image": "${uploadedImages}"
    }`;

    const DataStorage = async (event) => {
      const ans = await ipfs.add(updatedJSON);
      setUri(String(ans.path));
    };
    DataStorage();
  };

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        /* get accounts */
        const accounts = await provider.send("eth_requestAccounts", []);
        /* get signer */
        setSigner(provider.getSigner());
        /* local contract instance */
        setSbtContract(sbtContract(provider));
        /* set active wallet address */
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        /* get accounts */
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          /* get signer */
          setSigner(provider.getSigner());
          /* local contract instance */
          setSbtContract(sbtContract(provider));
          /* set active wallet address */
          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect Wallet button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  const sendCBT = async () => {
    setSendError("");
    setSendSuccess("");
    try {
      const sbtwithSigner = SbtContract.connect(signer);
      const resp = await sbtwithSigner.safeMint(
        document.getElementById("mintadd").value,
        baseUri
        //"Qmb7Evd5LQeKgKn43WZy6owoTa6mJayX7YvGodpqjTn2Fm"
      );
      console.log("baseUri");
      console.log(baseUri);
      setSendSuccess("Successful");
      setTransactionData(resp.hash);
    } catch (err) {
      setSendError(err.message);
    }
  };

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Redirection />} />
        </Routes>
    </BrowserRouter>
      <ParticlesBg type="cobweb" bg={true} />
      <nav className="navbar is-black">
        <div className="navbar-brand ml-3">
          <h1 className="navbar-item has-text-white has-text-weight-bold is-size-4">
            Certify
          </h1>
        </div>

        <div id="navbarMenu" className="navbar-menu mr-4">
          <div className="navbar-end is-align-items-center">
            <button
              className="button is-white connect-wallet"
              onClick={connectWallet}
            >
              <span className="is-link has-text-weight-bold">
                {walletAddress && walletAddress.length > 0
                  ? `Connected: ${walletAddress.substring(
                      0,
                      6
                    )}...${walletAddress.substring(38)}`
                  : "Connect Wallet"}
              </span>
            </button>
          </div>
        </div>
      </nav>
      <div className="mt-4 center">
        <h1 className="center-text has-text-black has-text-weight-semibold">
          Create, Mint and Send Certificates as SoulBound Tokens (non
          transferrable NFTS) !
        </h1>
      </div>

      <section className="hero is-fullheight center">
        <div className="containerform">
          <h1 className="has-text-black">Upload Certificate Details </h1> <br />
          <form onSubmit={onSubmitHandler}>
            <label
              for="file-upload"
              className="custom-file-upload has-text-black"
            >
              Select Image:
            </label>
            <input
              id="file-upload"
              type="file"
              name="file"
              className="mb-5 ml-5 button "
            />
            <br />
            <label for="name" className="custom-name has-text-black">
              Name of Recipient:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input is-small mb-5 "
            />
            <br />
            <label
              for="description"
              className="custom-description has-text-black"
            >
              Description of Certificate :
            </label>
            <input
              type="text"
              id="desc"
              name="desc"
              className="input is-small "
            />
            <br />
            <button className="button is-small mt-5" type="submit">
              Submit Data
            </button>{" "}
          </form>
          <div className="mt-5">
            <label
              for="description"
              className="custom-description has-text-black"
            >
              Recipient's Wallet address :
            </label>
            <input
              className="input is-small "
              type="text"
              id="mintadd"
              placeholder="Enter wallet address to send to (0x...)"
            />
            <button
              className="button is-link is-medium mt-4"
              onClick={sendCBT}
              disabled={walletAddress ? false : true}
            >
              Send Certificate
            </button>
          </div>
          <article className="panel mt-5">
            <p className="panel-heading">Transaction Data</p>
            <div className="panel-block">
              <p className="has-text-success">
                {TransactionData ? `Transaction hash: ${TransactionData}` : "No Transactions done till now"}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
    );
}


export default App;
