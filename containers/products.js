class Prods {

    constructor() {
        this.id = 0
        this.timestamp = new Date().toLocaleTimeString()
        this.products = []
    }

    getProduct() {
      
            return this.products

    }

    getIdProduct(id) {
        if (id) {
            return this.products.filter(prod => prod.id == id)
        } else {
            return this.products
        }
    }
    addProduct(product) {
        this.id++
        product['timestamp'] = new Date().toLocaleString()
        product['id'] = this.id
        this.products.push(product)
        return this.products
    }

    editProduct(id, product) {
        const index = this.products.findIndex(index => index.id == id);
        console.log(index)
        product['id'] = id;
        console.log(product)
        this.products.splice(index, 1, product);
        return this.products
    }

    deleteProduct(id) {
        const index = this.products.findIndex(index => index.id == id);
        console.log(index)
        this.products.splice(index, 1);
        return this.products
    }


}

module.exports = Prods