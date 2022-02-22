import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import './App.css'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import AddProduct from './components/AddProducts/AddProduct';
import ViewProduct from './components/ViewProducts/ViewProduct';
function App() {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Link to="/register"><button className='home-btn'>Go To Register</button></Link>} />

          <Route  path='register' element={<Register />} />
          
          <Route path='login' element={<Login />} />
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='viewproduct' element={<ViewProduct />} />
          
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
