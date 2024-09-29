import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function MenuDetail() {

  const [menu, setMenu] = useState(null)
  const { menuId } = useParams()

  console.log(menuId)

  const getData = async ()=>{
    const response = await axios.get(`http://localhost:5000/menus/${menuId}?_embed=dishes`)
    console.log(response.data)
    setMenu(response.data)
  }

  useEffect(()=>{
    getData()
    return ()=>{}
  }, [])

  if (menu === null){
    return ( <h1>...loading</h1> )
  }
  return (
    <div>MenuDetail</div>
  )
}

export default MenuDetail