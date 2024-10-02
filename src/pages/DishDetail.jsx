import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
// import "../styles/prueba.css"
import "../styles/DishDetail.css"
import "../styles/AddDishForm.css"
import starsEmpty from "../assets/stars_empty.png"
import starsFill from "../assets/stars_fill.png"
import vegan from "../assets/vegan_.png"
import no_vegan from "../assets/no_vegan.png"
import gluten_free from "../assets/gluten_free.png"
import no_gluten_free from "../assets/no_gluten_free.png"

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

  const styleLabel = {
    backgroundColor: "rgb(255, 255, 255)",
    top: "-7px",
    fontSize: ".7rem",
  }

  // console.log(editDish)
  if (dish === null){
    return (<h1>...loading</h1>)
  }
  return (
    <div className="dish-detail-god-container">
      <div className="dish-detail-container">
        <div className="dish-detail-boton-volver-container">
          <button onClick={()=>redirect('/dishes')} className="dish-detail-boton-volver">⤺</button>
        </div>
        <div className="dish-detail-image-precio-flotante-container">
          <div className="container-flotante-rotate">
            <img className="dish-detail-image" src={editando?"https://www.shutterstock.com/image-photo/portrait-chef-man-cap-kitchen-600nw-2276188823.jpg":dish.image} alt={`foto de ${dish.nombre}`}/>
            {editando
            ?<div className=" pegatina-precio">
                <label  htmlFor="precio" className="dish-detail-label-precio">precio</label>
                <input  className="dish-detail-input-precio" onChange={(e)=>handleInputs(e)} type="number" min={0} name="precio" value={editDish.precio}/>
            </div>
            :<div className="dish-detail-precio-flotante">
              {dish.precio}<span style={{fontSize:"1.3rem"}}>€</span>
            </div>}
          </div>
        </div>
        <div className="dish-detail-info-form-container" style={editando?{gap:"10px", paddingTop:"55px"}:{}}>
          <div className="dish-detail-categoria-rating">
            {editando
            ? 
            // <div className="add-dish-categorias-container">
              <div className="add-dish-select-container">
                  <label className="add-dish-label-select" htmlFor="categoria" >categoria</label>
                  <select className="add-dish-text-select" onChange={(e)=>handleInputs(e)} name="categoria" id="categoria" value={editDish.categoria}>
                    <option value="" style={{fontStyle:"italic", fontSize:".9rem"}}>--No seleccionada--</option>
                    {categorias.map((dato, index)=>{
                      return (
                      <option key={index} value={dato} name={dato}>{dato}</option>
                    )
                    })}
                  </select>
              </div>
            // </div>


            :<p className="dish-detail-etiqueta-precio">{dish.categoria}</p>}

            {editando
            ? <div className="add-dish-precio-rating-container">
                <div className="add-dish-text-input-container text-input-number-container" style={{width:"100px"}}>
                  <label className="add-dish-text-label label-number" htmlFor="rating" style={editDish.rating?styleLabel:{}}>rating</label>
                  <input className="add-dish-text-input input-text-number"onChange={(e)=>handleInputs(e)} type="number" min={0} max={5} name="rating" value={editDish.rating}/>
                </div>
              </div>
            :<div className='dish-detail-item-stars-container'>
              <div className='dish-detail-item-star'>
                <img src={starsEmpty} alt="" />
              </div>
              <div className='dish-detail-item-star' style={{maskImage:`linear-gradient(to right, black ${dish.rating*20}%, transparent ${dish.rating*20}%)`}}>
                <img src={starsFill} alt="" />
              </div>
            </div>
            }
          </div>
          <div className="dish-detail-nombre-container">
            {editando
            ?
            <div className="add-dish-text-input-container"> 
              <div className="width-text-input-container-nombre">
                <label className="add-dish-text-label" htmlFor="nombre" style={editDish.nombre?styleLabel:{}}>nombre</label>
                <input className="add-dish-text-input" onChange={(e)=>handleInputs(e)} type="text" name="nombre" value={editDish.nombre}/>
              </div>
            </div>
            : <div><p className="dish-detail-etiqueta-nombre">{dish.nombre}</p><hr className="subrayado-nombre"/></div>
            }
          </div>
          <div className="dish-detail-vegan-gluten-container" style={editando?{justifyContent:"center"}:{}}>
            {editando
            ? <div>
                <div className="add-dish-check-container">
                  <label htmlFor="isVegan" className="add-dish-label-chexkbox">Es vegano</label>
                  <div className="add-dish-chexbox-text" style={editDish.isVegan?{backgroundColor:"rgb(125, 140, 42, .2)", borderColor:"rgb(125, 140, 42)"}:{}}>
                    <div className="pelotica-checkbox" style={editDish.isVegan?{left:"9px", backgroundColor:"rgb(125, 140, 42)"}:{}}></div>
                    <input onChange={(e)=>handleInputsChecks(e)} style={{position:"absolute", opacity:"0"}} type="checkbox" name="isVegan" checked={editDish.isVegan}/>
                  </div>
                </div>
              </div>
            :<div>{dish.isVegan
              ? <img className="logos-veganos" src={vegan} alt="logo is-vegan" />
              : <img className="logos-veganos" src={no_vegan} alt="logo no-vegan" />}
              </div>
            }

            {editando
              ? <div>
                <div className="add-dish-check-container">
                  <label htmlFor="isGlutenFree" className="add-dish-label-chexkbox">Sin gluten</label>
                    <div className="add-dish-chexbox-text" style={editDish.isGlutenFree?{backgroundColor:"rgb(125, 140, 42, .2)", borderColor:"rgb(125, 140, 42)"}:{}}>
                      <div className="pelotica-checkbox" style={editDish.isGlutenFree?{left:"9px", backgroundColor:"rgb(125, 140, 42)"}:{}}></div>
                      <input onChange={(e)=>handleInputsChecks(e)} style={{position:"absolute", opacity:"0"}} type="checkbox" name="isGlutenFree" checked={editDish.isGlutenFree}/>
                    </div>
                  </div>
                </div>
              :<div>{dish.isGlutenFree
                ? <img className="logos-veganos" src={gluten_free} alt="logo gluten_free" />
                : <img className="logos-veganos" src={no_gluten_free} alt="logo no_gluten_free" />}
              </div>
            }
          </div>
          <div className="dish-detail-descripcion-container">
            {editando
            ? <div className="add-dish-descripcion-container" style={{margin:"0"}}>
                <label className="add-dish-label-descripcion" htmlFor="descripcion">descripcion</label>
                <textarea className="add-dish-text-descripcion retoquitos-height" onChange={(e)=>handleInputs(e)} name="descripcion" id="descripcion" value={editDish.descripcion}></textarea>
              </div>
            :<p className="">{dish.descripcion}</p>
            }
          </div>
        </div>
        
       
      </div>
      <div className="dish-detail-botonera-footer">
          {/* BOTON DE BORRAR CON PREGUNTITA */}
          <button className="dish-detail-botones-footer eraser" onClick={handleConfirmation}>BORRAR</button>
          {editando
            ? <button className="dish-detail-botones-footer" onClick={handleEditConfirmation} style={{backgroundColor:"rgb(125, 140,42)"}}>GUARDAR CAMBIOS</button>
            : <button className="dish-detail-botones-footer" onClick={handleEdit}>EDITAR</button> }
      </div>
      <div className="dish-detail-botonera-confirm" style={borrando||confirmation?{}:{opacity:"0"}}>
          {borrando
            && <div className="dish-detail-mensaje-botones">
              <p style={{color:"rgb(134, 24, 24)"}}>Está seguro que quiere borrar este plato?</p>
              <div style={{display:"flex", gap:"15px"}}>
                <button className="dish-detail-botones-footer eraser dish-detail-botoncicos" onClick={handleDelete}>Si</button>
                <button className="dish-detail-botones-footer dish-detail-botoncicos" onClick={handleConfirmation}>No</button>
              </div>
            </div>
            }
            {/* BOTON DINAMICO DE EDICION/SALVAR CAMBIOS */}
           
            { confirmation&&
              <div className="dish-detail-mensaje-botones">
                <p>Está seguro que quiere estos cambios?</p>
                <div style={{display:"flex", gap:"15px"}}>
                  <button className="dish-detail-botones-footer" onClick={handleEditNo}>CANCELAR</button>
                  <button className="dish-detail-botones-footer dish-detail-botoncicos" onClick={handleSaveChanges} style={{backgroundColor:"rgb(125, 140, 42"}}>SI</button>
                </div>
              </div>
              }
        </div>
    </div>
  )
}

export default DishDetail