import { useEffect, useState } from 'react'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Tervezz from './Pages/Tervezz.jsx'
import Vezerlopult from './Pages/Vezerlopult.jsx'
import Login from './Components/Login/Login.jsx'
import Reg from './Components/Reg/Reg.jsx'
import Company from './Components/Company/Company.jsx'
import Naptar from './Components/Naptar/Naptar'
import Ugyfelek from './Components/Ugyfelek/Ugyfelek.jsx'
import Profil from './Components/Profil/Profil.jsx'
import Statisztika from './Components/Statisztika/Statisztika.jsx'
import Ceged from './Components/Ceged/Ceged.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Cegprofil from './Components/Profil/Cegprofil.jsx'
import { ToastContainer } from 'react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box } from '@mui/system'

import "react-toastify/dist/ReactToastify.css";

export const customStyles = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#000',
    }
  },
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white', // Háttérszín maradhat fehér
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'black', // A lista szövegszíne fekete
    backgroundColor: state.isSelected ? '#ccc' : 'white', // Kiválasztott elem színe
    fontSize: "1.4rem",
    ':hover': {
      backgroundColor: '#ddd', // Hover effektus színe
    }
  }),
};


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [])

  return (
    <Box sx={
      {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }
    }>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          {
            !user ? (
              <>
                <Route index path='/' element={<Tervezz />}></Route>
                <Route path='/bejelentkezes' element={<Login />}></Route>
                <Route path='/regisztracio' element={<Reg />}></Route>
                <Route path='/ceg' element={<Company />}></Route>
              </>
            ) :
              (
                <>
                  <Route path='/bejelentkezes' element={<Login />}></Route>
                  <Route path='/tervezz' element={<Tervezz />}></Route>
                  <Route path='/ceged' element={<Ceged />}></Route>
                  <Route index path='/' element={<Vezerlopult />}></Route>
                  <Route path='/naptar' element={<Naptar />}></Route>
                  <Route path='/ugyfelek' element={<Ugyfelek />}></Route>
                  <Route path="/profil" element={<Profil />} />
                  <Route path="/cegprofil" element={<Cegprofil />} />
                  <Route path='/statisztikak' element={<Statisztika />}></Route>
                </>
              )
          }

        </Routes>


        <Footer/>
        <ToastContainer toastStyle={{zIndex: "1000"}}/>
      </BrowserRouter>
      </LocalizationProvider>
    </Box>
  )
}

export default App
