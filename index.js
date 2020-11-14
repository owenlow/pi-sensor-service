const express = require('express');

const {getRoutes, putRoutes} = require('./routes');

const app = express();

Object.entries(getRoutes).forEach(([, { url, handler }]) => {
   app.get(url, (request, response) => {
       console.log(`get ${url}`);
       handler(request, response);
   });
});

Object.entries(putRoutes).forEach(([, { url, handler }]) => {
    app.put(url, (request, response) => {
        console.log(`put ${url}`);
        handler(request, response);
    })
})

app.listen(3000);
