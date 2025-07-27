import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: 'All Posts',
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow-lg bg-gradient-to-r from-blue-600 to-blue-800'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width="70px" />
            </Link>
          </div>
          <ul className='flex gap-8 items-center'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-700 rounded-full text-white font-medium'
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus ? (
              <li>
                <LogoutBtn />
              </li>
            ) : (
              <li className='flex gap-4'>
                <button
                  onClick={() => navigate("/login")}
                  className='px-6 py-2 duration-200 hover:bg-blue-700 rounded-full text-white font-medium'
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className='px-6 py-2 duration-200 bg-white text-blue-700 hover:bg-blue-50 rounded-full font-medium'
                >
                  Sign Up
                </button>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header