import "./headerNavigation.scss";

import React, {useEffect, useState} from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import Logo from "../../assets/imgs/logo.png";
import {Link} from "react-router-dom";
import {IoMdWallet} from "react-icons/io";
import {headerMenu} from "../../configs";
import ButtonComponent from "../buttonComponent";
import {useLocation} from "react-router";

const HeaderNavigation = ({
                            web3Handler,
                            account
                          }) => {
  const {pathname} = useLocation();
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);
  return (
    <Navbar collapseOnSelect expand="lg" className={`header-container ${offset !== 0 && "header-container__fixed"}`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="header-logo">
          <img src={Logo} alt=""/>
        </Navbar.Brand>
        <div className="d-flex justify-content-center align-items-center">
          <div className="header-connect__button-container">
            {
              account ? (
                <Nav.Link
                  href={`https://etherscan.io/address/${account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button nav-button btn-sm">
                  <ButtonComponent btnIcon={<IoMdWallet/>}
                                   btnName={account.slice(0, 5) + "..." + account.slice(38, 42)}/>
                
                </Nav.Link>
              ) : (
                <ButtonComponent btnIcon={<IoMdWallet/>} btnEvent={web3Handler}/>
              )
            }
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle-container">
            <div className="toggle-menu__button-container">
              <span/>
              <span/>
              <span/>
            </div>
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto header-left__side-container">
            {
              headerMenu.map((val, index) => (
                <Nav.Link key={index}
                          as={Link}
                          to={val.path}
                          className={`text-white header-left__side-item ${pathname === val.path && "is-active"}`}>{val.label}</Nav.Link>
              ))
            }
          </Nav>
          <Nav className="header-right__side">
            {
              account ? (
                <Nav.Link
                  href={`https://etherscan.io/address/${account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button nav-button btn-sm mx-4">
                  <ButtonComponent btnIcon={<IoMdWallet/>}
                                   btnName={account.slice(0, 5) + "..." + account.slice(38, 42)}/>
                
                </Nav.Link>
              ) : (
                <ButtonComponent btnIcon={<IoMdWallet/>} btnEvent={web3Handler}/>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavigation;