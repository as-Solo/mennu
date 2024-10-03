import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import MenuFilter from "../components/MenuFilter"


function Menus() {

  // ------------------  STATES  ---------------------
  const [menus, setMenus] = useState(null)
  const [isTyping, setIsTyping] = useState(null)

  // -------------------------------------------------
  const redirect = useNavigate()

  // ------------  PETICIONES A LA API  --------------

  const [filters, setFilters] = useState({nombre:''})


  const getData = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/menus?_embed=dishes`)
    setMenus(response.data)
  }
  const handleInputsText = (e)=>{
    e.preventDefault()
    if (isTyping){
      clearTimeout(isTyping)
    }
    setIsTyping( setTimeout(()=>{
      let clone = structuredClone(filters)
      clone[e.target.name] = e.target.value
      setFilters(clone)
    }, 800) )
  }

  useEffect(()=>{
    getData()
    return ()=>{}
  }, [])

  // -------------------------------------------------


  const paraMenuFilter = {handleInputsText, filters}

  if (menus === null){
    return (<h1>...loading</h1>)
  }

  return (
    <div className="dishes-container" >
      <div className="filter" id="menus-search-container">
      <MenuFilter {...paraMenuFilter}/>

       
      </div>
       <div className="centradito">
       <div className="dishes-fichas-container" id="menus-disp">

      {menus
       .filter((menu) => 
        menu.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) 
      )
      .map((menu)=>{
        if(menu.id !== 0){
        return(
          <>
          <Link to={`/menus/menu-detail/${menu.id}`} key={menu.id} style={{display:"flex", width:"100%", margin:"20px 0px", justifyContent:"center",  gap:"20px" }}>
           <div className="menu-container">
            <h2> {menu.nombre.toUpperCase()}</h2>
            <p>Precio: {menu.precio}€</p>
           </div>
           
          </Link>
            
          </>

        )
      }
      })}<div className="last-man-stand">

      </div>

</div>
        <button className="dishes-add-dish" onClick={()=>redirect('/add-menu')}>Crear menú</button>
        <div className="dishes-pastilla-footer"></div>
      </div>
    </div>
/*       <Link to={'/add-menu'}> 
      <div className="crear-menu">
      <button className="dishes-add-dish">Crear un nuevo Menú</button>
      </div>
      </Link>
      </div>
      </div>
      </div> */
  )
  
}

export default Menus