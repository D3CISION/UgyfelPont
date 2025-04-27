import React from "react";
import VezerloHeader from "../Components/VezerloHeader/VezerloHeader";
import Udvozlo from "../Components/Udvozlo/Udvozlo.jsx";
import Naptar from "../Components/Naptar/Naptar.jsx";
import './Vezerlopult.css'
import { useState, useEffect } from "react";
import Footer from "../Components/Footer/Footer.jsx";


export default function Vezerlopult() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
      }, [])
    return (
        <>
            <VezerloHeader />
            <div className="vezerlo-container">
                <Udvozlo/>
                <Naptar />
            </div>
        </>
    )
}