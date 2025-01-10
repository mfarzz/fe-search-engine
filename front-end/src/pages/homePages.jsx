import { useState, useEffect } from 'react'
import CELLS from 'vanta/dist/vanta.cells.min'
import SearchLink from '../components/Search'
import Sidebar from '../components/SideBar'
import {jwtDecode} from 'jwt-decode'

function App() {
  useEffect(() => {
    CELLS({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      color2: 0x4035f2
    }, []);
  })

  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Dekode token untuk mendapatkan role
        setRole(decodedToken.role); // Ambil role dari token dan set ke state
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
  }, []);

  return (
    <div className='m-0 p-0'>
      <div className='w-screen h-screen' id='vanta'> 
        <div className='p-20'>
          <SearchLink /> 
          <Sidebar role={role} />
        </div>
      </div> 
    </div>
  )
}

export default App
