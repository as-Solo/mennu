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

export default DishCard