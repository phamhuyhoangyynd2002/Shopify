const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const request = require('request');
const nodemailer = require('nodemailer');

const app = express();
const ip = process.env.IP || '192.168.96.18';
const port = process.env.PORT || 4300;

var productsStatusUpdateHistory = [];

const transporter = nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'phamvantuyengynd99@gmail.com',
        pass: 'qnqymbnxztfglsfv'
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.post('/', function (req, res) {
    var request = require('request');
    let product = req.body.product;
    for(let variant of product.variants){
        if(variant.images.length != 0){
            let check = true;
            for(let image_product of product.images){
                let variant_images_src = variant.images[0].src;
                if(variant_images_src === image_product.src) {
                    check = false;
                    }
                }
            if(product.images.length == 0) product.images.push(variant.images[0]);
            else if(check) product.images.push(variant.images[0]);
        }
    }
    let options = {
        'method': 'POST',
        'url': 'https://test-api-tuyen.myshopify.com/admin/api/2023-01/products.json',
        'headers': {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': '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'
        },
        body: JSON.stringify({"product": product})
    };
    request(options, function (error, response) {
        if (error) {
            res.send({ "status": false, "data": error });
        }
        let body = JSON.parse(response.body);
        if (body.errors != undefined) res.send({ "status": false, "data": body.errors });
        else {
            let i = 0;
            for(let variant of product.variants){
                if(variant.images.length != 0){
                    let j = 0;
                    for(let image_product of product.images){
                        let variant_images_src = variant.images[0].src;
                        if(variant_images_src === image_product.src) {
                            let variant = {
                                "id":body.product.variants[i].id,
                                "image_id":body.product.images[j].id
                            };
                            let optionsPut = {
                                'method': 'PUT',
                                'url': 'https://test-api-tuyen.myshopify.com/admin/api/2023-01/variants/'+ body.product.variants[i].id +'.json',
                                'headers': {
                                    'Content-Type': 'application/json',
                                    'X-Shopify-Access-Token': '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'
                                },
                                body: JSON.stringify({"variant": variant})
                            };
                            request(optionsPut, function (error, Response) {
                                if (error) {
                                    res.send({ "status": false, "data": error });
                                }
                            });
                        
                        }
                        j++;
                    }
                }
                i++;
            }
            res.send({ "status": true, "data": body.product });
        }
    })
})

// get all product 
app.get('/productsstatusdraft', function (req, res) {
    let options = {
        'method': 'GET',
        'url': 'https://test-api-tuyen.myshopify.com/admin/api/2023-01/products.json?status=draft',
        'headers': {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': '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'
        },
    };
    request(options, function (error, response) {
        if (error) {
            res.send({ "status": false, "data": error });
        }
        else {
            let body = JSON.parse(response.body);
            res.send({ "status": true, "data": body.products });
            for(let product of body.products){
                let i = 0;
                for(let productHistory of productsStatusUpdateHistory){
                    if(product.id == productHistory.id){
                        productsStatusUpdateHistory.splice(i, 1);
                        break;
                    }
                    i++;
                }
            }
        }
    })
})

app.get('/productstatusupdatehistory', function (req, res) {
    res.send({ status: true, data: productsStatusUpdateHistory });
})

app.post('/updateproductsstatus', async function (req, res) {
    let option = {
        'method': 'GET',
        'url': 'https://test-api-tuyen.myshopify.com/admin/api/2023-01/products/' + req.body.id + '/metafields.json',
        'headers': {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': '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'
        },
    };
    var body;
    await request(option, function (error, responses) {
        if (error) {
            console.log(error);
            let time_active = new Date();
            let product = { id: req.body.id, time: null, time_active: time_active, title: req.body.title, handle: req.body.handle, email: null, emailed: false };
            productsStatusUpdateHistory.unshift(product);
            res.send(updateProductsStatus(req.body.id, "active"));
        }
        else {
            body = JSON.parse(responses.body);
            for (metafield of body.metafields) {
                if (metafield.key == 'email_user') {
                    let time_active = new Date();
                    let product = { id: req.body.id, time: null, time_active: time_active, title: req.body.title, handle: req.body.handle, email: metafield.value, emailed: false };
                    productsStatusUpdateHistory.unshift(product);
                    res.send(updateProductsStatus(req.body.id, "active"));
                    break;
                }
            }
        }
    });
})

