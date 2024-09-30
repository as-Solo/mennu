// import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dishes from "./pages/Dishes"
import Menus from "./pages/Menus"
import MenuDetail from "./pages/MenuDetail"
import DishDetail from "./pages/DishDetail"
import AddMenuForm from "./pages/AddMenuForm"
import AddDishForm from "./pages/AddDishForm"
import { useState } from 'react';

function App() {
  // // creo que esto no es necesario si se estructura bien el codigo usando apis, lo dejo por si acaso.
  // const [dishes, setDishes] = useState([])
  // const [menus, setMenus] = useState([])

  // const getData = async()=>{
  //   const responseMenus = await axios.get("http://localhost:5000/menus")
  //   const responseDishes = await axios.get("http://localhost:5000/dishes")
  //   setDishes(responseDishes.data)
  //   setMenus(responseMenus.data)
  // }
  return (
    <>
      <Navbar/>
      <div style={{margin:"60px", border:"1px solid red"}}></div>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/dishes'} element={<Dishes/>}/>
        <Route path={'/menus'} element={ <Menus/> }/>
        <Route path={'/menus/menu-detail/:menuId'} element={ <MenuDetail/> }/>
        <Route path={'/dishes/dish-detail/:dishId'} element={ <DishDetail/> }/>
        <Route path={'/add-menu'} element={ <AddMenuForm/> }/>
        <Route path={'/add-dish'} element={ <AddDishForm/> }/>
      </Routes>
    </>
  )
}

export default App
