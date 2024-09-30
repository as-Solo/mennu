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
              <div className='item-iconos'>
                {/* <img className={"item-icono-img"} src={dish.isGlutenFree?glutenFree:noGlutenFree} alt="" />
                <img className={"item-icono-img"} src={dish.isVegan?vegan:noVegan} alt="" /> */}
                <p>🌽{dish.isGlutenFree}</p>
                <p>🍃{dish.isVegan}</p>
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