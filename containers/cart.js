const fs = require('fs')

class NewCart {
    constructor(id) {
        this.id = id
        this.timestamp = new Date().toLocaleString()
        this.products = []
    }
}


class Cart {

    constructor(archivo) {
        this.archivo = archivo
        this.carts = []
        this.count_id = 0
        this.id_prod = 0
    }

    write() {
        const stringProd = JSON.stringify(this.carts)
        fs.writeFileSync(this.archivo, stringProd)
    }

    getCart() {
        try {
            const datos = fs.readFileSync(this.archivo)
            const datosParse = JSON.parse(datos)
            this.carts = datosParse
            return datosParse
        } catch (error) {
            return { error: 'archivo no encontrado' }
        }
    }

    createCart() {
        const leer = this.getCart()
        if (leer.length < 1) {
            this.count_id = 1
        } else {
            this.count_id = leer.length + 1
        }
        const cart = new NewCart(this.count_id)
        this.carts.push(cart)
        this.write()
        return { "id": this.count_id }
    }

    addproductsCart(idCart, product) {
        const leer = this.getCart()
        const cart = this.carts.find(c => c.id == idCart)
        if (!cart) {
            return 'carrito no encontrado'
        } else {
            if (cart.products.length < 1) {
                this.id_prod = 1
            } else {
                this.id_prod = cart.products.length + 1
            }
            product['timestamp'] = new Date().toLocaleString()
            product['id'] = this.id_prod;
            cart.products.push(product)
            this.write()
        }
        return leer
    }

    deleteCart(id) {
        const leer = this.getCart()
        let cartIndex = leer.findIndex(c => c.id == id)
        let cartgGet = leer.find(c => c.id == id)
        if (!cartgGet) {
            return 'carrito no encontrado'
        } else {
            let dos = cartgGet.products.length
            cartgGet.products.splice(0, dos + 1)
            leer.splice(cartIndex, 1);
            this.write()
        }
        return leer
    }

    deleteProdCart(idCart, idProd) {
        const leer = this.getCart()
        let cartGet = leer.find(c => c.id == idCart)
        let prodIndex = cartGet.products.findIndex(c => c.id == idProd)
        cartGet.products.splice(prodIndex, 1)
        this.write()
        return cartGet
    }

    getCartProducts(id) {
        const leer = this.getCart()
        const cart = leer.find(c => c.id == id)
        if (!cart) {
            return null
        } else {

            return [cart]
        }
    }
}

module.exports = Cart