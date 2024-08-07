import React from 'react';
import { CardCategorias } from '../componentes/CardCategorias';
import '../css/SeccionTiposA.css';

export function SeccionTiposA({ className }) {
    return (
        <div className={className}>
            <CardCategorias key="1" nombre="Apartment" />
            <CardCategorias key="2" nombre="Cabin" />
            <CardCategorias key="3" nombre="Houses" />
            <CardCategorias key="4" nombre="Villa" />
            <CardCategorias key="5" nombre="Hotel Room" />
        </div>
    );
}
