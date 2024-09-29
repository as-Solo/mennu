import { Link } from "react-router-dom"


function DishCard(props) {

  const {dish} = props
  return (
    <Link to={`/dishes/dish-detail/${dish.id}`}>
      <div className="ficha" style={{position:"relative", width:"120px"}}>
        <img src={dish.image} alt="" style={{height:"70px", width:"120px", objectFit:"cover"}}/>
        <p style={{position:"absolute", bottom:"2px", left:"2px", backgroundColor:"rgb(231, 164, 69)"}}> {dish.nombre}</p>
        {/* <p> {dish.descripcion}</p>
        <p> {dish.isGlutenFree}</p>
        <p> {dish.isVegan}</p>
        <p> {dish.categoria}</p>
        <p> {dish.categoriaMenu}</p>
        <p> {dish.precio}</p>
        <p> {dish.rating}</p>
        <p> {dish.menuId}</p> */}
      </div>
    </Link>
  )
}

export default DishCard