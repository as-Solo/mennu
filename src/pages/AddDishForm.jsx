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
  const [newDish, setNewDish] = useState({
    "nombre":'',
    "image":'',
    "descripcion":"",
    "isGlutenFree":false,
    "isVegan":false,
    "categoria":"",
    "categoriaMenu":"",
    "precio":0,
    "rating":0,
    "menuId":0
  })
// ---------------------------------------------------------


  const getMenuInfo = async()=>{
    const response = await axios.get("http://localhost:5000/menus")
    // console.log(response.data)
    let menu = []
    for (let elem of response.data){
      const object = {"id":elem.id, "nombre":elem.nombre}
      menu = [...menu, object]
    }
    setMenuInfo(menu)
  }

  const getCategorias = async()=>{
    const response = await axios.get("http://localhost:5000/dishes")
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
  // e.preventDefault()
  // console.log(e.target.name)
  // console.log(e.target.value)
  let clone = structuredClone(newDish)
  clone[e.target.name] = e.target.value
  setNewDish(clone)
}

const handleObjectCheck = (e)=>{
  // e.preventDefault()
  // console.log(e.target.name)
  // console.log(e.target.checked)
  let clone = structuredClone(newDish)
  clone[e.target.name] = e.target.checked
  setNewDish(clone)
}

const handleObjectText = (e)=>{
  // e.preventDefault()
  if (isTyping){
    clearTimeout(isTyping)
  }
  setIsTyping( setTimeout(()=>{
    let clone = structuredClone(newDish)
    clone[e.target.name] = e.target.value
    setNewDish(clone)
    // console.log(e.target.name)
    // console.log(e.target.value)
  }, 800) )
}



const handleCreate = async ()=>{
  if (
    newDish.nombre && 
    newDish.image && 
    newDish.descripcion && 
    // newDish.isGlutenFree && 
    // newDish.isVegan && 
    // newDish.menuId &&
    newDish.categoria && 
    newDish.categoriaMenu && 
    newDish.precio && 
    newDish.rating
    ){
    const platoNuevo = await axios.post("http://localhost:5000/dishes", newDish)
    console.log(`Se ha añadido ${platoNuevo.data.nombre} a la carta`)
    redirect(`/dishes/dish-detail/${platoNuevo.data.id}`)
    }
    else{
      console.log("Aqui vendria una ventanita explicativa de por qué no se ha añadido nada")
      console.log(newDish)
    }
}
// ---------------------------------------------------------

  // console.log(menuInfo)
  // console.log(categorias)
  // console.log(categoriasMenu)
  console.log(newDish)
  return (
    <div>
        <label htmlFor="nombre">Nombre</label>
        <input onChange={(e)=>handleObjectText(e)} type="text" name="nombre"/>
  <hr />
        <label htmlFor="descripcion">Descripcion</label>
        <textarea onChange={(e)=>handleObjectText(e)} type="text" name="descripcion"/>
  <hr />
        <label htmlFor="image">URL de la Imagen</label>
        <input onChange={(e)=>handleObjectText(e)} type="text" name="image"/>
  <hr />
        <label htmlFor="categoria">Categoria</label>
        <select onChange={(e)=>handleObject(e)} name="categoria" id="categoria" value={newDish.categoria}>
          <option value="">--No seleccionada--</option>
          {categorias.map((dato, index)=>{
            return (
            <option key={index} value={dato} name={dato}>{dato}</option>
          )
          })}
        </select>
  <hr />
        <label htmlFor="categoriaMenu">Categoria en menu</label>
        <select onChange={(e)=>handleObject(e)} name="categoriaMenu" id="categoriaMenu" value={newDish.categoriaMenu}>
          <option value="">--No seleccionada--</option>
          {categoriasMenu.map((dato, index)=>{
            return (
            <option key={index} value={dato} name={dato}>{dato}</option>
          )
          })}
        </select>
  <hr />
        <label htmlFor="precio">Precio</label>
        <input onChange={(e)=>handleObjectText(e)} type="number" name="precio" min={0}/>
  <hr />
        <label htmlFor="rating">Puntuacion</label>
        <input onChange={(e)=>handleObjectText(e)} type="number" name="rating" min={0} max={5}/>
  <hr />
        <label htmlFor="isVegan">Es vegano</label>
        <input onChange={(e)=>handleObjectCheck(e)} type="checkbox" name="isVegan" value={newDish.isVegan}/>
  <hr />
        <label htmlFor="isGlutenFree">No contiene gluten</label>
        <input onChange={(e)=>handleObjectCheck(e)} type="checkbox" name="isGlutenFree" value={newDish.isGlutenFree}/>
  <hr />
        <label htmlFor="menuId">Menu al que pertenece</label>
        <select onChange={(e)=>handleObject(e)} name="menuId" id="menuId" value={newDish.menuId}>
          <option value="">--No seleccionada--</option>
          {menuInfo.map(dato=>{
            if(dato.id !== 0){
            return (
            <option key={dato.id} value={dato.id} name={dato.nombre}>{dato.nombre}</option>
          )}
          })}
        </select>
  <hr />
          <button onClick={handleCreate}>CREATE</button>
    </div>
  )
}

export default AddDishForm