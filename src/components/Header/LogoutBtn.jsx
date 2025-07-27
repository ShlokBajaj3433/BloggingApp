import React from 'react';
import { useDispatch } from 'react-redux';
import authService  from '../../appwrite/auth';
import { logout } from '../../store/authSlice';



function LougoutBtn() {
  const diapatch = useDispatch();
  const logoutHandler = async () => {
    try {
      await authService.logout();
      diapatch(logout());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }


  return (
    <button
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200"
      
      onClick={logoutHandler}
      title="Logout"
    >
      Logout
    </button>
  )
}

export default LougoutBtn