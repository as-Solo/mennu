import NotFoundImage from "../assets/404-NotFound.jpg"

function NotFound() {
  return (
    <div style={{display:"flex", width:"100%", height:"100%", flexDirection:"column", padding:"20px"}}>
        <img src={NotFoundImage} alt="" style={{borderRadius:"20px", objectFit:"cover", width:"100%", height:"95%"}}/>
        
    </div>
  )
}

export default NotFound