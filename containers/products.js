const fs = require('fs')
class Prods {

    constructor(archivo) {
        this.id = 0
        this.archivo = archivo
        this.timestamp = new Date().toLocaleString() 
        this.products = []
    }

    getProduct() {
        try {
        const datos = fs.readFileSync(this.archivo)
        const datosParse = JSON.parse(datos)
        this.products = datosParse
        return datosParse
    } catch (error) {
        return { error: 'archivo no encontrado' }
    }

    }

    getIdProduct(id) {
        const leer =  this.getProduct()
        if (id) {
            return leer.filter(prod => prod.id == id)
        } else {
            return leer
        }
    }
    addProduct(product) {
        const leer = this.getProduct()
        if (leer.length < 1) {
            this.id = 1
        } else {
            this.id = leer.length + 1
        }
        product['id'] = this.id
        product['timestamp'] = this.timestamp
        this.products.push(product)
        this.write()
        return leer
    }
    

    write() {
        const stringProd = JSON.stringify(this.products)
        fs.writeFileSync(this.archivo, stringProd)
    }

    editProduct(id, product) {
        const leer = this.getProduct()
        const index = this.products.findIndex(index => index.id == id);
        product['id'] = id;
        this.products.splice(index, 1, product);
        this.write()
        return leer
    }

    deleteProduct(id) {
        const leer = this.getProduct()
        const index = this.products.findIndex(index => index.id == id);
        this.products.splice(index, 1);
        this.write();
        return leer
    }


}

module.exports = Prods