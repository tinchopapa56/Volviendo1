import { networks, CONTRACT_ADDRESS, CONTRACT_ABI, ERC20_ABI } from "./constants";
import { ethers } from "ethers";
import Web3Modal from "web3modal";



import { formatEth } from "../Utils";
// CONNECTION F(x)
export const changeNetwork = async (networkName) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{ ...networks[networkName] }],
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const handleNetworkSwitch = async (name = "holesky") => {
    await changeNetwork(name);
  };
  export const CHECK_WALLET_CONNECTED = async () => {
    if (!window.ethereum) return console.log("Please Install Metamaks");
    await handleNetworkSwitch();
  
    const account = await window.ethereum.request({ method: "eth_accounts" });
  
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
  
      const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
  
      return contract
    } catch (error) {
      console.log(error)
    }
  };
  export const ERC20 = async (address) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection)
  
      const network = await provider.getNetwork()
      const signer = await provider.getSigner()
  
      const contract = fetchContract(address, ERC20_ABI, signer)

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
      // console.log("ERC20 => viendo token", token)
  
      return token
    } catch (error) {
      console.log(error)
    }
  };
  export const ERC20_CONTRACT = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
  
      const contract = fetchContract(CONTRACT_ADDRESS, ERC20_ABI, signer)
  
      return contract
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
    }
  };
  export const CHECK_ACCOUNT_BALANCE = async (address) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection)
  
      const maticBal = await provider.getBalance(address) 
  
      return formatEth(maticBal)
    } catch (error) {
      console.log(error)
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
  
      } catch(error){
        console.log(error)
      }
    } else {
      return "metamask not installed"
    }    
  
  }