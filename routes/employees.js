const express = require('express');
const router = express.Router();
  
  router.get('/employees', (req, res, next) => {
    res.send('Obteniendo empleados');
  });
  router.post('/employees', (req, res, next) => {
    res.send('Creando empleados');
  });
  router.put('/employees', (req, res, next) => {
    res.send('Actualizando empleados');
  });
  router.delete('/employees', (req, res, next) => {
    res.send('Eliminando empleados');
  });

  module.exports = router;