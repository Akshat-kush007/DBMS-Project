import React, {Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ===============
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


import './Home.css'; 

export default function Home({ cartProducts, setCartProducts,isLogin }) {
  const [category, setCategory] = useState("all");
  const [quantities, setQuantities] = useState({}); // To manage quantities for each product

  const [products,setProducts]=useState([]);


  // ========================================
  const navigate = useNavigate(); // Hook to enable navigation
  
 
  // ========================================
  

  
  useEffect(()=>{

    async function fetchProducts() {
      try{
        const res = await axios.get("api/products")
        setProducts(res.data);
        console.log(res.data)
      }catch(err){
        console.log("Error in fetchProductFunction");
        console.log(err);
      }
    }
    
    fetchProducts();

  },[])


  // Function to add a product to the cart with quantity
  const addToCart = (productId,name, quantity) => {
    if(!isLogin){
      toast.error("Please Login to add Productrs");
    }else{
      const existingProduct = cartProducts.find((product) => product.id === productId);

      if (existingProduct) {
        // Update quantity if product already exists in the cart
        setCartProducts((prevCart) =>
          prevCart.map((product) =>
            product.id === productId
        ? { ...product, quantity: product.quantity + quantity }
        : product
          )
        );
      } else {
        // Add new product with quantity
        const product = products.find((product) => product.id === productId);
        if (product) {
          setCartProducts((prevCart) => [
            ...prevCart,
            { ...product, quantity },
          ]);
        }
      } 
      toast.success(`${name} Added to cart`); 
    }
  }; 

  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(1, (prevQuantities[productId] || 1) + change); // Ensure quantity doesn't go below 1
      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);


  return (
    <Fragment>
      <ToastContainer position="bottom-right"/>
      <nav className="navbar flex items-center justify-between bg-slate-950 px-6 ">
        {/* Left Side - Heading */}
        
        <Link to="/" className=" headingLink text-white text-2xl font-bold">Welcome to DU Store</Link>
        
        {/* Right Side - Buttons */}
        {
          !isLogin && (
            <div className="flex gap-4">
            {/* Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-white text-blue-500 font-semibold rounded hover:bg-gray-100"
            >
              Login
            </button>
            {/* Sign Up Button */}
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
            >
              Sign Up
            </button>

          </div>
          )
        }
      
      {isLogin && (<Link  to="/cart" className='relative'>
        <p className='absolute -right-2 -top-2 px-2 bg-red-900 font-bold rounded-full text-white text-xs '>{cartProducts.length}</p>
        <FontAwesomeIcon icon={faShoppingCart} className="text-white text-2xl"/> 
      </Link>)}
    </nav>

    {/* ============================================= */}
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-white p-6'>Products</h1>
        {/* Dropdown Menu for Filtering */}
        <section className="mx-4 flex gap-2">
          <label htmlFor="category" className="text-white">
            Filter by Category:
          </label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="food">Food</option>
            <option value="electronics">Electronics</option>
          </select>
        </section>

      </div>
      <div className="flex items-center justify-center flex-wrap gap-4">

        {filteredProducts.map((product) => {
          const quantity = quantities[product.id] || 1; // Get quantity for the current product, default to 1
          return (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-lg w-64 bg-white"
            >
              <img
                src={product.img}
                alt={product.name}
                className="rounded-lg w-full h-40 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-gray-600 w-60">Description: {product.description}</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={() => handleQuantityChange(product.id, -1)} // Decrease quantity
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(product.id, 1)} // Increase quantity
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => addToCart(product.id,product.name, quantity)} // Pass product ID and quantity
                className="cartButton w-full mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};


