import { Link } from "react-router-dom"
import Carousel from 'react-bootstrap/Carousel';

function DishCard(props) {

  const {dish} = props
  return (

    

        <Link to={`/dishes/dish-detail/${dish.id}`} className="dish-card" state={{desde:"/"}}>
          <div className="rel-container">
            <img src={dish.image} alt={dish.nombre}/>
           
          <div className="dish-info">
            <h3>{dish.nombre}</h3>
            <p>{dish.descripcion}</p>
          </div>
          </div>
       
      </Link>



  )
}


 {/* <div className="ficha" style={{position:"relative", width:"120px"}}>
        <img src={dish.image} alt="" style={{height:"70px", width:"120px", objectFit:"cover"}}/>
        <p style={{position:"absolute", bottom:"2px", left:"2px", backgroundColor:"rgb(231, 164, 69)"}}> {dish.nombre}</p> */}
        {/* <p> {dish.descripcion}</p>
        <p> {dish.isGlutenFree}</p>
        <p> {dish.isVegan}</p>
        <p> {dish.categoria}</p>
        <p> {dish.categoriaMenu}</p>
        <p> {dish.precio}</p>
        <p> {dish.rating}</p>
        <p> {dish.menuId}</p> */}
      {/* </div> */}


export default DishCard