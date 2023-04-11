const express = require('express');
const app = express();

const ProductManager = require('./ProductManager');
const manager = new ProductManager();

app.use(express.urlencoded({extended:true}))


app.get('/products', async (req,res) =>{

    const products = await manager.getProduct();
    
    let title = req.query.title;
    if(!title ||(title!=="fideos"&&title!=="arroz"))
    return res.send(products);

    let productosFiltrados = products.filter(product=>product.title===title);
    res.send(productosFiltrados);


});

app.get('/products/:pid', async (req,res) =>{
    const products = await manager.getProduct();
    const productId = parseInt(req.params.pid);
    const producto = products.find(products => products.id === productId)
    if(!producto){
        return res.send('USUARIO NO ENCONTRANDO');
    };
    res.send(producto);
});

app.listen(8080, ()=>{
    console.log('...');
});