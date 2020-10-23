const { writeDataToFile } = require('../util');
let products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function findProductById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id == id);
        if (!product) {
            resolve({ error: 'not found' });
        } else {
            resolve(product);
        }
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { ...product, id: uuidv4() };
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct);
    });
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products[index] = {id, ...product}
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    });
 }

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id);
        writeDataToFile('./data/products.json', products);
        resolve();
    });
}
module.exports = {
    findAll,
    findProductById,
    create,
    update,
    remove,
};