const express = require('express'); 
const app = express();

app.get('/', (req, res)=> {

    res.send('Hello World!!!');

});

app.get('/api/book', (req,res) =>{
res.send([1,2,3]);
});

//PORT enviroment variable 
//process global object that has properties
//if we dont have a global variable called port, it will use port 3000
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening in the port ${port}`));
