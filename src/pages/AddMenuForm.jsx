import axios from "axios"
import { useEffect, useState } from "react"


function AddMenuForm() {

  // ------------------------  STATES  --------------------------
  const [primerosInclude, setPrimerosInclude] = useState([])
  const [segundosInclude, setSegundosInclude] = useState([])
  const [postresInclude, setPostresInclude] = useState([])
  const [primeros, setPrimeros] = useState([])
  const [segundos, setSegundos] = useState([])
  const [postres, setPostres] = useState([])
  const [primerosTriger, setPrimerosTriger] = useState(false)
  const [segundosTriger, setSegundosTriger] = useState(false)
  const [postresTriger, setPostresTriger] = useState(false)
  // ------------------------------------------------------------

  // ------------------  PETICIONES A LA API  -------------------
  const getPrimeros = async ()=>{
    const response = await axios.get(`http://localhost:5000/dishes?categoriaMenu=primeros&menuId=0`)
    setPrimeros(response.data)
  }
  const getSegundos = async ()=>{
    const response = await axios.get(`http://localhost:5000/dishes?categoriaMenu=segundos&menuId=0`)
    setSegundos(response.data)
  }
  const getPostres = async ()=>{
    const response = await axios.get(`http://localhost:5000/dishes?categoriaMenu=postres&menuId=0`)
    setPostres(response.data)
  }

  const getPrimerosInclude = async ()=>{
    const response = await axios.get(`http://localhost:5000/dishes?categoriaMenu=primeros&menuId=-1`)
    setPrimerosInclude(response.data)
  }
  const getSegundosInclude = async ()=>{
    const response = await axios.get(`http://localhost:5000/dishes?categoriaMenu=segundos&menuId=-1`)
    setSegundosInclude(response.data)
  }
  const getPostresInclude = async ()=>{
    const response = await axios.get(`http://localhost:5000/dishes?categoriaMenu=postres&menuId=-1`)
    setPostresInclude(response.data)
  }

  useEffect(()=>{
    getPrimeros()
    getPrimerosInclude()
    return ()=>{}
  }, [])

  useEffect(()=>{
    getSegundos()
    getSegundosInclude()
    return ()=>{}
  }, [])

  useEffect(()=>{
    getPostres()
    getPostresInclude()
    return ()=>{}
  }, [])
  // ------------------------------------------------------------

// console.log(primerosInclude, segundosInclude, postresInclude)
// console.log(primeros, segundos, postres)

  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"10px", marginTop:"50px"}}>
      <label htmlFor="nombre">Nombre</label>
      <input type="text" name="nombre"/>
  <hr />
      <label htmlFor="precio">Precio</label>
      <input type="number" name="precio"/>
  <hr />
      <label htmlFor="primeros">Primeros</label>
      {/* {primerosInclude.map((plato)=>{
        return (
          <>
          <p>{plato.nombre}</p>
          <button name={plato.id}>eliminar</button>
          </>
        )
      })} */}
      <select name="primeros" id="primeros">
        {primeros.map((plato)=>{
          return(
            <option key={plato.id} value={plato.id}>{plato.nombre}</option>
          )
        })}
      </select>
  <hr />
      <label htmlFor="segundos">Segundos</label>
      {/* aqui la lista de todos lo que ya estan con su botoncito de quitar*/}
      <select name="segundos" id="segundos">
        {segundos.map((plato)=>{
          return(
            <option key={plato.id} value={plato.id}>{plato.nombre}</option>
          )
        })}
      </select>
  <hr />
      <label htmlFor="terceros">Postres</label>
      {/* aqui la lista de todos lo que ya estan con su botoncito de quitar*/}
      <select name="postres" id="postres">
        {postres.map((plato)=>{
          return(
            <option key={plato.id} value={plato.id}>{plato.nombre}</option>
          )
        })}
      </select>
    </div>
  )
}

export default AddMenuForm