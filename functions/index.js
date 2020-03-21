const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
app.use(cors({origin: true}));
app.get('/',(req,res)=> {
    // res.set('Cache-Control','public, max-age=300, s-maxage=600');
    res.send("Root directory accessed.");
})

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