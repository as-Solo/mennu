import DishCard from "../components/DishCard"
import fotoLanding from "../assets/HomeImage.png"
import { useEffect, useState } from "react"
import axios from "axios"
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from "react-router-dom";
 


function Home() {

  // lo suyo seria hacer un state por cada categoria y gestionar cada lista con su propio set, de manera que cuando se modifique algo, solo se haga
  // una llamada parcial de datos y solo se actualice el carrusel donde ha habido cambios.
  // no se me ocurre como hacerlo escalable para poder hacer lo mismo pero con un numero de categorias n.
  // el getData con parametro category, y que el useEffect llame a todas las categorias, pero luego solo se tendria que llamar a la categoria correspondiente??
  const [data, setData] = useState(null)

  const [entrantes, setEntrantes] = useState(null)
  const [carnes, setCarnes] = useState(null)
  const [pescados, setPescados] = useState(null)
  const [ensaladas, setEnsaladas] = useState(null)
  const [pizzas, setPizzas] = useState(null)
  const [hamburguesas, setHamburguesas] = useState(null)
  const [postres, setPostres] = useState(null)

  const location = useLocation()

  const getRows = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/dishes`)
    const dishes = response.data
    setEntrantes(dishes.filter(elem=>elem.categoria.toLowerCase()==="entrantes"))
    setCarnes(dishes.filter(elem=>elem.categoria.toLowerCase()==="carnes"))
    setPescados(dishes.filter(elem=>elem.categoria.toLowerCase()==="pescados"))
    setEnsaladas(dishes.filter(elem=>elem.categoria.toLowerCase()==="ensaladas"))
    setPizzas(dishes.filter(elem=>elem.categoria.toLowerCase()==="pizzas"))
    setHamburguesas(dishes.filter(elem=>elem.categoria.toLowerCase()==="hamburguesas"))
    setPostres(dishes.filter(elem=>elem.categoria.toLowerCase()==="postres"))
    setData(dishes)
    // console.log(data)
  }
  useEffect(()=>{
    getRows()

    return ()=>{}
  }, [])


  if(data === null || entrantes === null || carnes === null || pescados === null || ensaladas === null || pizzas === null || hamburguesas === null || postres === null){


    return (
    <>
      <h1 style={{backgroundColor:"black"}}>...loading  request</h1>
    </>
    )
  }
  return (

    <div>
      <div style={{backgroundColor:"white"}}>
        <img src={fotoLanding} alt="foto-comida" style={{width:"60%", objectFit:"cover", objectPosition:"left"}}/>
      </div>

      <div className="categoria-container verde">
        <div className="title-cont">
        <h1 className="amarillo categ-title">Entrantes</h1>
        </div>
        <hr />

        <Carousel>
        {entrantes.map(dish => (
          <Carousel.Item key={dish.id}>
           <DishCard dish={dish} key={dish.id} data={data} setData={setData}/>
          </Carousel.Item>
        ))}
      </Carousel>

    </div>

      <div className="categoria-container amarillo">
      <div className="title-cont">

        <h1 className="verde categ-title">Carnes</h1>
        </div>
        <hr />
        <Carousel>
        {carnes.map(dish => (
          <Carousel.Item key={dish.id}>
           <DishCard dish={dish} key={dish.id} data={data} setData={setData}/>
          </Carousel.Item>
        ))}
      </Carousel>
      </div>

      <div className="categoria-container verde">
      <div className="title-cont">

        <h1 className="amarillo categ-title">Pescados</h1>
        </div>
        <hr />
        <Carousel>
        {pescados.map(dish => (
          <Carousel.Item key={dish.id}>
           <DishCard dish={dish} key={dish.id} data={data} setData={setData}/>
          </Carousel.Item>
        ))}
      </Carousel>

       
      </div>

      <div className="categoria-container amarillo">
      <div className="title-cont">

        <h1 className="verde categ-title">Ensaladas</h1>
        </div>
        <hr />
        <Carousel>
        {ensaladas.map(dish => (
          <Carousel.Item key={dish.id}>
           <DishCard dish={dish} key={dish.id} data={data} setData={setData}/>
          </Carousel.Item>
        ))}
      </Carousel>

      </div>

      <div className="categoria-container verde">
      <div className="title-cont">

        <h1 className="amarillo categ-title">Pizzas</h1>
        </div>
        <hr />
        <Carousel>
        {pizzas.map(dish => (
          <Carousel.Item key={dish.id}>
           <DishCard dish={dish} key={dish.id} data={data} setData={setData}/>
          </Carousel.Item>
        ))}
      </Carousel>
      </div>
      
      <div className="categoria-container amarillo">
      <div className="title-cont">

        <h1 className="verde categ-title">Hamburguesas</h1>
        </div>
        <hr />
        <Carousel>
        {hamburguesas.map(dish => (
          <Carousel.Item key={dish.id}>
           <DishCard dish={dish} key={dish.id} data={data} setData={setData}/>
          </Carousel.Item>
        ))}
      </Carousel>
      </div>

      <div className="categoria-container verde">
      <div className="title-cont">

        <h1 className="amarillo categ-title">Postres</h1>
        </div>
        <hr />
        <Carousel>
        {postres.map(dish => (
          <Carousel.Item key={dish.id}>
           <DishCard dish={dish} key={dish.id} data={data} setData={setData} state={{desde:location.pathname}}/>
          </Carousel.Item>
        ))}
      </Carousel>
      </div> 
      
    </div>
 
  )
}

export default Home