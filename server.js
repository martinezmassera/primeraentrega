const express = require('express');
const {Router} = require ('express');
var favicon = require('serve-favicon');
var path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
app.set('views', './views')
app.set('view engine', 'ejs')
const products = require('./routes/productos');
const cart = require('./routes/carrito');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


app.use('/api/products', products);

app.use('/api/cart', cart);

app.use('*', (req, res)=>{
    res.end(`{ error : -2, descripcion: ruta "${req.params[0]}" metodo "${req.method}" no implementada}`)
  });

app.listen(PORT, () =>{
    console.log(`Servidor http en el puerto ${PORT}`)
});