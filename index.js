const express = require('express');

const routes = require('./routes');

const app = express();

Object.entries(routes).forEach(([key, {url, handler}]) => {
   app.get(url, (request, response) => {
       console.log(`Handling ${url}`);
       handler(request, response);
   });
});

app.listen(3000);
