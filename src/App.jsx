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
import MyNavBar from './components/MyNavBar';
import NotFound from './pages/NotFound';

function App() {

  return (
    <>
      <MyNavBar/>
     {/*  <div style={{margin:"47px", border:"1px solid red"}}></div> */}
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/dishes'} element={<Dishes/>}/>
          <Route path={'/menus'} element={ <Menus/> }/>
          <Route path={'/menus/menu-detail/:menuId'} element={ <MenuDetail/> }/>
          <Route path={'/dishes/dish-detail/:dishId'} element={ <DishDetail/> }/>
          <Route path={'/add-menu'} element={ <AddMenuForm/> }/>
          <Route path={'/add-dish'} element={ <AddDishForm/> }/>
          <Route path={'*'} element={<NotFound/>}></Route>
        </Routes>
    </>
  )
}

export default App
