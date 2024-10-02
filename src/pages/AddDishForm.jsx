import "../styles/AddDishForm.css"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


function AddDishForm() {

const redirect = useNavigate()
// ----------------------  States  --------------------------
  const [menuInfo, setMenuInfo]= useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriasMenu, setCategoriasMenu] = useState([])
  const [isTyping, setIsTyping] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [newDish, setNewDish] = useState({
    "nombre":'',
    "image":'',
    "descripcion":"",
    "isGlutenFree":false,
    "isVegan":false,
    "categoria":"",
    "categoriaMenu":"",
    "precio":'',
    "rating":'',
    "menuId":0
  })
// ---------------------------------------------------------


  const getMenuInfo = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/menus`)
    let menu = []
    for (let elem of response.data){
      const object = {"id":elem.id, "nombre":elem.nombre}
      menu = [...menu, object]
    }
    setMenuInfo(menu)
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


// ---------------------  Effects  -------------------------
  useEffect(()=>{
    getMenuInfo()
    getCategorias()
    return ()=>{}
  }, [])
// ---------------------------------------------------------


// ---------------------  Handles  -------------------------
const handleObject = (e)=>{
  let clone = structuredClone(newDish)
  clone[e.target.name] = e.target.value
  setNewDish(clone)
}

const handleObjectCheck = (e)=>{
  let clone = structuredClone(newDish)
  clone[e.target.name] = e.target.checked
  setNewDish(clone)
}

// const handleObjectText = (e)=>{
//   if (isTyping){
//     clearTimeout(isTyping)
//   }
//   setIsTyping( setTimeout(()=>{
//     let clone = structuredClone(newDish)
//     clone[e.target.name] = e.target.value
//     setNewDish(clone)
//   }, 800) )
// } deprecated



const handleCreate = async ()=>{
  if (
    newDish.nombre && 
    newDish.image && 
    newDish.descripcion && 
    newDish.categoria && 
    newDish.categoriaMenu && 
    newDish.precio && 
    newDish.rating
    ){
    const platoNuevo = await axios.post(`${import.meta.env.VITE_SERVER_URL}/dishes`, newDish)
    console.log(`Se ha añadido ${platoNuevo.data.nombre} a la carta`)
    redirect(`/dishes/dish-detail/${platoNuevo.data.id}`)
    }
    else{
      console.log("Aqui vendria una ventanita explicativa de por qué no se ha añadido nada")
      console.log(newDish)
      setShowMessage(true)
      setTimeout(()=>setShowMessage(false), 2000)
    }
}
// ---------------------------------------------------------

  const styleLabel = {
    backgroundColor: "rgb(255, 255, 255)",
    top: "-7px",
    fontSize: ".7rem",
  }
// ---------------------------------------------------------


  return (
    <div className="centradito-add-dishes">
      <div className="add-dish-form-container">
          <div className="add-dish-text-input-container">
            <div className="width-text-input-container-nombre">
              <label className="add-dish-text-label" htmlFor="nombre" style={newDish.nombre?styleLabel:{}}>Nombre <super>*</super> </label>
              <input className="add-dish-text-input" onChange={(e)=>handleObject(e)} type="text" name="nombre" value={newDish.nombre}/>
            </div>
          </div>

          <div className="add-dish-text-input-container">
            <div className="width-text-input-container">
              <label className="add-dish-text-label" htmlFor="image" style={newDish.image?styleLabel:{}}>URL de la Imagen <super>*</super></label>
              <input className="add-dish-text-input add-dish-text-url" onChange={(e)=>handleObject(e)} type="text" name="image" value={newDish.image}/>
            </div>
          </div>
  
          <div className="add-dish-categorias-container">
            <div className="add-dish-select-container">
              <label className="add-dish-label-select" htmlFor="categoria">Categoria <super>*</super></label>
              <select className="add-dish-text-select" onChange={(e)=>handleObject(e)} name="categoria" id="categoria" value={newDish.categoria}>
                <option value="" style={{fontStyle:"italic", fontSize:".9rem"}}>--Vacio--</option>
                {categorias.map((dato, index)=>{
                  return (
                  <option key={index} value={dato} name={dato}>{dato}</option>
                )
                })}
              </select>
            </div>
    
            <div className="add-dish-select-container">
              <label className="add-dish-label-select" htmlFor="categoriaMenu">Categoria en menu <super>*</super></label>
              <select className="add-dish-text-select" onChange={(e)=>handleObject(e)} name="categoriaMenu" id="categoriaMenu" value={newDish.categoriaMenu}>
                <option value="" style={{fontStyle:"italic", fontSize:".9rem"}}>--Vacio--</option>
                {categoriasMenu.map((dato, index)=>{
                  return (
                  <option key={index} value={dato} name={dato}>{dato}</option>
                )
                })}
              </select>
            </div>
          </div>

          <div className="add-dish-precio-rating-container">
            <div className="add-dish-text-input-container text-input-number-container">
              <label className="add-dish-text-label label-number" htmlFor="precio" style={newDish.precio?styleLabel:{}}>Precio<super>*</super></label>
              <input className="add-dish-text-input input-text-number" onChange={(e)=>handleObject(e)} type="number" name="precio" min={0} value={newDish.precio}/>
            </div>

            <div className="add-dish-text-input-container text-input-number-container">
              <label className="add-dish-text-label label-number" htmlFor="rating" style={newDish.rating?styleLabel:{}}>Puntuacion<super>*</super></label>
              <input className="add-dish-text-input input-text-number" onChange={(e)=>handleObject(e)} type="number" name="rating" min={0} max={5} value={newDish.rating}/>
            </div>
          </div>
  
          <div className="add-dish-vegan-gluten-container">
            <div className="add-dish-check-container">
              <label htmlFor="isVegan" className="add-dish-label-chexkbox">Es vegano</label>
              <div className="add-dish-chexbox-text" style={newDish.isVegan?{backgroundColor:"rgb(125, 140, 42, .2)", borderColor:"rgb(125, 140, 42)"}:{}}>
                <div className="pelotica-checkbox" style={newDish.isVegan?{left:"9px", backgroundColor:"rgb(125, 140, 42)"}:{}}></div>
                <input style={{position:"absolute", opacity:"0"}} onChange={(e)=>handleObjectCheck(e)} type="checkbox" name="isVegan" value={newDish.isVegan}/>
              </div>
            </div>

            <div className="add-dish-check-container">
              <label htmlFor="isGlutenFree" className="add-dish-label-chexkbox">Sin gluten</label>
              <div className="add-dish-chexbox-text" style={newDish.isGlutenFree?{backgroundColor:"rgb(125, 140, 42, .2)", borderColor:"rgb(125, 140, 42)"}:{}}>
                <div className="pelotica-checkbox" style={newDish.isGlutenFree?{left:"9px", backgroundColor:"rgb(125, 140, 42)"}:{}}></div>
                <input style={{position:"absolute", opacity:"0"}} onChange={(e)=>handleObjectCheck(e)} type="checkbox" name="isGlutenFree" value={newDish.isGlutenFree}/>
              </div>
            </div>
          </div>

          <div className="add-dish-select-container menuId-select">
            <label className="add-dish-label-select" htmlFor="menuId" >Menu al que pertenece</label>
            <select className="add-dish-text-select" onChange={(e)=>handleObject(e)} name="menuId" id="menuId" value={newDish.menuId}>
              <option value="" style={{fontStyle:"italic", fontSize:".9rem"}}>--Sin asignar--</option>
              {menuInfo.map(dato=>{
                if(dato.id !== 0){
                return (
                <option key={dato.id} value={dato.id} name={dato.nombre}>{dato.nombre}</option>
              )}
              })}
            </select>
          </div>

          <div className="add-dish-descripcion-container">
            <label className="add-dish-label-descripcion" htmlFor="descripcion">Descripcion<super>*</super></label>
            <textarea className="add-dish-text-descripcion" onChange={(e)=>handleObject(e)} type="text" name="descripcion"/>
          </div>

            <button disabled={showMessage} onClick={handleCreate} style={{position:"absolute", bottom:"20px", borderRadius:"30px"}}>CREAR</button>
      </div>
      <div className="mensajes-creacion" style={showMessage?{opacity:"1"}:{}}>
        <div className="pastilla-mensaje">
          <p>No se ha creado el plato.</p>
          <p>Recuerda añadir los campos requeridos correctamente</p>
        </div>
      </div>
    </div>
  )
}

export default AddDishForm