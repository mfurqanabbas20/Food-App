import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
const App = () => {
  const url = 'http://localhost:4000'
  return (
    <>
    <Navbar/>
    <hr />
    <div className="app">
      <Sidebar/>
      <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/order' element={<Order url={url}/>}/>
      </Routes>
    </div>
    </>

    // 4:51
    
   

  )
}

export default App