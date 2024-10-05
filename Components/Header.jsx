import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

const Header = ({
  account,
  connectWallet,
  setAccount,
  setIsLoading,
  setOwnerModal,
  shortAddress,
  tokenDetails,
  currency,
  ownerModal,
}) => {

  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false)

  useEffect(() => {
    const metamaskInstalled = window.ethereum
    if (metamaskInstalled) {
      setIsMetamaskInstalled(true)

      window.ethereum.on("accountsChanged", handleAccountsChanged)
    }

    return () => {
      if (window.ethereum)
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
    }
  }, [])

  const handleAccountsChanged = accounts => {
    setAccount(accounts[0])
  }

  const connectMetamask = async () => {
    if (typeof window.ethereum !== undefined) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setAccount(accounts[0])
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("install metamask")
    }
  }

  const headerClass = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 1em"
  };

  return (
    <header className="site-header header--transparent ico-header">
      <div className="header__main-wrap">
        <div className="header__main-wrap">
          <div
            className="header__main-wrap ul_li_bewtween"
            style={headerClass}
          >
            <div className="header__left ul_li">
              <div className="header__logo">
                <a href="/">
                  <img src="assets/img/logo/logo.svg" alt="" srcSet="" />
                </a>
              </div>
            </div>
            <div className="main-menu--wrap ul_li navbar navbar-expand-xl" >
              <nav className="main-menu collapse navbar-collapse" >
                <ul>
                  <li className="active has-mega-menu">
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#about">About</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#roadmap">Roadmap</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#team">Team</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#FAQ">FAQ</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#contact">Contact</a>
                  </li>
                  <li>
                    <a
                      onClick={() => ownerModal ? setOwnerModal(false) : setOwnerModal(true)}
                      style={{ cursor: "pointer" }}
                    >
                      Tools
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header__action ul_li">
              <div className="d-xl-none">
                <a className="header_bar_hamburger_menu"></a>
                <div className="header__bar-icon">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

              </div>
              <div className="header__account">
                <Button
                  variant="contained"
                  onClick={() => account ? navigator.clipboard.writeText(tokenDetails?.address) : connectMetamask()}
                >
                  {account
                    ? `${shortAddress(tokenDetails?.address) ?? ""} ${tokenDetails?.maticBal?.slice(0, 6)} ${currency}`
                    : "Connect"}
                </Button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </header>

  )

};
export default Header;
