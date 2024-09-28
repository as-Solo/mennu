
import dataPrueba from "../../data/mennu_data.json"
import DishCard from "../components/DishCard"
import DishDetail from "./DishDetail"
import fotoLanding from "../assets/foto-comida.avif"

function Home() {

  const data = dataPrueba
  console.log(data.dishes)
  const entrantes = data.dishes.filter(elem=>elem.categoria.toLowerCase()==="entrantes")
  const carnes = data.dishes.filter(elem=>elem.categoria.toLowerCase()==="carnes")
  const pescados = data.dishes.filter(elem=>elem.categoria.toLowerCase()==="pescados")
  const ensaladas = data.dishes.filter(elem=>elem.categoria.toLowerCase()==="ensaladas")
  const pizzas = data.dishes.filter(elem=>elem.categoria.toLowerCase()==="pizzas")
  const hamburguesas = data.dishes.filter(elem=>elem.categoria.toLowerCase()==="hamburguesas")
  const postres = data.dishes.filter(elem=>elem.categoria.toLowerCase()==="postres")
  
  return (

    <div>
      <div style={{backgroundColor:"black"}}>
        <img src={fotoLanding} alt="foto-comida" style={{width:"60%", objectFit:"cover", objectPosition:"left"}}/>
      </div>
      <div className="categoria-container">
        <h1>Entrantes</h1>
        <hr />
        <div className="carrusel">
          {entrantes.map(dish=>{
            return (
              <DishCard dish={dish} key={dish.id}/>
          )})}
        </div>
      </div>

      <div className="categoria-container">
        <h1>Carnes</h1>
        <hr />
        <div className="carrusel">
          {carnes.map(dish=>{
            return (
              <DishCard dish={dish} key={dish.id}/>
          )})}
        </div>
      </div>

      <div className="categoria-container">
        <h1>Pescados</h1>
        <hr />
        <div className="carrusel">
          {pescados.map(dish=>{
            return (
              <DishCard dish={dish} key={dish.id}/>
          )})}
        </div>
      </div>

      <div className="categoria-container">
        <h1>Ensaladas</h1>
        <hr />
        <div className="carrusel">
          {ensaladas.map(dish=>{
            return (
              <DishCard dish={dish} key={dish.id}/>
          )})}
        </div>
      </div>

      <div className="categoria-container">
        <h1>Pizzas</h1>
        <hr />
        <div className="carrusel">
          {pizzas.map(dish=>{
            return (
              <DishCard dish={dish} key={dish.id}/>
          )})}
        </div>
      </div>
      
      <div className="categoria-container">
        <h1>Hamburguesas</h1>
        <hr />
        <div className="carrusel">
          {hamburguesas.map(dish=>{
            return (
              <DishCard dish={dish} key={dish.id}/>
          )})}
        </div>
      </div>

      <div className="categoria-container">
        <h1>Postres</h1>
        <hr />
        <div className="carrusel">
          {postres.map(dish=>{
            return (
              <DishCard dish={dish} key={dish.id}/>
          )})}
        </div>
      </div>
      
    </div>
 
  )
}

export default Home