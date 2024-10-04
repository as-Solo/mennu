import menuHamb from "../assets/menu_hamburguesa.png"
import logoTeja from "../assets/logo_mennu_teja.png"
// import logoAmarillo from "../assets/logo_mennu_amarillo.png"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useState } from "react";

function MyNavBar() {
  const location = useLocation()

  const [isToggled, setIsToggled] = useState(false);

  const toggleMenu = () => {
    setIsToggled(!isToggled);
  };



  return (

   
    <Navbar expand="l" bg="light"  collapseOnSelect>
        <div className="nav-sup">
        <Link to="/">
          <Navbar.Brand>
            <img src={logoTeja} alt="logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle 
        aria-controls="basic-navbar-nav"
        onClick={toggleMenu}
        >
          <div className={`hamburger-menu ${isToggled ? "change" : ""}`}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </Navbar.Toggle>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex" variant="tabs" defaultActiveKey="/">
            <Nav.Link 
              as={Link} 
              to="/"  
              active={location.pathname === '/'}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/dishes" 
              active={location.pathname === '/dishes'}

            >
              Carta
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/add-dish" 
              active={location.pathname === '/add-dish'}
              className="add-dish-link"
            >
              
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/menus" 
              active={location.pathname === '/menus'}
            >
              Menus
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/add-menu" 
              active={location.pathname === '/add-menu'}
              className="add-menu-link"
            >
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavBar