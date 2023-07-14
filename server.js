const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const eventos = [];

app.post('/eventos', (req, res) => {
    const { titulo, descripcion, fecha, lugar } = req.body;

    if(!titulo || !descripcion || !fecha || !lugar){
         let campoFaltante;
         if (!titulo) {
           campoFaltante = "titulo";
         } else if (!descripcion) {
           campoFaltante = "descripcion";
         } else if (!fecha) {
           campoFaltante = "fecha";
         } else {
           campoFaltante = "lugar";
         }
        return res
          .status(400)
          .json({
            error:
              "Faltan datos para completar el registro del evento, falta el dato = " + campoFaltante,    
          });
    }else{
    const evento = { titulo, descripcion, fecha, lugar };
    eventos.push(evento);
    res.status(201).json(evento);
    }

});

app.get('/eventos', (req, res) => {
    res.json(eventos);
});

app.get('/eventos/:id', (req, res) => {
    const { id } = req.params;

    const evento = eventos[parseInt(id)-1];
    console.log(evento);
    if (evento) {
        res.json(evento);
    } else {
        res.status(404).json({ error: 'Evento no encontrado' });
    }
});

app.all('*', function(req, res){
  res.status(401).send("Página no encontrada andate a la ruta correcta");
});

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en  http://localhost:${port}`);
});