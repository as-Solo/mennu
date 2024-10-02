import React from 'react'



function MenuFilter(props) {

  const {handleInputsText, filters} = props

  const labelStyle = {
    fontSize: '.7rem',
    backgroundColor: "rgb(255, 255, 255)",
    
    }
  return (
  <div className="dishes-form" id='menu-search' style={{  display:"flex", gap:"16px", flexWrap:"wrap", alignContent:"center", alignItems:"flex-start", justifyContent:"center", position:"relative", maxWidth:"1200px" }}>
        <div className="cabecera-nombre-descripcion"> {/*, justifyContent:"center", width:"100%" */}
          <div className="form-input-text-container">
            <label className="form-label-text" htmlFor="nombre" style={filters.nombre ? labelStyle : {}}>Buscar menu por nombre:</label>
            <input className="form-input-text" id="filter-menu" onChange={(e)=>handleInputsText(e)} type="text" name="nombre"/>
          </div></div></div>
  )
}

export default MenuFilter
