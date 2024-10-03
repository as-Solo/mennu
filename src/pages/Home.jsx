import DishCard from "../components/DishCard"
import fotoLanding from "../assets/HomeImage.png"
import { useEffect, useState } from "react"
import axios from "axios"
import Carousel from 'react-bootstrap/Carousel';
 


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
  const [imgRed, setImgRed] = useState(false)
  const [imgRed2, setImgRed2] = useState(false)

  const [styleLanding, setStyleLanding] = useState({
    backgroundColor:"white", height:"90vh"
  })
    
  const [styleRestInfo, setStyleRestInfo] = useState({width:"45%"})
  const [styleLandingImg, setStyleLandingImg] = useState({
    display:"block",
    width:"60%", objectFit:"cover", objectPosition:"left"
  })

  useEffect(() => {
    const handleScroll = () => {
      if(window.innerWidth >= 1024){
        if (window.scrollY > 100 && !imgRed ){
          setImgRed(true)
          setStyleLanding({
            backgroundColor:"white",
            height: "20vh"
          })
          setStyleLandingImg({
            display:"none"
          })
          setStyleRestInfo({
            width: "100%",
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center"
          })
        } else if(window.scrollY === 0 && imgRed){
          setImgRed(false)
  
          setStyleLanding({
            backgroundColor:"white",
            height: "90vh"
          })
          setStyleLandingImg({
            display:"block",
            width:"60%", objectFit:"cover", objectPosition:"left"
          })
          setStyleRestInfo({
            width: "45%",
            display:"block"
          })
        }
      } else {
        if(window.scrollY > 7){


          setStyleLanding({
            backgroundColor:"white",
            height: "25vh"
  
          })
        }else {


          setStyleLanding({
            backgroundColor:"white",
            height: "90vh"

          })
        }

        
        
        
      }
     
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [imgRed]);



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

    <div className="dishes-container">
      <div style={styleLanding} className="landing-div">
        <img src={fotoLanding} alt="foto-comida" style={styleLandingImg}/>
        <div className="restaurant-info" style={styleRestInfo}>
          <h5>ÑAM ÑAM</h5>
          <div className="direccion-telefono">
          <p>Divino Pastor 19</p>
          <p>699 783 343</p>
          </div>
          
        </div>
      </div>

      <div className="centradito">
      <div className="dishes-fichas-container">
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
      <div className="title-cont" id="hamb-title">

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
           <DishCard dish={dish} key={dish.id} data={data} setData={setData}/>
          </Carousel.Item>
        ))}
      </Carousel>
      </div> 
      
    </div>
    </div>
    </div>
 
  )
}

export default Home