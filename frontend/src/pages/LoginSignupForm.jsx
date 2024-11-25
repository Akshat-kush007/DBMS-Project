import React, { useState } from "react";
import './LoginSignupForm.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignupForm = ({isLogin, setIsLogin}) => {
  
  //navigate
  const navigate = useNavigate();

  // data state variable--------
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [rpassword, setrpassword] = useState("");
  
  //toggle variable-------------
  const [loginToggle,setLoginToggle] = useState(true);

  //toggle function-------------
  const loginHandleToggle = () => {
    setLoginToggle(true);
    setName("");
    setpassword("");
    setrpassword("");
  };

  const signUpHandleToggle = () => {
    setLoginToggle(false);
    setName("");
    setpassword("");
  };

  //Login function -------------
  async function login(){
    console.log(name);
    console.log(password);

    try{
      const res = await axios.get("api/user")
      const data = res.data;
      console.log(data)

      const user = data.find(user => user.username === name && user.password === password);

        if (user) {
            console.log("Login successful");
            setIsLogin(true);
            navigate("/")
        } else {
            toast.error("Invalid username or password");
            console.log("Invalid username or password");
            setName("");
            setpassword("");
            setrpassword("");
            // Tost here
        }

    }catch(err){
      console.log("Error in fetchProductFunction");
      console.log(err);
    }
    
  }
  //Register function -------------
  async function register(){
    console.log(name);
    console.log(password);
    console.log(rpassword);

    if(password===rpassword){
      try{
        await axios.post("api/user",{username:name,password:password});
        setIsLogin(true);
        navigate("/")
      }catch(err){
            setName("");
            setpassword("");
        console.log("Error in Login");
        console.log(err)
      }
    }else{
      toast.error("Password does not match");
    }
  }



  return (
    <div className=" loginForm flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <ToastContainer position="bottom-right"/>
      <div className="bg-white p-10 rounded-lg shadow-2xl w-[400px] lg:w-[600px]">
        {/* Toggle Buttons */}
        <div className="flex justify-between mb-8 border-b border-gray-300">
          <button
            onClick={loginHandleToggle}
            className={`w-1/2 py-3 font-semibold text-xl transition-colors duration-300 ${
              loginToggle
                ? "bg-blue-500 text-white rounded-t-md"
                : "bg-gray-200 text-blue-500 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={signUpHandleToggle}
            className={`w-1/2 py-3 font-semibold text-xl transition-colors duration-300 ${
              !loginToggle
                ? "bg-blue-500 text-white rounded-t-md"
                : "bg-gray-200 text-blue-500 hover:bg-gray-300"
            }`}
          >
            Sign Up
          </button>
        </div>
  
        {/* Form */}
        <div className="space-y-6">
          {loginToggle ? (
            // Login Form
            <>
              <div className="flex flex-col space-y-2">
                <label htmlFor="loginName" className="text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  id="loginName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="loginPassword" className="text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  id="loginPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={login}
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </>
          ) : (
            // Sign Up Form
            <>
              <div className="flex flex-col space-y-2">
                <label htmlFor="signupName" className="text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  id="signupName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <label htmlFor="signupPassword" className="text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  id="signupPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="signupRePassword" className="text-sm font-medium text-gray-600">
                  Renter Password
                </label>
                <input
                  id="signupRePassword"
                  type="password"
                  value={rpassword}
                  onChange={(e) => setrpassword(e.target.value)}
                  placeholder="Again enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={register}
                className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default LoginSignupForm;
