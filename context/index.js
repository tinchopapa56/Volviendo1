import React, { useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import {
  CHECK_WALLET_CONNECTED,
  CONNECT_WALLET,
  GET_BALANCE,
  CHECK_ACCOUNT_BALANCE,
  TOKEN_ICO_CONTRACT,
  ERC20,
  ERC20_CONTRACT,
  TOKEN_ADDRESS,
  addTokenToMetamask,
} from "./constants";
import { formatEth } from "../Utils";

export const TOKEN_ICO_context = React.createContext();

export const TOKEN_ICO_Provider = ({ children }) => {
  const DAPP_NAME = "TOken app NAME";
  const currency = "ETH";
  const network = "Holesky";

  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState(false);
  const [balance, setBalance] = useState(false);

  const toastSuccess = (msg) => toast.success(msg, { duration: 2000 });
  const toastError = (msg) => toast.error(msg, { duration: 2000 });

  //CONTRACT F(x)
  const TokenIco = async () => {
    try {
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        setIsLoading(true);
        setAccount(address);
        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();
        const owner = await contract.owner();
        const soldTokens = await contract.soldTokens();

        const ethBalance = await GET_BALANCE();

        const token = {
          tokenBal: formatEth(tokenDetails.balance.toString()),
          name: tokenDetails.name,
          symbol: tokenDetails.symbol,
          supply: formatEth(tokenDetails.supply.toString()),
          tokenPrice: formatEth(tokenDetails.tokenPrice.toString()),
          tokenAddress: tokenDetails.tokenAddress,
          maticBal: ethBalance,
          address: address.toLowerCase(),
          owner: owner.toLowerCase(),
          soldTokens: soldTokens.toNumber(),
        };
        setIsLoading(false);
        return token;
      }
    } catch (err) {
      console.log("error: ", error);
    }
  };
  const BuyToken = async (amount) => {
    try {
      const address = await CHECK_WALLET_CONNECTED();
      if (address) {
        setIsLoading(true);
        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();

        const availableToken = formatEth(tokenDetails.balance.toString());

        if (availableToken > 1) {
          const price = formatEth(tokenDetails?.tokenPrice.toString());

          const payAmount = formatEth(price.toString(), "ether");

          const tx = await contract.buyToken(Number(account), {
            value: payAmount.toString(),
            gasLimit: ethers.utils.hexlify(8000000), //safe N
          });
          await tx.wait();
          toastSuccess("Tx done Successfully");
        }
      }
    } catch (err) {
      console.log("error: ", error);
      toastError("Tx Could not be completed");
    } finally {
      setIsLoading(false);
    }
  };
  const withdrawToken = async () => {
    try {
      setIsLoading(true);
      const address = await CHECK_WALLET_CONNECTED();

      if (address) {
        setIsLoading(true);
        const contract = await TOKEN_ICO_CONTRACT();

        const tokenDetails = await contract.getTokenDetails();

        const availableToken = formatEth(tokenDetails.balance.toString());

        if (availableToken > 1) {
          const tx = await contract.withdrawAllTokens();
          await tx.wait();
          toastSuccess("Tx done Successfully");
          window.location.reload();
        }
      }
    } catch (err) {
      console.log("error: ", error);
      toastError("Tx error");
    } finally {
      setIsLoading(false);
    }
  };
  const updateToken = async (address) => {
    try {
      setIsLoading(true);
      const address = await CHECK_WALLET_CONNECTED();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();

        const tx = await contract.updateToken(address);
        await tx.wait();
      }
    } catch (err) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  const updateTokenPrice = async () => {
    try {
      setIsLoading(true);
      const address = await CHECK_WALLET_CONNECTED();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        const tx = await contract.updateSaleTokenPrice(payAmount);
        await tx.wait();
        toastSuccess("Updated token price");
        window.location.reload();
      }
    } catch (err) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const donateToken = async () => {
    try {
      setIsLoading(true);
      const address = await CHECK_WALLET_CONNECTED();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        const tx = await contract.transferToOwner(payAmount, {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        });
        await tx.wait();
        toastSuccess("Updated token price");
        window.location.reload();
      }
    } catch (err) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  const transferEther = async (transfer) => {
    try {
      setIsLoading(true);

      const { _receiver, _amount } = transfer;
      const address = await CHECK_WALLET_CONNECTED();

      if (address) {
        const contract = await TOKEN_ICO_CONTRACT();
        const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");

        const tx = await contract.transferEther(_receiver, _payAmount, {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await tx.wait();
        toastSuccess("Updated token price");
        window.location.reload();
      }
    } catch (err) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  const transferToken = async () => {
    try {
      setIsLoading(true);

      const { _tokenAddress, _sendTo, _amount } = transfer;
      const address = await CHECK_WALLET_CONNECTED();

      if (address) {
        const contract = await ERC20_CONTRACT(_tokenAddress);
        const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");

        const tx = await contract.transfer(_sendTo, payAmount, {
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await tx.wait();
        toastSuccess("Transfered token");
        window.location.reload();
      }
    } catch (err) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TOKEN_ICO_context.Provider
        value={{
            TokenIco,
            BuyToken,
            withdrawToken,
            transferToken,
            transferEther,
            donateToken,
            updateTokenPrice,
            updateToken,

            balance,
            setBalance,
            account,
            setAccount,
            isLoading,
            setIsLoading,
        }}
    >
        {children}
    </TOKEN_ICO_context.Provider>
  )
};