app.post('/turnonschedule', async function (req, res) {
    for (product of productsStatusUpdateHistory) {
        if (product.id == req.body.id) {
            product.time = req.body.time;
            break;
        }
    }
    res.send({ status: true, data: "ok" });
})

app.post('/deleteproductstatusupdatehistory', async function (req, res) {
    let i = 0;
    for (product of productsStatusUpdateHistory) {
        if (product.id == req.body.id) {
            productsStatusUpdateHistory.splice(i, 1);
            break;
        }
        i++;
    }
    res.send({ status: true, data: "ok" });
})

cron.schedule('* * * * *', () => {
    let time = new Date();
    let products = [];
    let i = 0;
    for (let product of productsStatusUpdateHistory) {
        if (product.time != null && product.email != null && product.emailed == false) {
            let t = product.time_active;
            t.setHours(t.getHours() + product.time);
            product.point = i;
            if (t <= time) products.push(product);
        }
        i++;
    }
    products.sort((a, b) => {
        let a_email = a.email.toLowerCase(),
            b_email = b.email.toLowerCase();

        if (a_email < b_email) {
            return -1;
        }
        if (a_email > b_email) {
            return 1;
        }
        return 0;
    });
    var mainOptions = {
        from: 'J-Grab',
        to: null,
        bcc: null,
        subject: 'Active Product',
        text: 'You recieved message from ',
        html: null
    }
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        if (i == 0) {
            mainOptions.to = product.email;
            mainOptions.bcc = product.email;
            mainOptions.html =
                "<p>You have got a new message</b>"
                + "<ul>"
                + "<li>Product title:" + product.title + "</li>"
                + "<li>Product handle:" + "https://test-api-tuyen.myshopify.com/products/" + product.handle + "</li>";
        }
        else if (product.email != products[i - 1].email) {
            mainOptions.to = product.email;
            mainOptions.bcc = product.email;
            mainOptions.html =
                "<p>You have got a new message</p>"
                + "<ul>"
                + "<li>Product title:" + product.title + "</li>"
                + "<li>Product handle:" + "https://test-api-tuyen.myshopify.com/products/" + product.handle + "</li>";
        }
        else{
            mainOptions.html +=  "<li>Product title:" + product.title + "</li>"
                                +"<li>Product handle:" + "https://test-api-tuyen.myshopify.com/products/" + product.handle + "</li>";
        }
        if(i == products.length - 1){
            mainOptions.html += "</ul>";
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    for(let j = i; j>=0; j--){
                        if (products[j].email == product.email) {
                            console.log('Message sent: ' + products[j].id);
                            productsStatusUpdateHistory[products[j].point].emailed = true;
                        }
                        else break
                    }
                }
            });
            mainOptions.to = null;
            mainOptions.bcc = null;
            mainOptions.html = null;
        }
        else if (product.email != products[i + 1].email){
            mainOptions.html += "</ul>";
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    for(let j = i; j>=0; j--){
                        if (products[j].email == product.email) {
                            console.log('Message sent: ' + products[j].id);
                            productsStatusUpdateHistory[products[j].point].emailed = true;
                        }
                        else break
                    }
                }
            });
            mainOptions.to = null;
            mainOptions.bcc = null;
            mainOptions.html = null;
        }
    }
});

async function updateProductsStatus(id, status) {
    let product = {
        "id": id,
        "status": status
    }
    let option = {
        'method': 'PUT',
        'url': 'https://test-api-tuyen.myshopify.com/admin/api/2023-01/products/' + id + '.json',
        'headers': {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': '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'
        },
        body: JSON.stringify({ "product": product })
    };
    var res = { status: true, data: "ok" };
    await request(option, function (error, _responses) {
        if (error) {
            res.status = false;
            res.data = error;
        }
    });
    return res;
}


app.listen(port, ip, () => {
    console.log('PORT connected: ' + ip + ":" + port)
})
