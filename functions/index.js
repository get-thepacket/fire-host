const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
var route = require(path.join(__dirname,'routes/index'));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
app.use(cors({origin: true}));

app.set('view engine','hbs');

app.engine('hbs', hbs({
    extname : 'hbs',
    defaultView: 'default',
    layoutsDir : __dirname + '/views/layouts/',
    partialsDir : __dirname + '/views/partials/'
}));

app.use('/static',express.static(path.join(__dirname,'static')));
app.use('/route',route);

app.get('/',(req,res)=> {
    // res.set('Cache-Control','public, max-age=300, s-maxage=600');
    res.send("Root directory accessed.");
});


const api = functions.https.onRequest((req,res)=> {
    if(!req.path){
        req.url  = `/${req.url}`;
    }
    return app(req,res);
});

admin.initializeApp();

module.exports={
    api
}