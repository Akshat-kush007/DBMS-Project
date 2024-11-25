import {BrowserRouter,Routes,Route  } from "react-router-dom"
import Home from "./pages/home";
import LoginSignupForm from "./pages/LoginSignupForm"
import Cart from "./pages/Cart"
import { useState } from "react";


function App() {
  const[ cartProducts, setCartProducts]=useState([]);
  const [isLogin,setIsLogin] = useState(false);

  return (
    <div className="bg-black ">
      <BrowserRouter>
      {/* <Navbar cartCount={cartCount} /> */}

        <Routes>
          <Route path="/" element={<Home cartProducts={cartProducts} setCartProducts={setCartProducts}isLogin={isLogin}/>}/>
          <Route path="/login" element={<LoginSignupForm isLogin={isLogin} setIsLogin={setIsLogin}/>}/>
          <Route path="/cart" element={<Cart cartProducts={cartProducts} setCartProducts={setCartProducts}/>}/>
         
        </Routes>
      </BrowserRouter>
    </div> 
  )
}

export default App
