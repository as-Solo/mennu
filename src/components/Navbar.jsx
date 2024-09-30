import menuHamb from "../assets/menu_hamburguesa.png"
import logoTeja from "../assets/logo_mennu_teja.png"
// import logoAmarillo from "../assets/logo_mennu_amarillo.png"
import "../styles/prueba.css"
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const redirect = useNavigate()
  return (
    <div className="navbar-container">
      <div className="Navbar">
        {/* <img src={logoAmarillo} alt="" /> */}
        <Link
        to={"/"}>
        <img src={logoTeja} alt="" />

        </Link>
        <img src={menuHamb} alt="" />
      </div>
      <div className="navbar-botonera">
        <button onClick={()=>redirect('/')}>Home</button>
        <button onClick={()=>redirect('/dishes')}>Carta</button>
        <button onClick={()=>redirect('/menus')}>Menus</button>
      </div>
    </div>
  )
}

export default Navbar