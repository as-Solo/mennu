import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
// import "../styles/prueba.css"


function DishDetail() {

  // const {getData} = props // deprecated este momento
  const redirect = useNavigate()
  const {dishId} = useParams()

  // ------------------------ STATES ------------------------------
  const [dish, setDish] = useState(null)
  const [categorias, setCategorias] = useState([])
  const [categoriasMenu, setCategoriasMenu] = useState([])
  const [borrando, setBorrando] = useState(false)
  const [editando, setEditando] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [editDish, setEditDish] = useState(null)
  // --------------------------------------------------------------
  

  // -------------------- PETICIONES A API ------------------------
  const getDish = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/dishes/${dishId}`)
    // console.log(response.data)
    setDish(response.data)
    setEditDish(response.data)
  }

  const getCategorias = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/dishes`)
    const categories = response.data.reduce((lista, elem)=>{
      if (!lista.includes(elem.categoria)){
        lista.push(elem.categoria)
      }
      return lista
    }, [])
    setCategorias(categories)

    const categoriesMenu = response.data.reduce((lista, elem)=>{
      if (!lista.includes(elem.categoriaMenu)){
        lista.push(elem.categoriaMenu)
      }
      return lista
    }, [])
    setCategoriasMenu(categoriesMenu)
  }

  useEffect(()=>{
    getDish()
    getCategorias()
    return ()=>{}
  }, [])
  // --------------------------------------------------------------


  // ------------------------ HANDLES ------------------------------
  const handleDelete = async()=>{
    console.log(`Se ha borrado ${dish.nombre} de la carta.`)
    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/dishes/${dishId}`)
    redirect('/dishes')
    setBorrando(!borrando)
  }

  const handleConfirmation = ()=>{
    setBorrando(!borrando)
  }

  const handleEditConfirmation = ()=>{
    setConfirmation(!confirmation)
  }

  const handleEdit = ()=>{
    setEditando(!editando)
  }

  const handleEditNo = ()=>{
    setConfirmation(!confirmation)
    setEditando(!editando)
  }

  const handleSaveChanges = async ()=>{
    await axios.patch(`${import.meta.env.VITE_SERVER_URL}/dishes/${dish.id}`, editDish)
    setDish(editDish)
    setConfirmation(!confirmation)
    setEditando(!editando)
  }

  const handleInputs = (e)=>{
    const clone = structuredClone(editDish)
    clone[e.target.name] = e.target.value
    setEditDish(clone)
  }

  const handleInputsChecks = (e)=>{
    const clone = structuredClone(editDish)
    clone[e.target.name] = e.target.checked
    setEditDish(clone)
  }
  // --------------------------------------------------------------

  console.log(editDish)
  if (dish === null){
    return (<h1>...loading</h1>)
  }
  return (
    <div style={{margin:'50px 200px'}}>
      <button onClick={()=>redirect('/dishes')} style={{borderRadius:"30px", padding:"2px 20px"}}>⤺</button>
      <div style={{width:'500px', height:'350px'}}>
        <img src={dish.image} alt="" style={{width:'100%', height:'100%', objectFit:"cover"}}/>
      </div>
      { editando &&
        <div>
          <label htmlFor="image">URL image</label>
          <input onChange={(e)=>handleInputs(e)} type="text" name="image" value={editDish.image}/>
        </div>}
      
      {editando
      ? <div>
        <label htmlFor="categoria">categoria</label>
          <select onChange={(e)=>handleInputs(e)} name="categoria" id="categoria" value={editDish.categoria}>
            <option value="">--No seleccionada--</option>
            {categorias.map((dato, index)=>{
              return (
              <option key={index} value={dato} name={dato}>{dato}</option>
            )
            })}
          </select>
        </div>
      :<p>{dish.categoria}</p>}

      {editando
      ? <div>
        <label htmlFor="nombre">nombre</label>
          <input onChange={(e)=>handleInputs(e)} type="text" name="nombre" value={editDish.nombre}/>
        </div>
      :<p>{dish.nombre}</p>
      }

      {editando
      ? <div>
        <label htmlFor="descripcion">descripcion</label>
          <textarea onChange={(e)=>handleInputs(e)} name="descripcion" id="descripcion" value={editDish.descripcion}></textarea>
        </div>
      :<p>{dish.descripcion}</p>
      }

      {editando
        ? <div>
          <label htmlFor="precio">precio</label>
            <input onChange={(e)=>handleInputs(e)} type="number" min={0} name="precio" value={editDish.precio}/>
          </div>
        :<p>{dish.precio}€</p>
      }

      {editando
        ? <div>
          <label htmlFor="isVegan">Es vegano</label>
            <input onChange={(e)=>handleInputsChecks(e)} type="checkbox" name="isVegan" checked={editDish.isVegan}/>
          </div>
        :<p>Vegan{dish.isVegan? '✔️': '❌'}</p>
      }

      {editando
        ? <div>
          <label htmlFor="isGlutenFree">No contiene gluten</label>
            <input onChange={(e)=>handleInputsChecks(e)} type="checkbox" name="isGlutenFree" checked={editDish.isGlutenFree}/>
          </div>
        :<p>Gluten Free{dish.isGlutenFree? '✔️': '❌'}</p>
      }

      {editando
        ? <div>
          <label htmlFor="rating">rating</label>
            <input onChange={(e)=>handleInputs(e)} type="number" min={0} max={5} name="rating" value={editDish.rating}/>
          </div>
        :<p>{dish.rating}⭐</p>
      }

      {/* BOTON DE BORRAR CON PREGUNTITA */}
      <button onClick={handleConfirmation}>🗑️</button>
      {borrando
      && <><p>Está seguro que quiere borrar este plato?</p>
        <button onClick={handleDelete}>Si</button>
        <button onClick={handleConfirmation}>No</button></>
      }
      <hr />
      {/* BOTON DINAMICO DE EDICION/SALVAR CAMBIOS */}
      {editando
      ? <button onClick={handleEditConfirmation}>GUARDAR CAMBIOS</button>
      : <button onClick={handleEdit}>EDITAR</button> }
      { confirmation&&
        <><p>Está seguro que quiere estos cambios?</p>
        <button onClick={handleSaveChanges}>SI</button>
        <button onClick={handleEditNo}>DESCARTAR CAMBIOS</button></>
        }
    </div>
  )
}

export default DishDetail