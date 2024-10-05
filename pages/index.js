import React, { useState, useEffect, useContext } from "react";
import {
  About,
  Brand,
  Contact,
  Donate,
  FAQ,
  Features,
  Footer,
  Header,
  Hero,
  Loader,
  Owner,
  Popup,
  Progress,
  Roadmap,
  Sidebar,
  Team,
  Token,
  TokenInfo,
  TransferCurrency,
  TransferToken,
  UpdateAddress,
  UpdatePrice
} from "../Components"
import { TOKEN_ICO_context } from "../context";
import { shortAddress, } from "../Utils";

const index = () => {

  const {
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
    setIsLoading
  } = useContext(TOKEN_ICO_context)

  const [ownerModal, setOwnerModal] = useState(false)
  const [buyModal, setBuyModal] = useState(false)
  const [transferModal, settransfer] = useState(false)
  const [isOpenDonate, setIsOpenDonate] = useState(false)
  const [isOpenUpdatePrice, setIsOpenUpdatePrice] = useState(false)
  const [isOpenUpdateAddress, setisOpenUpdateAddress] = useState(false)
  const [tokenDetails, setTokenDetails] = useState(false)


  const fetchTokenIcoData = async () => {
    const tokenData = await TokenIco();
    console.log("viendo", tokenData )//DEBUGGINH
    setTokenDetails(tokenData)
  }

  useEffect(() => {
    // fetchTokenIcoData()
  }, [account])

  return (
    <div>
      Token ICO practice
      <button onClick={fetchTokenIcoData}>correr fertchTokenDetails</button>
    </div>
  )
};

export default index;
