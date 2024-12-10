
import React,{ useState,useEffect} from 'react'
import authservice from './appwrite/auth'
import { login, logout } from './store/authSlice';



import './App.css'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

function App() {
 const {loading,setloading} = useState(false)
 const dispatch = useDispatch( )
 useEffect(()=>{},[
  authservice.getCurrentUser()
  .then((userData) =>{
    if (userData) {
      dispatch(login({userData}))
    } else{
      dispatch(logout())
    }
  })
  .finally(() =>setloading(false))
 ])
  return!loading?(
    <div className='min-h-screen flex flex-wrap  content-between bg-gray-400'>
      <div className='w-full block'>
        <header/>
        <main>
          <Outlet/>

        </main>
        <footer/>
      </div>
    </div>
    
  ) : null
}

export default App
