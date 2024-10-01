import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"


function Menus() {

  // ------------------  STATES  ---------------------
  const [menus, setMenus] = useState(null)
  // -------------------------------------------------


  // ------------  PETICIONES A LA API  --------------

  const getData = async ()=>{
    const response = await axios.get(`http://localhost:5005/menus?_embed=dishes`)
    setMenus(response.data)
  }

  useEffect(()=>{
    getData()
    return ()=>{}
  }, [])

  // -------------------------------------------------



  if (menus === null){
    return (<h1>...loading</h1>)
  }

  return (
    <div className="menus-container-sup">
      <h1>Menús del Restaurante:</h1>
      {menus.map((menu)=>{
        if(menu.id !== 0){
        return(
          <div  key={menu.id} className="menus-container" >
          <Link to={`/menus/menu-detail/${menu.id}`} key={menu.id} style={{display:"flex", width:"100%", margin:"20px 0px", justifyContent:"center",  gap:"20px" }}>
           <div className="menu-container">

           <p>{menu.nombre}</p>
            <p>{menu.precio}</p>
           </div>
           
          </Link>
          </div>
        )
      }
      })}
      <Link to={'/add-menu'}>
        <button>Crear un nuevo Menú</button>
      </Link>
    </div>
  )
}

export default Menus