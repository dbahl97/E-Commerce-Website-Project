var express = require('express');
var router = express.Router();
var Product = require('../models/product');
//var csrf = require('csurf');
var Cart = require('../models/cart');
var Order = require('../models/order');

//var csrfProtection = csrf();

/* GET home page. */
router.get('/', function(req, res,) {
  var products = Product.find(function(err, docs){
    var productChunks= [];
    var chunkSize = 3;
    for(var i = 0; i <docs.length; i+= chunkSize){
productChunks.push(docs.slice(i, i + chunkSize));
    }

  res.render('shop/index', { title: 'Ekart', products: productChunks });
  });
});

/*router.get('/user/signup', function(req,res,next){
res.render('/user/signup', {});
});*/

router.get('/add-to-cart/:id',function(req,res,next){
var productId = req.params.id;
var cart = new Cart(req.session.cart ? req.session.cart : {});

Product.findById(productId, function(err, product){
if(err){
  return res.redirect('/');
}
cart.add(product, productId);
req.session.cart = cart;
//console.log(req.session.cart);
res.redirect('/');
});
});

router.get('/shopping-cart', function(req, res, next){
if(!req.session.cart){
  return res.render('shop/shopping-cart', {products: null});
}
var cart = new Cart(req.session.cart);
res.render('shop/shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice}); 
});

router.get('/checkout',function(req, res, next){
if(!req.session.cart){
  return res.redirect('shopping-cart');
}
var cart = new Cart(req.session.cart);
res.render('shop/checkout', {total: cart.totalPrice});
});

router.post('/checkout', function(req,res){
if(!req.session.cart){
  return res.redirect('shopping-cart');
}
var cart = new Cart(req.session.cart);

var order = new Order({
  name: req.body.name,
  address: req.body.address,
  phNo: req.body.number,
  totalAmount: cart.totalPrice,
  cart : cart
});

order.save(function(err,result){
  if(err){
    //req.flash('failure','error')
    console.log("error aa gaya hai koi");
  }
 //req.flash('success','order successfully placed');
 else{console.log(cart);
  req.session.cart = null;
  res.redirect('/');
}
});

});

/*router.get('admin/addProduct',function(req, res, next){
res.render('admin/addproduct', {});
});

router.post('admin/addProduct', function(req,res){

var product = new Product({
 imagePath: req.body.imagePath,
  title: req.body.title,
  description: req.body.description,
  price: req.body.price,
});
product.save(function(err,result){
  if(err){
    //req.flash('failure','error')
    console.log("error aa gaya hai koi");
  }
 //req.flash('success','order successfully placed');
 else{
  res.redirect('/adminProfile');
}
});

});*/



module.exports = router;
