class NewCart {
    constructor(id) {
        this.id = id
        this.timestamp = new Date().toLocaleString()
        this.products = []
    }
}


class Cart {

    constructor() {
        this.carts = []
        this.count_id = 0
    }

    getCart(){
      return this.carts
    }
    createCart() {
        this.count_id++
        const cart = new NewCart(this.count_id)
        this.carts.push(cart)
        return { "id": this.count_id }
    }

    addproductsCart(idCart, product) {
            let cart = this.carts.find(c => c.id == idCart)
            cart.products.push(product)
            console.log(cart)
            return cart
    }

    deleteCart(id) {
        let cartIndex = this.carts.findIndex(c => c.id == id)
        let cartgGet = this.carts.find(c => c.id == id)
        let dos = cartgGet.products.length
        cartgGet.products.splice(0, dos + 1)
        this.carts.splice(cartIndex, 1);
        return this.carts
    }

    deleteProdCart(idCart, idProd) {
        let cartGet = this.carts.find(c => c.id == idCart)
        let prodIndex = cartGet.products.findIndex(c => c.id == idProd)
        cartGet.products.splice(prodIndex, 1)
        return cartGet
    }

    getCartProducts(id){
        let cartgGet = this.carts.find(c => c.id == id)
        let productInCart = cartgGet.products
        return productInCart
    }
}

module.exports = Cart