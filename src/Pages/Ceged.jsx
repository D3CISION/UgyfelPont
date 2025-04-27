import React from "react";
import VezerloHeader from "../Components/VezerloHeader/VezerloHeader";
import Employees from "../Components/Employees/Employees";
import Footer from "../Components/Footer/Footer";
import Iframe from 'react-iframe'

export default function Ceged() {
    return (
        <div>
            <VezerloHeader />
            <div className="ceged-container">
                <Employees />
            </div>

        </div>
    )
}