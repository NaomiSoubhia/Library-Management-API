const express = require('express'); 
const app = express();

const books = [
  { id: 1, name: 'book1' },
  { id: 2, name: 'book2' },
  { id: 3, name: 'book3' },
];

app.get('/', (req, res)=> {

    res.send('Hello World!!!');

});

//Get all books
app.get('/api/books', (req,res) =>{
res.send(books);
});

//Get a single book /api/book/id
app.get('/api/books/:id', (req, res) =>{
     res.send(req.params.id);

});


//PORT enviroment variable 
//process global object that has properties
//if we dont have a global variable called port, it will use port 3000
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening in the port ${port}`));
