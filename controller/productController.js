const { findAll, findProductById, create, update, remove } = require('../models/productModel');
const { getPostData } = require('../util');
async function getProducts(req, res) {
    try {
        const products = await findAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(products));
        res.end();
    } catch (e) {
        console.log(e);
    }
}

async function getProduct(req, res, id) {
    try {
        const product = await findProductById(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(product));
        res.end();
    } catch (e) {
        console.log(e);
    }
}

async function createProduct(req, res) { 
        try {
            const products = await findAll();
            const body = await getPostData(req);
            const { title, description, price } = JSON.parse(body);
            const product = { title, description, price };

            const newProduct = await create(product);
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(newProduct));
            res.end();
    } catch (e) {
        console.log(e);
    }
}

async function updateProduct(req, res, id) { 
    try {
        const product = await findProductById(id);
        if (!product) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({error: 'product not found'}));
        res.end();
        } else {
            const body = await getPostData(req);
            const { title, description, price } = JSON.parse(body);
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || price.description,
            };
            const updProd = await update(id, productData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(updProd));
            res.end();
        }

    } catch (e) {
        console.log(e);
    }
}

async function deleteProduct(req, res, id) {
    try {
        
        const product = await findProductById(id);
        if (!product) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({error: 'product not found'}));
        res.end();
        } else {
           await remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(product));
            res.end();
        }

    } catch (e) {
        console.log(e);
    }
    remove(id);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};