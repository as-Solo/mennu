import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './styles/Home.css'
import './styles/DishCard.css'
import { BrowserRouter as Router } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
    <Router>
      <App/>
    </Router>
 
)
