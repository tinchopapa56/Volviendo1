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
    setIsLoading,

    CHECK_ACCOUNT_BALANCE,
    addTokenToMetamask,
    ERC20,
    CONNECT_WALLET,
    TOKEN_ADDRESS
  } = useContext(TOKEN_ICO_context)

  const [ownerModal, setOwnerModal] = useState(false)
  const [buyModal, setBuyModal] = useState(false)
  const [transferModal, setTransferModal] = useState(false)
  const [isOpenDonate, setIsOpenDonate] = useState(false)
  const [isOpenUpdatePrice, setIsOpenUpdatePrice] = useState(false)
  const [isOpenUpdateAddress, setIsOpenUpdateAddress] = useState(false)
  const [tokenDetails, setTokenDetails] = useState(false)
  const [currency, setCurrency] = useState(false)
  const [transferCurrency, setTransferCurrency] = useState(false)




  useEffect(() => {
    const fetchTokenIcoData = async () => {
      const tokenData = await TokenIco();
      // console.log("viendo", tokenData )//DEBUGGING
      setTokenDetails(tokenData)
    }
    fetchTokenIcoData()
  }, [account])

  return (
    <div className="body_wrap">
      Token ICO practice
      {ownerModal && 
        <Owner close={setOwnerModal(false)} 
          currency={currency}
          tokenDetails={tokenDetails}
          account={account}
          setTransferModal={setTransferModal}
          setCurrency={setCurrency}
          setIsOpenDonate={setIsOpenDonate}
          setIsOpenUpdatePrice={setIsOpenUpdatePrice}
          setisOpenUpdateAddress={setisOpenUpdateAddress}
        />
      }
      {buyModal && 
        <Popup 
          setBuyModal={setBuyModal} 
          BuyToken={BuyToken} 
          currency={currency} 
          tokenDetails={tokenDetails} 
          account={account} 
          ERC20={ERC20}
          TOKEN_ADDRESS={TOKEN_ADDRESS}
          setIsLoading={setIsLoading}
        />
      }
      {transferModal && 
        <TransferToken 
          setTransferModal={setTransferModal} 
          TransferToken={TransferToken} 
          ERC20={ERC20}
          setIsLoading={setIsLoading}
        />
      }
      {transferCurrency && 
        <TransferCurrency 
          setTransferCurrency={setTransferCurrency} 
          transferEther={transferEther} 
          tokenDetails={tokenDetails}
          currency={currency}
          checkAccountBalance={CHECK_ACCOUNT_BALANCE}
          setIsLoading={setIsLoading}
        />
      }
      {isOpenDonate && 
        <Donate 
          tokenDetails={tokenDetails}
          currency={currency}
          close={setIsOpenDonate(false)}
          Donate={Donate}
        />
      }
      {isOpenUpdatePrice && 
        <UpdatePrice
          tokenDetails={tokenDetails}
          currency={currency}
          close={setIsOpenUpdatePrice(false)}
          updateTokenPrice={updateTokenPrice}
        />
      }
      {isOpenUpdateAddress && 
        <UpdateAddress
          tokenDetails={tokenDetails}
          currency={currency}
          close={setIsOpenUpdateAddress(false)}
          updateToken={updateToken}
          ERC20={ERC20}
        />
      }
      {isLoading && <Loader />}

      <Header 
        account={account}
        connectWallet = {CONNECT_WALLET}
        setAccount={setAccount}
        setIsLoading={setIsLoading}
        setOwnerModal={setOwnerModal}
        shortAddress={shortAddress}
        tokenDetails={tokenDetails}
        currency={currency}
        ownerModal={ownerModal}
      />
      <Sidebar />
      <Hero 
        setBuyModal={setBuyModal}
        account={account}
        connectWallet = {CONNECT_WALLET}
        setAccount={setAccount}
        setIsLoading={setIsLoading}
        tokenDetails={tokenDetails}
        addTokenToMetamask={addTokenToMetamask}
      />
      <About />
      <Features />
      <Token />
      <TokenInfo />
      <Team /> 
      <FAQ />
      <Contact /> 
      <Footer />
    </div>
  )
};

export default index;
