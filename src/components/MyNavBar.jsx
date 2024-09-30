import menuHamb from "../assets/menu_hamburguesa.png"
import logoTeja from "../assets/logo_mennu_teja.png"
// import logoAmarillo from "../assets/logo_mennu_amarillo.png"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { Navbar, Nav, Container } from 'react-bootstrap';

function MyNavBar() {
  const location = useLocation()



  return (

   
    <Navbar expand="l" bg="light" variant="light" collapseOnSelect>
      
        <Link to="/">
          <Navbar.Brand>
            <img src={logoTeja} alt="logo" />
          </Navbar.Brand>
        </Link>

        {/* Botón de menú hamburguesa */}
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <img src={menuHamb} alt="menu hamburguesa" />
        </Navbar.Toggle>

        {/* Contenido colapsable */}
        <Navbar.Collapse id="basic-navbar-nav">
          
           {/*  <Link
            to="/">Home</Link>
            <Link
            to="/dishes">Carta</Link>
            <Link
            to="/menus">Menus</Link>
             */}

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
              to="/menus" 
              active={location.pathname === '/menus'}
            >
              Menus
            </Nav.Link>
          </Nav>
         
        </Navbar.Collapse>

    </Navbar>
  )
}

export default MyNavBar