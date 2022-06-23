const { Router } = require('express');
const express = require('express');
const Cart = require('../containers/cart');
const venta = new Cart('./cart.json')


const router = Router();

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    const result = venta.getCart()
    res.render('carrito.ejs', { result })
})
router.post('/', (req, res) => {
    let cart = venta.createCart()
    return res.send(cart)

})

router.delete('/:id', (req, res) => {
    res.send(venta.deleteCart(req.params.id))

})

router.delete('/:id/products/:id_prod', (req, res) => {
    const idCart = req.params.id
    const idProd = req.params.id_prod
    res.send(venta.deleteProdCart(idCart, idProd))
})

router.get('/:id/products', (req, res) => {
    const idCart = req.params.id
   
    const result = venta.getCartProducts(idCart);
    console.log(result)
    // res.send('ok')
    res.render('carrito.ejs', { result })
})

router.post('/:id/products', (req, res) => {
    const idCart = req.params.id
    const idProduct = req.body
    let results = venta.addproductsCart(idCart, idProduct)

    return res.send(results)
})

module.exports = router;
