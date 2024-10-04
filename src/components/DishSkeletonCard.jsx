import { useEffect, useState } from "react"
import "../styles/DishSkeletonCard.css"

function DishSkeletonCard() {

const [chivatoLoop, setChivatoLoop] = useState(true)

useEffect(()=>{
    const loopSkeleton = setInterval(()=>{
        setChivatoLoop(current=>!current)
    }, 1000)
    return ()=>{clearInterval(loopSkeleton)}
},[])

const loopStyle = {
    boxShadow: "inset 0px 0px 30px rgb(255, 255, 255)",
    backgroundColor: "rgb(170, 170, 170)"
}

  return (
    <div className="supercontainer">
      <div className="card-skeleton">
        <div className="skeleton-container">
          <div className="skeleton-foto" style={chivatoLoop?loopStyle:{}}></div>
          <div className="skeleton-datos">
            <div className="skeleton-1a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-2a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-3a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-div4-linea">
                <div className="skeleton-4a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
                <div className="skeleton-4b-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            </div>
            <div className="skeleton-5a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
          </div>
        </div>
      </div>
      <div className="card-skeleton">
        <div className="skeleton-container">
          <div className="skeleton-foto" style={chivatoLoop?loopStyle:{}}></div>
          <div className="skeleton-datos">
            <div className="skeleton-1a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-2a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-3a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-div4-linea">
                <div className="skeleton-4a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
                <div className="skeleton-4b-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            </div>
            <div className="skeleton-5a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
          </div>
        </div>
      </div>
      <div className="card-skeleton card-skel-3">
        <div className="skeleton-container">
          <div className="skeleton-foto" style={chivatoLoop?loopStyle:{}}></div>
          <div className="skeleton-datos">
            <div className="skeleton-1a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-2a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-3a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-div4-linea">
                <div className="skeleton-4a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
                <div className="skeleton-4b-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            </div>
            <div className="skeleton-5a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
          </div>
        </div>
      </div>
      <div className="card-skeleton card-skel-3">
        <div className="skeleton-container">
          <div className="skeleton-foto" style={chivatoLoop?loopStyle:{}}></div>
          <div className="skeleton-datos">
            <div className="skeleton-1a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-2a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-3a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            <div className="skeleton-div4-linea">
                <div className="skeleton-4a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
                <div className="skeleton-4b-linea linea" style={chivatoLoop?loopStyle:{}}></div>
            </div>
            <div className="skeleton-5a-linea linea" style={chivatoLoop?loopStyle:{}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DishSkeletonCard