import './Header.css'
import Logo from '../../assets/icon.png'
import Login from '../../assets/login.svg'
import { Link } from 'react-router-dom'
import { Link as LinkRoll } from 'react-scroll';
import { useState } from 'react'

function Header() {
     const [menuOpen, setMenuOpen] = useState(false);
        const [menuItems, setMenuItems] = useState([false, false, false, false]);
    
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
                            <LinkRoll
                            id="terv"
                            activeClass="active" 
                            offset={-120}
                            to='tervezz'
                            spy={true} 
                            smooth={true} 
                            className={menuItems[0] ? 'open' : ''}>Tervezz!</LinkRoll>
                
                            <LinkRoll
                            id="us"
                            activeClass="active" 
                            offset={-100}
                            to='rolunk'
                            spy={true} 
                            smooth={true} 
                            className={menuItems[1] ? 'open' : ''}>Rólunk</LinkRoll>
                            
                            <LinkRoll
                            id="contact"
                            activeClass="active" 
                            offset={-100}
                            to='footer'
                            spy={true} 
                            smooth={true} 
                            className={menuItems[2] ? 'open' : ''}>Kapcsolat</LinkRoll>
                            
                         
                        </div>
            </div>
            <div className='MenuItems'>

            
            <Link to='/bejelentkezes' id='header-profil' className={menuItems[3] ? 'open' : ''}>
                <div className='Header-R'>
                    <img src={Login} alt="" />
                    <span>Login</span>
                </div>
            </Link>
            </div>
        </div>



    )



}

export default Header