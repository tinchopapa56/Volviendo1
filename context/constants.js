import { ethers } from "ethers";
import Web3Modal from "web3Modal";

import { formatEth } from "../Utils";

//INTRERNA
import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";

export const TOKEN_ADDRESS = "";
export const ERC20_ABI = "";

export const OWNER_ADRESS = "";

export const CONTRACT_ADRESS = "";
export const CONTRACT_ABI = "";

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const tokenImage =
  "https://www.daulathussain.com/wp-content/uploads/2024/05/theblockchaincoders.jpg";

// CONNECTION F(x)
export const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{ ...networks[networkName] }],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleNetworkSwitch = async (name = "holesky") => {
  await changeNetwork({ name });
};
export const CHECK_WALLET_CONNECTED = async () => {
  if (!window.ethereum) return console.log("Please Install Metamaks");
  await handleNetworkSwitch();

  const account = await window.ethereum.request({ method: "eth_accouns" });

  if (account.length) return account[0];
  else console.log("please instal metamask");
};
export const CONNECT_WALLET = async () => {
  if (!window.ethereum) return console.log("Please Install Metamaks");
  await handleNetworkSwitch();

  const account = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  window.location.reload();
  return account[0];
};

const fetchContract = (address, abi, signer) =>  new ethers.Contract(address, abi, signer);


// ENDS CONNECTION F(x)
export const TOKEN_ICO_CONTRACT = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = fetchContract(CONTRACT_ADRESS, CONTRACT_ABI, signer)

    return contract
  } catch (err) {
    console.log(err)
  }
};
export const ERC20 = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)

    const network = await provider.getNetwork()
    const signer = await provider.getSigner()

    const userAddress = signer.getAddress();
    const balance = await contract.balanceOf(userAddress);

    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()
    const decimals = await contract.decimals()
    const address = await contract.address

    const token = {
      name, symbol, decimals, address, 
      totalSupply: ethers.utils.formatEther(totalSupply.toString()),
      balance: ethers.utils.formatEther(balance.toString()),
      chainId: network.chainId
    }
    console.log("viendo token", token)

    return token
  } catch (err) {
    console.log(err)
  }
};
export const ERC20_CONTRACT = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = fetchContract(CONTRACT_ADRESS, ERC20_ABI, signer)

    return contract
  } catch (err) {
    console.log(err)
  }
};
export const GET_BALANCE = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const maticBal = await signer.getBalance() 

    return formatEth(maticBal)
  } catch (err) {
    console.log(err)
  }
};
export const CHECK_ACCOUNT_BALANCE = async (address) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection)

    const maticBal = await provider.getBalance(address) 

    return formatEth(maticBal)
  } catch (err) {
    console.log(err)
  }
};
export const addTokenToMetamask = async () => {
  if (!window.ethereum) {
    const tokenDetails = await ERC20(TOKEN_ADDRESS)

    const [tokenDecimals, tokenAddress, tokenSynbol, tokenImg] = [tokenDetails?.decimals, TOKEN_ADDRESS, tokenDetails?.symbol, ""]

    try{
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenDetails?.address,
            symbol: tokenDetails?.symbol,
            decimals: tokenDetails?.decimals,
            image: tokenDetails?.image,
          },
        },
      })
      if(wasAdded) return "TOken correctl Added!"
      else "Couldn not add token!"

    } catch(err){
      console.log(err)
    }
  } else {
    return "metamask not installed"
  }    

}