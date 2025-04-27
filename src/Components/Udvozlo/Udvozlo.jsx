import React from "react";
import { useEffect, useState } from "react";
import './Udvozlo.css'

export default function Udvozlo() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    return (
        <div className="udv-cont">
            <h1>Üdvözöllek {user?.Nev || "Felhasználó"}!</h1>
        </div>
    )
}
