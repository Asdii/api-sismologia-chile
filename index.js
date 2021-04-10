import { getSismologia, getSismologiaUnica } from './servicios/sismologia.js';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const sismosActuales = await getSismologia("http://sismologia.cl/links/tabla.html");
    const detallesSismos = [];
    for(let sismo in sismosActuales['sismos']){
        let detalles = await getSismologiaUnica("http://sismologia.cl" + sismosActuales['sismos'][sismo].url);
        detalles.mapa = "http://sismologia.cl" + detalles.mapa;
        detallesSismos.push(detalles);
    }
    res.send(detallesSismos);
})

app.listen(port, () => console.log(`Api Sismologia escuchando en el puerto ${port}`));