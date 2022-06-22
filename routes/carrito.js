const { Router } = require('express');
const express = require('express');
const Cart = require('../containers/cart');
const veta = new Cart('./cart.json')


const router = Router();

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res)=>{
  const result = veta.getCart()
  const admin = 'true'
  res.render('elcarrito.ejs', {result, admin})
})
router.post('/', (req, res) => {
    let cart = veta.createCart()
    return res.send(cart)
    
})

router.delete('/:id', (req, res)=>{
    res.send(veta.deleteCart(req.params.id))

})

router.delete('/:id/products/:id_prod', (req, res)=>{
    const idCart = req.params.id
    const idProd = req.params.id_prod
    res.send(veta.deleteProdCart(idCart, idProd))
})

router.get('/:id/products', (req, res)=>{
    const idCart = req.params.id
    const result = veta.getCartProducts(idCart);
    res.render('carts.ejs', result)
})
router.post('/:id/products', (req, res) => {
    const idCart = req.params.id
    const idProduct = req.body
    let results = veta.addproductsCart(idCart, idProduct)

    return res.send(results)
})

module.exports = router;
