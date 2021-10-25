import { getSismologia, getSismologiaUnica } from './servicios/sismologia.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
 
app.get('/', async (req, res) => {
    const sismosActuales = await getSismologia("http://sismologia.cl/");
    const detallesSismos = [];
    for(let sismo in sismosActuales['sismos']){
        let detalles = await getSismologiaUnica("http://sismologia.cl" + sismosActuales['sismos'][sismo].url);
        detalles.mapa = "http://sismologia.cl" + detalles.mapa;
        detallesSismos.push(detalles);
    }
    res.send(detallesSismos);
})

app.listen(port, () => console.log(`Api Sismologia escuchando en el puerto ${port}`));
