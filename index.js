const http = require('http');

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('./controller/productController');

const server = http.createServer((req, res) => {
    if (req.url == '/api/products' && req.method == 'GET') {
        getProducts(req, res);
    } else if (req.url.match(/\/api\/products\/\w+/) && req.method == 'GET') {
        console.log('STOP');
        const id = req.url.split('/')[3];
        getProduct(req, res, id);
    } else if (req.url == '/api/products' && req.method == 'POST') { 
        createProduct(req, res);
    } else if (req.url.match(/\/api\/products\/\w+/) && req.method == 'PUT') {
        const id = req.url.split('/')[3];
        updateProduct(req, res, id);
    } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') { 
        const id = req.url.split('/')[3];
        deleteProduct(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>Page Not Found</h1>');
        res.end();
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server Running on ${PORT}`));