

function DishFilters(props) {

  const {handleInputsText, handleInputs, handleInputsVariantes, handleInputsOrder, handleInputsAscDesc, orderBy, ascendant} = props

  return (
    <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}}>
        <label htmlFor="nombre">Nombre</label>
        <input onChange={(e)=>handleInputsText(e)} type="text" name="nombre"/>
        <hr />
        <label htmlFor="descripcion">Descripcion</label>
        <input onChange={(e)=>handleInputsText(e)} type="text" name="descripcion"/>
        <hr />
        <select onChange={(e)=>handleInputs(e)} name="isVegan">
          <option value={''}>Indiferente</option>
          <option value={true}>Es vegano</option>
          <option value={false}>No es vegano</option>
        </select>
        <hr />
        <select onChange={(e)=>handleInputs(e)} name="isGlutenFree">
          <option value={''}>Indiferente</option>
          <option value={true}>No lleva gluten</option>
          <option value={false}>Lleva gluten</option>
        </select>
        <hr />
        <label htmlFor="precio">Precio</label>
        <select onChange={(e)=>handleInputsVariantes(e)} name="precioVar" id="">
          <option value={''}>--Todos--</option>
          <option value="=">Igual a</option>
          <option value="_gte=">Mayor que</option>
          <option value="_lte=">Menor que</option>
        </select>
        <input onChange={(e)=>handleInputsText(e)} type="number" name="precio" min={0}/>
        <hr />
        <label htmlFor="rating">Rating</label>
        <select onChange={(e)=>handleInputsVariantes(e)} name="ratingVar" id="">
        <option value={''}>--Todos--</option>
          <option value="=">Igual a</option>
          <option value="_gte=">Mayor que</option>
          <option value="_lte=">Menor que</option>
        </select>
        <input onChange={(e)=>handleInputsText(e)} type="number" name="rating" min={0}/>
        <hr />
        <select onChange={(e)=>handleInputs(e)} name="categoria" id="">
          <option value={''}>-- Todos --</option>
          <option value="entrantes">Entrantes</option>
          <option value="carnes">Carnes</option>
          <option value="pescados">Pescados</option>
          <option value="ensaladas">Ensaladas</option>
          <option value="pizzas">Pizzas</option>
          <option value="hamburguesas">Hamburguesas</option>
          <option value="postres">Postres</option>
        </select>
        <hr />
        <select onChange={(e)=>handleInputs(e)} name="categoriaMenu" id="">
          <option value={''}>-- Todos --</option>
          <option value="primeros">Primeros</option>
          <option value="segundos">Segundos</option>
          <option value="postres">Postres</option>
        </select>
        <hr />
        <select onChange={(e)=>handleInputsOrder(e)} name="orderBy" id="" value={orderBy}>
          <option value="nombre">Nombre</option>
          <option value="descripcion">Descripcion</option>
          <option value="isVegan">Veganos</option>
          <option value="isGlutenFree">Sin gluten</option>
          <option value="categoria">Categoría</option>
          <option value="categoriaMenu">Categoría de menu</option>
          <option value="precio">Precio</option>
          <option value="rating">Puntuacion</option>
        </select>
        <input onChange={(e)=>handleInputsAscDesc(e)} type="checkbox" name="isAscendant" value={ascendant}/>
      </div>
  )
}

export default DishFilters