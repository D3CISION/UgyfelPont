import '../Header/Header.css'
import Logo from '../../assets/icon.png'
import Login from '../../assets/login.svg'
import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../Header/Menu.css'

function VezerloHeader() {
        const [menuOpen, setMenuOpen] = useState(false);
        const [menuItems, setMenuItems] = useState([false, false, false, false, false]);
    
        const toggleMenu = () => {
            setMenuOpen(!menuOpen);
            const updatedItems = menuItems.map((_, index) => {
                setTimeout(() => {
                    setMenuItems((prev) => {
                        const newItems = [...prev];
                        newItems[index] = !menuOpen;
                        return newItems;
                    });
                }, index * 20);
            });
        };
    return (
        <div className='Header'>
            <div className='Header-L'>
                <img src={Logo} alt="Logo" />
            </div>
            <div className='Header-M'>
                <div className="MenuItems">
                            <div
                                className={`hamburger ${menuOpen ? 'open' : ''}`}
                                onClick={toggleMenu}
                            >
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            
                            <Link to="/" className={menuItems[0] ? 'open' : ''}>Feladataid</Link>
                            <Link to="/ugyfelek" className={menuItems[1] ? 'open' : ''}>Ügyfelek</Link> 
                            <Link to="/ceged" className={menuItems[2] ? 'open' : ''}>Céged</Link>
                            <Link to="/statisztikak" className={menuItems[3] ? 'open' : ''}>Statisztikák</Link>
                        </div>
            </div>
            <div className='MenuItems'>
            <Link to='/profil' className={menuItems[4] ? 'open' : ''}>
                <div className='Header-R'>
                    <img src={Login} alt="" />
                    <span>Profil</span>
                </div>
            </Link>
            </div>
        </div>
    )
}
export default VezerloHeader