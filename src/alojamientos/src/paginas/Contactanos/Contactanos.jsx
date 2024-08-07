import React from 'react'
import Header from "../Home/componentes/Header";
import Footer from "../Home/componentes/Footer";
import Contacto from "./FormularioContacto";
import {Seccion} from '../Home/componentes/Seccion';
import BotonBuscarAlojamientos from '../Home/componentes/BotonBuscarAlojamientos';

 


export default function Contactanos() {
  return (
    <div>
      <Header />
      <BotonBuscarAlojamientos />
      <h3>CONTACTA CON NOSOTROS</h3>
      <Contacto/>
      <Footer/> 
    </div>
  )
}
