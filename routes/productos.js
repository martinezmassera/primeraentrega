const { Router } = require('express');
const express = require('express');
const Prods = require('../containers/products');
const prod = new Prods('./productos.json');


const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/add', (req, res)=>{
    res.render('addproducts.ejs');
});

router.post('/add', (req, res) => {
    if (req.headers.admin === 'false') {
        return res.end(`{ error : -1, descripcion: ruta "${req.params[0]}" metodo "${req.method}" no no autorizada}`);
    } else {
        const product = req.body;
        const admin = 'true';
        const result = prod.addProduct(product);
        console.log(result);
        return res.render('products.ejs', {result, admin});
    }
})


router.get('/:id?', (req, res) => {
    const admin = req.headers.admin;
    const id = req.params.id;
    const result = prod.getIdProduct(id);
    res.render('products.ejs', { result, admin });

});

router.get('/edit/:id', (req, res) => {
    const admin = req.headers.admin;
    const id = req.params.id;
    const result = prod.getIdProduct(id);
    res.render('editproduct.ejs', { result, admin });

});

router.put('/edit/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    if (req.headers.admin === 'false') {
        return res.end(`{ error : -1, descripcion: ruta "${req.params[0]}" metodo "${req.method}" no no autorizada}`);
    } else {
        const newProd = req.body;
        const id = req.params.id;
        const admin = req.headers.admin;
        prod.editProduct(id, newProd);
        const result = prod.getProduct();
        res.render('products.ejs', { result, admin});
    }
})

router.delete('/:id', (req, res) => {
    if (req.headers.admin === 'false') {
        return res.end(`{ error : -1, descripcion: ruta "${req.params[0]}" metodo "${req.method}" no no autorizada}`);
    } else {
        const id = req.params.id || req.body.id;
        res.send(prod.deleteProduct(id));
    }
})
module.exports = router;
