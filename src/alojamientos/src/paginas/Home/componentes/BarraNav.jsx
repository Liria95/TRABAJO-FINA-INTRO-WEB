import React from 'react';
import { Link } from 'react-router-dom';
import '../css/BarraNav.css';
import logo from '../../assets/casalogo.png';

export function BarraNav() {
    return (
        <nav className="barraNavegacion" role="navigation" aria-label="Main Navigation">
            <div className="logoYMenu">
                <img src={logo} className="logoBarra" alt="Logo de la empresa HOUSE" />
            </div>
            <ul className="menu">
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/institucional">INSTITUCIONAL</Link></li>
                <li><Link to="/administracion">ADMINISTRACION</Link></li>
                <li><Link to="/contactanos">CONTACTANOS</Link></li>
                <li><Link to="/registro">REGISTRO</Link></li>
            </ul>
        </nav>
    );
}
