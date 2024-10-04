import { useEffect, useState } from "react"
import "../styles/DishFilters.css"

function DishFilters(props) {

  const {handleInputsText, handleInputs, handleInputsVariantes, handleInputsOrder, handleInputsAscDesc, orderBy, ascendant, filters} = props
  const [moreFilters, setMorefilters] = useState("100px")
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 689){
        setChecked(false)
        setMorefilters("100px")
      }
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMoreFilters = (e)=>{
    setChecked(e.target.checked)
    if (e.target.checked){
      if(screenWidth >=620){
        setMorefilters("140px")
      }
      else if (screenWidth >= 465){
        setMorefilters("180px")
      }
      else{
        setMorefilters("222px")
      }
      }
      else{
        setMorefilters("100px")
      }
  }
  const labelStyle = {fontSize: '.7rem',
    left: "20px",
    top: "-4px",
    backgroundColor: "rgb(255, 255, 255)",
    padding: "0 10px 0 4px",
    }
  return (
    <div className="dishes-form" style={{ height:`${moreFilters}`, display:"flex", gap:"16px", flexWrap:"wrap", alignContent:"flex-start", alignItems:"flex-start", justifyContent:"center", position:"relative", maxWidth:"1200px" }}>
        <div className="cabecera-nombre-descripcion"> {/*, justifyContent:"center", width:"100%" */}
          <div className="form-input-text-container">
            <label className="form-label-text" htmlFor="nombre" style={filters.nombre ? labelStyle : {}}>Nombre</label>
            <input className="form-input-text" onChange={(e)=>handleInputsText(e)} type="text" name="nombre"/>
          </div>

          <div className="form-input-text-container">
            <label className = "form-label-text"htmlFor="descripcion" style={filters.descripcion ? labelStyle : {}}>Descripcion</label>
            <input className="form-input-text"onChange={(e)=>handleInputsText(e)} type="text" name="descripcion"/>
          </div>
          </div>

        <div style={{display:"flex", gap:"5px"}}>
          <div style={{position:"relative", flexWrap:"nowrap", display:"flex"}}>
            <label className="texto-flotante-pildoras" htmlFor="precio">Precio</label>
            <select className="form-dish-select select-izq" onChange={(e)=>handleInputsVariantes(e)} name="precioVar" id="">
              <option value={''}>Todo</option>
              <option value="=">=</option>
              <option value="_gte=">{'🡱'}</option>
              <option value="_lte=">{'🡳'}</option>
            </select>
            <input onChange={(e)=>handleInputsText(e)} className="select-der" type="number" name="precio" min={0}/>
          </div>
          <div style={{position:"relative", flexWrap:"nowrap", display:"flex"}}>
            <label className="texto-flotante-pildoras" htmlFor="rating">Rating</label>
            <select className="form-dish-select select-izq" onChange={(e)=>handleInputsVariantes(e)} name="ratingVar" id="">
              <option value={''}>Todo</option>
              <option value="=">=</option>
              <option value="_gte=">{"🡱"}</option>
              <option value="_lte=">{"🡳"}</option>
            </select>
            <input onChange={(e)=>handleInputsText(e)} className="select-der" type="number" name="rating" min={0} max={5}/>
          </div>
        </div>

        <div style={{display:"flex", gap:"10px"}}>
          <div style={{position:"relative"}}>
            <p className="form-text-select">🌱</p>
            <select className="form-dish-select" onChange={(e)=>handleInputs(e)} name="isVegan">
              <option value={''}>{""}</option>
              <option value={true}>🍃</option> {/*la opcion en tecto es Vegano  🌱*/}
              <option value={false}>🚫</option> {/*la opcion en tecto es No vegano */}
            </select>
          </div>
          <div style={{position:"relative"}}>
            <p className="form-text-select">🌽</p>
            <select className="form-dish-select" onChange={(e)=>handleInputs(e)} name="isGlutenFree">
              <option value={''}>{""}</option>
              <option value={true}>✅</option>
              <option value={false}>❌</option>
            </select>
          </div>
        </div>

        <select className="form-dish-select" onChange={(e)=>handleInputs(e)} name="categoria" id="">
          <option value={''}>-- Categoria</option>
          <option value="entrantes">Entrantes</option>
          <option value="carnes">Carnes</option>
          <option value="pescados">Pescados</option>
          <option value="ensaladas">Ensaladas</option>
          <option value="pizzas">Pizzas</option>
          <option value="hamburguesas">Hamburguesas</option>
          <option value="postres">Postres</option>
        </select>

        <select className="form-dish-select" onChange={(e)=>handleInputs(e)} name="categoriaMenu" id="">
          <option value={''}>-- Categoria Menu</option>
          <option value="primeros">Primeros</option>
          <option value="segundos">Segundos</option>
          <option value="postres">Postres</option>
        </select>
        <hr />
        <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
          <select className="form-dish-select" onChange={(e)=>handleInputsOrder(e)} name="orderBy" id="" value={orderBy}>
            <option value={''}>-- Ordenar por</option>
            <option value="nombre">Nombre</option>
            <option value="descripcion">Descripcion</option>
            <option value="isVegan">Veganos</option>
            <option value="isGlutenFree">Sin gluten</option>
            <option value="categoria">Categoría</option>
            <option value="categoriaMenu">Categoría de menu</option>
            <option value="precio">Precio</option>
            <option value="rating">Puntuacion</option>
          </select>
          <div className="check-ascendant-container">
            <input onChange={(e)=>handleInputsAscDesc(e)} type="checkbox" name="isAscendant" value={ascendant} style={{position:"absolute", opacity:"0"}}/>
            <p style={{margin:0}}>{ascendant?'⇵':'⇅'}</p>
          </div>
        </div>
        <div className="boton-mas-filtros">
          <p style={{margin:"0", padding:"0"}}>{checked?'🠉':'🠋'}</p>
          <input className="show-more-filters" onChange={(e)=>handleMoreFilters(e)} checked={checked} type="checkbox" style={{opacity:"0", position:"absolute"}}/>
        </div>
      </div>
  )
}

export default DishFilters