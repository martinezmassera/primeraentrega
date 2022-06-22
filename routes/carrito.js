const { Router } = require('express');
const express = require('express')
const Cart = require('../containers/cart');
const veta = new Cart()
const router = Router();

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res)=>{

})
router.post('/', (req, res) => {
    let cart = veta.createCart()
    return res.end(cart)
    
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
    res.send(veta.getCartProducts(idCart))
})
router.post('/:id/products', (req, res) => {
    const idCart = req.params.id
    const idProduct = req.body
    let results = veta.addproductsCart(idCart, idProduct)

    return res.send(results)
})

module.exports = router;
