import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sams from './pages/Sams'
import Wishlist from './pages/Wishlist'
import MyOrders from './pages/MyOrders'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Publish from './pages/Publish'
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sams' element={<Sams />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/publish' element={<Publish />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
