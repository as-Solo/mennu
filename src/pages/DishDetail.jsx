import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
// import "../styles/prueba.css"


function DishDetail(props) {

  const redirect = useNavigate()
  const [dish, setDish] = useState(null)
  const {getData} = props
  const {dishId} = useParams()
  
  const getDish = async()=>{
    const response = await axios.get(`http://localhost:5000/dishes/${dishId}`)
    console.log(response.data)
    setDish(response.data)
  }

  useEffect(()=>{
    getDish()
    return ()=>{}
  }, [])

  if (dish === null){
    return (<h1>...loading</h1>)
  }
  return (
    <div style={{margin:'200px'}}>
      <div style={{width:'500px', height:'350px'}}>
        <img src={dish.image} alt="" style={{width:'100%', height:'100%', objectFit:"cover"}}/>
      </div>
      <p>{dish.categoria}</p>
      <p>{dish.nombre}</p>
      <p>{dish.descripcion}</p>
      <p>{dish.precio}€</p>
      <p>Vegan{dish.isVegan? '✔️': '❌'}</p>
      <p>Gluten Free{dish.isGlutenFree? '✔️': '❌'}</p>
      <p>{dish.rating}⭐</p>
      <button onClick={()=>redirect('/')}>VOLVER</button>
    </div>
  )
}

export default DishDetail