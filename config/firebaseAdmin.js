let firebase = require('firebase-admin');
require('dotenv').config();

module.exports = function(){

    if(process.env.NODE_ENV == 'production')
    {
        firebase.initializeApp();
    }
    else{
        firebase.initializeApp({
            credential: firebase.credential.cert(JSON.parse(process.env.GCLOUD_SERVICE_KEY))
        });
    }

    console.log('====> Connected to Firebase.');
}