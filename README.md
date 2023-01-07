# Certify- Blockchain Based Certificates
Track Criminal Records using Non transferrable ERC721 Tokens (Inspired By: SBT- Soul Bound Token)

<p align="center">
    Make Sure you have React installed for local setup of this project
    <br />
    <a href="https://reactjs.org/"><strong>Learn more about React »</strong></a>
    <br />
    <a href="https://github.com/hrishi0102/Web3Certificate/issues">Report Bug</a>
    <br />
  <a href="https://github.com/hrishi0102/Web3Certificate">Project Link</a>
 </p>
 
## ✍️ Table of Contents
- [About the Project](#about-the-project)
- [Project Breakdown](#project-breakdown)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)

 
 ## 🔨 Project Breakdown 
- Developing ERC721 contract. Making changes to this contract and giving it the Sould Bound properties. Changing the before token transfer and after token transfer phases.
- Deploying the contract using hardhat on goerli test network.
- Using Ethers JS for smart contract interaction and safely minting the CBT.
- Using IPFS for setting up the IPFS http client on the development server and adding metadata to the IPFS and receiving the IPFS hash for the CBT data.
- Using ReactJS for setting up IPFS infura client node, ethers.js and also for providing the development server.

### 🔧 Built With
- Frontend:
  - HTML
  - React
  - Ethers
  - JavaScript
  - IPFS HTTP Client
- Contract: 
  - Solidity
  - Remix
  - Metamask
  - Hardhat
 
## 🚀 Getting Started
To get a local copy up and running follow these simple steps.

### 🔨 Installation
1. Clone the repo

```sh
git clone https://github.com/hrishi0102/Web3Certificate.git
```

2. Installing dependencies and requirements

```sh
cd Web3Certificate
npm install ethers
npm install ipfs-http-client
```

3. Running the APP
```sh
npm start
```

## 🧠 Usage
Built version:
- npm v8.1.2
- Node v16.13.2

The Basic goal is to make certificate records for police accessible and easy to fetch for investigations.
Reliable and data once minted cannot be deleted or erased which happens in centralized systems.

## 🤠 Contributions 
Open for contributions. Just clone and follow the installation. Make changes and raise a PR detailing about the changes made.
