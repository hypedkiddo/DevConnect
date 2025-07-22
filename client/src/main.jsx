import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
//importing components
import HomePage from './App'
import Layout from './components/layout'
import Login from './components/login'
import Profile from './components/profile'
import Register from './components/register'
import Notfound from './components/Notfound'

const router=createBrowserRouter(

  createRoutesFromElements(
     <>
           <Route path='' element={<HomePage/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='*' element={<Notfound/>}></Route>
    </>
  )

)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
