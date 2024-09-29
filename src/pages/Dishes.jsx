import { useEffect, useState } from "react"
import DishCard from "../components/DishCard"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../styles/prueba.css"


function Dishes() {
  const redirect = useNavigate()
  const [data, setData] = useState(null)
  const[query, setQuery] = useState('http://localhost:5000/dishes')
  const [filters, setFilters] = useState({nombre:'', descripcion:'', categoria:'', categoriaMenu:'', isGlutenFree:null, isVegan:null, precio:0, rating:0})
  const [variantes, setVariantes] = useState({precioVar:'', ratingVar:''})
  const [ascendant, setAscendant] = useState(true)
  const [orderBy, setOrderBy] = useState('nombre')
  const [isTyping, setIsTyping] = useState(null)

  const createQuery = ()=>{
    let queryStr = 'http://localhost:5000/dishes?';
    if (filters.nombre){
      queryStr += `&nombre_like=${filters.nombre}`
    }
    if (filters.descripcion){
      queryStr += `&descripcion_like=${filters.descripcion}`
    }
    if (filters.categoria){
      queryStr += `&categoria=${filters.categoria}`
    }
    if (filters.categoriaMenu){
      queryStr += `&categoriaMenu=${filters.categoriaMenu}`
    }
    if (filters.isGlutenFree){
      queryStr += `&isGlutenFree=${filters.isGlutenFree}`
    }
    if (filters.isVegan){
      queryStr += `&isVegan=${filters.isVegan}`
    }
    if (filters.precio && filters.precio !== '0' && variantes.precioVar){
      queryStr += `&precio${variantes.precioVar}${filters.precio}`
    }
    if (filters.rating && filters.rating !== '0' && variantes.ratingVar){
      queryStr += `&rating${variantes.ratingVar}${filters.rating}`
    }
    if(orderBy){
      queryStr += `&_sort=${orderBy}&_order=${ascendant?'asc':'desc'}`
    }
    // console.log(queryStr)
    setQuery(queryStr)
  }

  const handleInputs = (e)=>{
    e.preventDefault()
    let clone = structuredClone(filters)
    clone[e.target.name] = e.target.value
    setFilters(clone)
  }

  const handleInputsVariantes = (e)=>{
    e.preventDefault()
    let clone = structuredClone(variantes)
    clone[e.target.name] = e.target.value
    setVariantes(clone)
  }

  const handleInputsAscDesc = (e)=>{
    // console.log(e.target.checked)
    setAscendant(e.target.checked)
  }

  const handleInputsOrder = (e)=>{
    e.preventDefault()
    console.log(e.target.value)
    setOrderBy(e.target.value)
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

  const getData = async()=>{
    createQuery()
    const response = await axios.get(query)
    setData(response.data)
  }

  useEffect(() => {
    createQuery();
  }, [filters, variantes, orderBy, ascendant]);

  useEffect(()=>{
    getData()
    return ()=>{}
  }, [query])


  if (data === null){
    return <h1>...loading</h1>
  }
  
  return (
    <div style={{display:"flex", flexDirection:"column", gap:"40px", padding:"50px 40px"}}>
      <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}}>
        <label htmlFor="nombre">Nombre</label>
        <input onChange={(e)=>handleInputsText(e)} type="text" name="nombre"/>
        <hr />
        <label htmlFor="descripcion">Descripcion</label>
        <input onChange={(e)=>handleInputsText(e)} type="text" name="descripcion"/>
        <hr />
        <select onChange={(e)=>handleInputs(e)} name="isVegan">
          <option value={''}>Indiferente</option>
          <option value={true}>Es vegano</option>
          <option value={false}>No es vegano</option>
        </select>
        <hr />
        <select onChange={(e)=>handleInputs(e)} name="isGlutenFree">
          <option value={''}>Indiferente</option>
          <option value={true}>No lleva gluten</option>
          <option value={false}>Lleva gluten</option>
        </select>
        <hr />
        <label htmlFor="precio">Precio</label>
        <select onChange={(e)=>handleInputsVariantes(e)} name="precioVar" id="">
          <option value={''}>--Todos--</option>
          <option value="=">Igual a</option>
          <option value="_gte=">Mayor que</option>
          <option value="_lte=">Menor que</option>
        </select>
        <input onChange={(e)=>handleInputsText(e)} type="number" name="precio" min={0}/>
        <hr />
        <label htmlFor="rating">Rating</label>
        <select onChange={(e)=>handleInputsVariantes(e)} name="ratingVar" id="">
        <option value={''}>--Todos--</option>
          <option value="=">Igual a</option>
          <option value="_gte=">Mayor que</option>
          <option value="_lte=">Menor que</option>
        </select>
        <input onChange={(e)=>handleInputsText(e)} type="number" name="rating" min={0}/>
        <hr />
        <select onChange={(e)=>handleInputs(e)} name="categoria" id="">
          <option value={''}>-- Todos --</option>
          <option value="entrantes">Entrantes</option>
          <option value="carnes">Carnes</option>
          <option value="pescados">Pescados</option>
          <option value="ensaladas">Ensaladas</option>
          <option value="pizzas">Pizzas</option>
          <option value="hamburguesas">Hamburguesas</option>
          <option value="postres">Postres</option>
        </select>
        <hr />
        <select onChange={(e)=>handleInputs(e)} name="categoriaMenu" id="">
          <option value={''}>-- Todos --</option>
          <option value="primeros">Primeros</option>
          <option value="segundos">Segundos</option>
          <option value="postres">Postres</option>
        </select>
        <hr />
        <select onChange={(e)=>handleInputsOrder(e)} name="orderBy" id="" value={orderBy}>
          <option value="nombre">Nombre</option>
          <option value="descripcion">Descripcion</option>
          <option value="isVegan">Veganos</option>
          <option value="isGlutenFree">Sin gluten</option>
          <option value="categoria">Categoría</option>
          <option value="categoriaMenu">Categoría de menu</option>
          <option value="precio">Precio</option>
          <option value="rating">Puntuacion</option>
        </select>
        <input onChange={(e)=>handleInputsAscDesc(e)} type="checkbox" name="isAscendant" value={ascendant}/>
      </div>

      <div style={{color:'black', display:"flex", flexWrap:"wrap", gap:"20px"}}>
        {data.map(dish=>{
          return(
            <DishCard key={dish.id} dish={dish}/>
          )
        })}
      </div>
      <button onClick={()=>redirect('/add-dish')} style={{alignSelf:"center"}}>ADD DISH</button>
    </div>
  )
}

export default Dishes