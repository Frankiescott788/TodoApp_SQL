import { useContext, useState } from 'react'
import Home from './pages/home/home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/signin/signin'
import { AuthContext } from './context/auth';
import Signin from './pages/signin/signup';

function App() {
  const { isLoading, isAuthenticated } = useContext(AuthContext);
  return isLoading ? <p>Loading...</p> : (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={ isAuthenticated ? <Navigate to="/" /> : <Signin />} />
            <Route path='/signup' element={ isAuthenticated ? <Navigate to="/" /> : <Signup />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
