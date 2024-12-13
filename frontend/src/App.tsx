import { useContext, useState } from 'react'
import Home from './pages/home/home'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Signup from './pages/signin/signin'
import { AuthContext } from './context/auth';
import Signin from './pages/signin/signup';
import Create from './pages/create/create';
import { AnimatePresence } from 'framer-motion';

function App() {

  const location = useLocation();

  const { isLoading, isAuthenticated } = useContext(AuthContext);
  return isLoading ? <p>Loading...</p> : (
      <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={ isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
            <Route path='/create' element={ isAuthenticated ? <Create /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={ isAuthenticated ? <Navigate to="/" /> : <Signin />} />
            <Route path='/signup' element={ isAuthenticated ? <Navigate to="/" /> : <Signup />} />
        </Routes>
      </AnimatePresence>
        
  )
}

export default App
