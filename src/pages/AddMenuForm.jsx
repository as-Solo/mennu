import axios from "axios"
import { useEffect, useState } from "react"
import "../styles/AddMenuForm.css"
// import logoAmarillo from "../assets/logo_mennu_amarillo.png"
import { useNavigate } from "react-router-dom"


function AddMenuForm() {

  const redirect = useNavigate()
  // ------------------------  STATES  --------------------------
  const [newMenu, setNewMenu] = useState({nombre:'', precio:''})
  const [primerosInclude, setPrimerosInclude] = useState([])
  const [segundosInclude, setSegundosInclude] = useState([])
  const [postresInclude, setPostresInclude] = useState([])
  const [primeros, setPrimeros] = useState([])
  const [segundos, setSegundos] = useState([])
  const [postres, setPostres] = useState([])
  const [showMessage, setShowMessage] = useState(false)

  // ------------------------------------------------------------

  // ------------------  PETICIONES A LA API  -------------------
  const getPrimeros = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/dishes?categoriaMenu=primeros&menuId=0`)
    setPrimeros(response.data)
  }
  const getSegundos = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/dishes?categoriaMenu=segundos&menuId=0`)
    setSegundos(response.data)
  }
  const getPostres = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/dishes?categoriaMenu=postres&menuId=0`)
    setPostres(response.data)
  }
  // ------------------------------------------------------------

  // -----------------------  EFFECTS  --------------------------
  useEffect(()=>{
    // getPrimerosInclude()
    getPrimeros()
    getSegundos()
    getPostres()
    return ()=>{}
  }, [])

  // ------------------------------------------------------------

  // -----------------------  HANDLES  --------------------------
  const addDishToMenuPrimeros = (e)=>{
    const plato = primeros.find((plato)=>plato.id == e.target.value)
    setPrimerosInclude(current => {
      return [...current, plato]
    })
  }

  const removeIncludePrimeros = async (e)=>{
    let clone = structuredClone(primerosInclude)
    clone = clone.filter(plato =>plato.id != e.target.name)
    setPrimerosInclude(clone)
  }

  const addDishToMenuSegundos = (e)=>{
    const plato = segundos.find((plato)=>plato.id == e.target.value)
    setSegundosInclude(current => {
      return [...current, plato]
    })
  }

  const removeIncludeSegundos = (e)=>{
    let clone = structuredClone(segundosInclude)
    clone = clone.filter(plato =>plato.id != e.target.name)
    setSegundosInclude(clone)
  }

  const addDishToMenuPostres = (e)=>{
    const plato = postres.find((plato)=>plato.id == e.target.value)
    setPostresInclude(current => {
      return [...current, plato]
    })
  }

  const removeIncludePostres = (e)=>{
    let clone = structuredClone(postresInclude)
    clone = clone.filter(plato =>plato.id != e.target.name)
    setPostresInclude(clone)
  }

  const handleData = (e)=>{
    const clone = structuredClone(newMenu)
    clone[e.target.name] = e.target.value
    setNewMenu(clone)
  }

  const handleAddMenu = async ()=>{
    if (newMenu.nombre && newMenu.precio){
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/menus`, newMenu)
      let id = response.data.id
      for (let elem of primerosInclude){
        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/dishes/${elem.id}`, {menuId:id})
        console.log(elem)
      }
      for (let elem of segundosInclude){
        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/dishes/${elem.id}`, {menuId:id})
        console.log(elem)
      }
      for (let elem of postresInclude){
        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/dishes/${elem.id}`, {menuId:id})
        console.log(elem)
      }
      redirect("/menus")
    }
    else{
      console.log("mensajito de por que algo no ha salido")
      setShowMessage(true)
      setTimeout(()=>setShowMessage(false), 2500)
    }
  }
  // ------------------------------------------------------------
  const labelStyle = {
    fontSize:".7rem",
    left:"20px",
    top: "-4px",
    backgroundColor: "rgb(255, 255, 255)",
    padding: "0 10px 0 4px"
    }

  return (
    <div className="centradito">
    <div className="menu-form-container" style={{}}>
      <div className="menu-cabecera-nombre-precio">
        <div className="menu-input-text-container">
          <label className=" label-flotante " htmlFor="nombre"style={newMenu.nombre?labelStyle:{}} >Nombre</label>
          <input onChange={(e)=>handleData(e)} className="menu-input-text" type="text" name="nombre" value={newMenu.nombre}/>
        </div>

        <div className="menu-input-text-container menu-input-precio-container">
          <label className=" label-flotante " htmlFor="precio" style={newMenu.precio?labelStyle:{}}>Precio</label>
          <input onChange={(e)=>handleData(e)} className="menu-input-text menu-input-precio" type="number" name="precio" min={0} value={newMenu.precio}/>
        </div>
        <div className="fade-up"></div>
      </div>

      <div className="ventana-platos">
        <div className="menu-categoria-container">
          <label className="menu-categoria-text" htmlFor="primeros">Primeros</label>
          <select className="menu-selector-platos" onChange={(e)=>addDishToMenuPrimeros(e)} name="primeros" id="primeros">
            <option value={-1}>-- selecciona un plato</option>
            
            { primeros
            .filter((plato)=> {
              const platosIncluidosIdsArr = primerosInclude.map((plato) => plato.id)
              return !platosIncluidosIdsArr.includes(plato.id)
            })
            .map((plato)=>{
              return(
                <option key={plato.id} value={plato.id}>{plato.nombre}</option>
              )
            })}
          </select>
          {primerosInclude.map((plato)=>{
            return (
              <div className="platos-incluidos" key={plato.id}>
                <p style={{margin:"0"}}>{plato.nombre}</p>
                <button className="add-menu-boton-delete" onClick={(e)=>removeIncludePrimeros(e)} name={plato.id} style={{ padding:"1x", lineHeight:".8rem" }}>x</button>
              </div>
            )
          })}
        </div>


        <div className="menu-categoria-container">
        <label className="menu-categoria-text" htmlFor="segundos">Segundos</label>
        <select className="menu-selector-platos" onChange={(e)=>addDishToMenuSegundos(e)} name="segundos" id="segundos">
          <option value={-1}>-- selecciona un plato</option>
        
          { segundos
          .filter((plato)=> {
            const platosIncluidosIdsArr = segundosInclude.map((plato) => plato.id)
            return !platosIncluidosIdsArr.includes(plato.id)
          })
          .map((plato)=>{
            return(
              <option key={plato.id} value={plato.id}>{plato.nombre}</option>
            )
          })}
        </select>
        {segundosInclude.map((plato)=>{
          return (
            <div className="platos-incluidos" key={plato.id}>
              <p style={{margin:"0"}}>{plato.nombre}</p>
              <button className="add-menu-boton-delete" onClick={(e)=>removeIncludeSegundos(e)} name={plato.id} style={{ padding:"1x", lineHeight:".8rem" }}>x</button>
            </div>
          )
        })}
        </div>

        <div className="menu-categoria-container ultima-categoria">
          <label className="menu-categoria-text" htmlFor="postres">Postres</label>
          <select className="menu-selector-platos" onChange={(e)=>addDishToMenuPostres(e)} name="postres" id="postres">
            <option value={-1}>-- selecciona un plato</option>
            
            { postres
            .filter((plato)=> {
              const platosIncluidosIdsArr = postresInclude.map((plato) => plato.id)
              return !platosIncluidosIdsArr.includes(plato.id)
            })
            .map((plato)=>{
              return(
                <option key={plato.id} value={plato.id}>{plato.nombre}</option>
              )
            })}
          </select>
          {postresInclude.map((plato)=>{
            return (
              <div className="platos-incluidos" key={plato.id}>
                <p style={{margin:"0"}}>{plato.nombre}</p>
                <button className="add-menu-boton-delete" onClick={(e)=>removeIncludePostres(e)} name={plato.id} style={{ padding:"1x", lineHeight:".8rem" }}>x</button>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="tope-inferior">
        <button onClick={()=>redirect("/menus")} className="boton-volver">⤺</button>
        <button disabled={showMessage} onClick={handleAddMenu} className="boton-add-menu">Añadir</button>
      </div>
      <div className="mensajes-creacion" style={showMessage?{opacity:"1"}:{}}>
        <div className="pastilla-mensaje">
          <p>No se ha creado el plato.</p>
          <p>Recuerda añadir los campos requeridos correctamente</p>
        </div></div>
    </div>
    </div>
  )
}

export default AddMenuForm