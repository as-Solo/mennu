import { Link } from 'react-router-dom'
import '../styles/DishCardItem.css'
import starsEmpty from "../assets/stars_empty.png"
import starsFill from "../assets/stars_fill.png"
import vegan from "../assets/Vegan.png"
import noVegan from "../assets/NoVegan.png"
import glutenFree from "../assets/GlutenFree.png"
import noGlutenFree from "../assets/NoGlutenFree.png"

function DishCardItem(props) {
    const {dish} = props
    return (
      <Link to={`/dishes/dish-detail/${dish.id}`}>
        <div className="ficha-item">
          <div className='item-movil-content'>
            <div className='item-image-container'>
                <img className="item-img" src={dish.image} alt={`foto-${dish.nombre}`}/>
            </div>
            <div className='item-datos-container'>
              <div className='item-cabecera'>
                <p className='item-categoria'> {dish.categoria[0].toUpperCase()}{dish.categoria.slice(1)}</p>
                <div className='item-stars-container'>
                  <div className='item-star star-empty'>
                    <img src={starsEmpty} alt="" />
                  </div>
                  <div className='item-star star-fill' style={{maskImage:`linear-gradient(to right, black ${dish.rating*20}%, transparent ${dish.rating*20}%)`}}>
                    <img src={starsFill} alt="" />
                  </div>
                </div>
              </div>
              <p className='item-nombre'> {dish.nombre}</p>
              <hr className='separador'/>
              <p className="item-descripcion-web"> {dish.descripcion}</p>
              <div className='item-iconos'>
                <p style={dish.isGlutenFree?{color:"rgb(231, 164, 69)"}:{color:"rgb(210, 210, 210)"}}>{dish.isGlutenFree?"Sin Gluten":"Con Gluten"}</p> {/*🌽*/}
                <p style={dish.isVegan?{color:"rgb(125, 140, 42)"}:{color:"rgb(210, 210, 210)"}}>{dish.isVegan?"Vegano":"No Vegano"}</p> {/*🍃*/}
              </div>
              <p className='item-precio'>{dish.precio}<span>€</span> </p>
            </div>
          </div>
          <div className='descripcion-container'>
            <hr className='separador sep-2'/>
            <p> {dish.descripcion}</p>
          </div>
        </div>
      </Link>
    )
}

export default DishCardItem