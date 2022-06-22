const express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
app.set('views', './views')
app.set('view engine', 'ejs')
const products = require('./routes/productos');
const cart = require('./routes/carrito');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


app.use('/productos', products);

app.use('/carrito', cart);

app.use('*', (req, res)=>{
  const rout = req.params[0];
  const method = req.method
    res.json({
      "error":-2,
    "descripción": 'ruta '+ rout + ' metodo '+ method+ ' no implementada'
     })
  });

app.listen(PORT, () =>{
    console.log(`Servidor http en el puerto ${PORT}`)
});