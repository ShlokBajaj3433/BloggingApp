import './App.css'
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { login, logout } from "./store/authSlice";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gradient-to-b from-gray-100 to-gray-200'>
      <div className='w-full block'>
        <Header />
        <main className='py-8 px-4 max-w-7xl mx-auto'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App