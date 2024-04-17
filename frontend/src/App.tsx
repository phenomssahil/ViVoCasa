import React, { useState } from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Room from "./pages/Room";
import RoomId from "./pages/RoomId";
import CategoryId from "./pages/CategoryId";
import Ideas from "./pages/Ideas";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

const App: React.FC = () =>{
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/rooms" element={<Room/>}/>
        <Route path="/rooms/:id" element={<RoomId/>}/>
        <Route path="/shop/:id" element={<Product/>}/>
        <Route path="/category/:id" element={<CategoryId/>}/>
        <Route path="/ideas&inspiration" element={<Ideas/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/success' element={<Success/>}/>
      </Routes>
    </>
  )
}

export default App;