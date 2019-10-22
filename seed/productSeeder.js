var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/shopping");

var products = [new Product({
    imagePath:'https://images-na.ssl-images-amazon.com/images/I/81Bo%2BS08twL._SX425_.jpg',
    title:'FIFA 19 Video Game',
    description: "FIFA 19 is a football simulation video game developed by EA Vancouver and EA Bucharest,as part of Electronic Arts' FIFA series",
    price: 1000
}),
new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/81v5wp2zeQL.jpg',
    title: 'All the Light We Cannot See Book ',
    description: "All the Light We Cannot See is a novel written by American author Anthony Doerr, published by Scribner on May 6, 2014",
    price: 300
}),
new Product({
    imagePath: 'https://store.storeimages.cdn-apple.com/4981/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone7/rosegold/iphone7-rosegold-select-2016?wid=470&hei=556&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1472430205982',
    title: 'Iphone 7 Phone',
    description: "iPhone 7 and iPhone 7 Plus are smartphones designed, developed, and marketed by Apple Inc. It is the tenth generation of the iPhone.",
    price: 50000
}),
new Product({
    imagePath: 'https://store.storeimages.cdn-apple.com/4981/as-images.apple.com/is/image/AppleInc/aos/published/images/r/fb/rfb/ipad/rfb-ipad-pro10in-spacegray-wifi-2017?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1513118526233',
    title: 'Ipad Pro',
    description: "The iPad Pro family is a line of iPad tablet computers designed, developed, and marketed by Apple Inc.",
    price: 20000
}),
new Product({
    imagePath: 'https://dtpmhvbsmffsz.cloudfront.net/posts/2015/10/11/561ace9c78b31c03320032f8/m_561ace9c78b31c03320032f9.jpg',
    title: 'Clark Shoes',
    description: "Clark shoes are the best, it is considered to be a luxury brand",
    price: 4999
})
];

var done = 0;
for(var i=0;i<products.length;i++){
products[i].save(function(err,result){
    done++;
    if(done == products.length){
    exit();}
});
}

function exit()
{
    mongoose.disconnect();
}
