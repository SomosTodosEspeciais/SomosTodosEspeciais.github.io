import React from 'react';
import './Footer.css';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import youtube from '../../assets/youtube.png';
const Footer: React.FC = () => {
    return (
        <div className="Footer">
            <div className='follow-us'>
                <h5>Follow us</h5>
                <ul>
                    <li>
                        <a href="https://www.instagram.com/todossomosespeciais23/" target="_blank" rel="noopener noreferrer">
                            <img src={instagram} alt="Instagram" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/profile.php?id=100094503303826" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/@TodosSomosEspeciais" target="_blank" rel="noopener noreferrer">
                            <img src={youtube} alt="Youtube" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
