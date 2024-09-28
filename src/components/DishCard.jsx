

function DishCard(props) {

  const {dish} = props
  return (
    <div>
      <div className="ficha" style={{position:"relative", width:"120px"}}>
      <img src={dish.image} alt="" style={{height:"50px", width:"120px", backgroundColor:'greenyellow', objectFit:"cover"}}/>
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
    </div>
  )
}

export default DishCard