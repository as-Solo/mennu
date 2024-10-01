import { useEffect, useState } from "react"
import DishCardItem from "../components/DishCardItem"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../styles/prueba.css"
import DishFilters from "../components/DishFilters"


function Dishes() {
  const redirect = useNavigate()
  const [data, setData] = useState(null)
  const[query, setQuery] = useState('http://localhost:5005/dishes')
  const [filters, setFilters] = useState({nombre:'', descripcion:'', categoria:'', categoriaMenu:'', isGlutenFree:null, isVegan:null, precio:0, rating:0})
  const [variantes, setVariantes] = useState({precioVar:'', ratingVar:''})
  const [ascendant, setAscendant] = useState(true)
  const [orderBy, setOrderBy] = useState('nombre')
  const [isTyping, setIsTyping] = useState(null)

  const createQuery = ()=>{
    let queryStr = 'http://localhost:5005/dishes?';
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

  const paraDishFilter = {handleInputsText, handleInputs, handleInputsVariantes, handleInputsOrder, handleInputsAscDesc, orderBy, ascendant, filters}


  if (data === null){
    return <h1>...loading</h1>
  }
  
  return (
    <div style={{display:"flex", flexDirection:"column", gap:"10px", width:"100%", alignItems:"center"}}>
      <DishFilters {...paraDishFilter}/>
      <div style={{display:"flex", flexDirection:"column", gap:"15px", width:"100%", padding:"0 30px", maxWidth:"1200px", margin:"auto"}}>
        {data.map(dish=>{
          return(
            <DishCardItem key={dish.id} dish={dish}/>
          )
        })}
      </div>
      <button onClick={()=>redirect('/add-dish')} style={{alignSelf:"center"}}>ADD DISH</button>
    </div>
  )
}

export default Dishes