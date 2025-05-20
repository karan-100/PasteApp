import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';

const router=createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div className='bg-white h-screen'>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
    }
  ]
);

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
