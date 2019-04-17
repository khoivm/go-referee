const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/weather', (req, res) => {
   //build api URL with user zip
   const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
   //ENTER YOUR API KEY HERE (make sure to no include < >)
   const apiId = '&appid=16a039fdeaa9727b89feafc6f51e0846&units=imperial';
	
   const userLocation = (url1, url2, zipcode) => {
      let newUrl = url1 + zipcode + url2;
      return newUrl;
   };	
	
   const apiUrl = baseUrl + "6000,AU" + apiId;
	
   fetch(apiUrl)
   .then(res => res.json())
   .then(data => {
   		console.log(data);
      	res.send({ data });
   })
   .catch(err => {
      res.redirect('/error');
   });
});

module.exports = router;