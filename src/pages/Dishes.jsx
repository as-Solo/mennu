import { useEffect, useState } from "react"
import DishCardItem from "../components/DishCardItem"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import "../styles/prueba.css"
import "../styles/Dishes.css"
import DishFilters from "../components/DishFilters"
import DishSkeletonCard from "../components/DishSkeletonCard"

function Dishes() {
  const redirect = useNavigate()
  const [data, setData] = useState(null)
  // import.meta.env.VITE_SERVER_URL
  const[query, setQuery] = useState(`${import.meta.env.VITE_SERVER_URL}/dishes`)
  const [filters, setFilters] = useState({nombre:'', descripcion:'', categoria:'', categoriaMenu:'', isGlutenFree:null, isVegan:null, precio:0, rating:0})
  const [variantes, setVariantes] = useState({precioVar:'', ratingVar:''})
  const [ascendant, setAscendant] = useState(true)
  const [orderBy, setOrderBy] = useState('')
  const [isTyping, setIsTyping] = useState(null)

  const createQuery = ()=>{
    let queryStr = `${import.meta.env.VITE_SERVER_URL}/dishes?`;
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

    setAscendant(e.target.checked)
  }

  const handleInputsOrder = (e)=>{
    e.preventDefault()

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

  useEffect(()=>{
    return ()=>{}
  }, [])
  const paraDishFilter = {handleInputsText, handleInputs, handleInputsVariantes, handleInputsOrder, handleInputsAscDesc, orderBy, ascendant, filters}
  
  return (
    <div className="dishes-container">
      <DishFilters {...paraDishFilter}/>
      {data===null
      ? <>
      {/* <div className="tope-superior"></div> */}
      <DishSkeletonCard/>
      </>
      :<div className="centradito">
        <div className="dishes-fichas-container">
          {data.map(dish=>{
            return(
              <DishCardItem key={dish.id} dish={dish}/>
            )
          })}
          <div className="last-man-stand" ></div>
        </div>
        <button className="dishes-add-dish" onClick={()=>redirect('/add-dish')}>Crear plato</button>
        <div className="dishes-pastilla-footer"></div>
      </div>}
    </div>
  )
}

export default Dishes