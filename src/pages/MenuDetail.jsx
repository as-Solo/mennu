import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"



function MenuDetail() {

  const [menu, setMenu] = useState(null)
  const { menuId } = useParams()
  const redirect = useNavigate()

  const [borrando, setBorrando] = useState(false)




  const handleDelete = async()=>{
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/menus/${menuId}`)
    redirect('/menus')
    setBorrando(!borrando)
  }
  const handleConfirmation = ()=>{
    setBorrando(!borrando)
  }

  const getData = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/menus/${menuId}?_embed=dishes`)
    console.log(response.data)
    setMenu(response.data)
  }

  useEffect(()=>{
    getData()
    return ()=>{}
  }, [])

  if (menu === null){
    return ( <h1>...loading</h1> )
  }
  return (
    <div className="super">

      <div className="dishes-container dishes-container-menu" >

      <div className="redirect" id="redirect">
      <button onClick={()=>redirect('/menus')}>⤺</button>
      </div>

      <h1>Menú {menu.nombre}</h1>
      
      
      

      {menu.dishes && menu.dishes.length > 0 ? (
        <><div className="dishes-fichas-container" id="platos-menu">



          {menu.dishes
            .filter((dish) => dish.categoriaMenu === "primeros")
            .map((dish) => (
              <Link key={dish.id} to={`/dishes/dish-detail/${dish.id}`}>
                <div key={dish.id} className="plato">
                  <h5>{dish.nombre}</h5>
                  <p>{dish.descripcion}</p>
                  <div className="data-dish-container">
                  <img src={dish.image} alt="imagen-plato"/>
                  <div>
                  <p>Vegan{dish.isVegan? '✔️': '❌'}</p>
                  <p>Gluten Free{dish.isGlutenFree? '✔️': '❌'}</p>
                  <p>{dish.rating}⭐</p>
                  </div>
                  </div>

                </div>
              </Link>
            ))}
          {menu.dishes
            .filter((dish) => dish.categoriaMenu === "segundos")
            .map((dish) => (
              <Link key={dish.id} to={`/dishes/dish-detail/${dish.id}`}>
                <div key={dish.id} className="plato">
                  <h5>{dish.nombre}</h5>
                  <p>{dish.descripcion}</p>
                  <div className="data-dish-container">
                  <img src={dish.image} alt="imagen-plato"/>
                  <div>
                  <p>Vegan{dish.isVegan? '✔️': '❌'}</p>
                  <p>Gluten Free{dish.isGlutenFree? '✔️': '❌'}</p>
                  <p>{dish.rating}⭐</p>
                  </div>
                  </div>

                </div>
              </Link>

            ))}
          {menu.dishes
            .filter((dish) => dish.categoriaMenu === "postres")
            .map((dish) => (
              <Link key={dish.id} to={`/dishes/dish-detail/${dish.id}`}>
                <div key={dish.id} className="plato">
                  <h5>{dish.nombre}</h5>
                  <p>{dish.descripcion}</p>
                  <div className="data-dish-container">
                  <img src={dish.image} alt="imagen-plato"/>
                  <div>
                  <p>Vegan{dish.isVegan? '✔️': '❌'}</p>
                  <p>Gluten Free{dish.isGlutenFree? '✔️': '❌'}</p>
                  <p>{dish.rating}⭐</p>
                  </div>
                  </div>

                </div>
              </Link>

            ))}
        
        </div><div className="precio">
            <p>Precio: {menu.precio} €</p>
          </div>
           {/* BOTON DE BORRAR CON PREGUNTITA */}
      <button onClick={handleConfirmation}>🗑️</button>
      {borrando
      && <><p>Está seguro de que quiere borrar este menú?</p>
        <button onClick={handleDelete}>Si</button>
        <button onClick={handleConfirmation}>No</button></>
      }
      <hr />
     
          </>
       
      ) : (
        <p>No hay platos agregados a este menú.</p>
      )}</div></div>
  )
}

export default MenuDetail