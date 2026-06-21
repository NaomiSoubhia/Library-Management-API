const Joi = require('joi');
const express = require('express'); 
const app = express();


app.use(express.json());

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
   const book =  books.find(b => b.id === parseInt(req.params.id));
   //404 
   if(!book) res.status(404).send('The book with the given ID was not found.');
   res.send(book);
});

//POST
app.post('/api/books', (req,res) =>{
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body,schema);
    console.log(result);
    if(!req.body.name || req.body.name.length < 3){
        //400 Bad Request
        res.status(400).send('Name is required and should be minimum 3 character.');
        return;
    }
 const book = {
    id: books.length + 1,
    name: req.body.name
 };

 books.push(book);
 res.send(book);
});


//PORT enviroment variable 
//process global object that has properties
//if we dont have a global variable called port, it will use port 3000
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening in the port ${port}`));
