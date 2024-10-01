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

  console.log(menus)

  if (menus === null){
    return (<h1>...loading</h1>)
  }

  return (
    <div>
      {menus.map((menu)=>{
        if(menu.id !== 0){
        return(
          <Link to={`/menus/menu-detail/${menu.id}`} key={menu.id} style={{display:"flex", width:"100%", margin:"20px 0px", justifyContent:"center",  gap:"20px", backgroundColor:"rgb(125,140,42"}}>
            <p>{menu.nombre}</p>
            <p>{menu.precio}</p>
          </Link>
        )
      }
      })}
      <Link to={'/add-menu'}>
        <button>CREATE</button>
      </Link>
    </div>
  )
}

export default Menus