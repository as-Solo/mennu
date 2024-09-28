import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dishes from "./pages/Dishes"
import Menus from "./pages/Menus"
import MenuDetail from "./pages/MenuDetail"
import DishDetail from "./pages/DishDetail"
import AddMenuForm from "./pages/AddMenuForm"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/dishes'} element={<Dishes/>}/>
        <Route path={'/menus'} element={ <Menus/> }/>
        <Route path={'/menus/menu-detail/:id'} element={ <MenuDetail/> }/>
        <Route path={'/dishes/dish-detail/:id'} element={ <DishDetail/> }/>
        <Route path={'/add-menu'} element={ <AddMenuForm/> }/>
      </Routes>
    </>
  )
}

export default App
