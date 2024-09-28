import menuHamb from "../assets/menu_hamburguesa.png"
import logoTeja from "../assets/logo_mennu_teja.png"
import logoAmarillo from "../assets/logo_mennu_amarillo.png"
import "../styles/prueba.css"

function Navbar() {
  return (
    <div className="Navbar">
      {/* <img src={logoAmarillo} alt="" /> */}
      <img src={logoTeja} alt="" />
      <img src={menuHamb} alt="" />
    </div>
  )
}

export default Navbar