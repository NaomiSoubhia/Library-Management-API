const express = require('express'); 
const app = express();

const Joi = require('joi');

console.log('Joi loaded successfully');

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
app.post('/api/books', (req, res) => {
 const result = validateBook(req.body);

    if (result.error) {
        return res.status(400).send(error.details[0].message);
    }

    const book = {
        id: books.length + 1,
        name: req.body.name
    };

    books.push(book);
    res.send(book);
});

//PUT
app.put('/api/books/:id', (req,res) => {

    //Look up to the books
    //If not existing, return 404
   const book =  books.find(b => b.id === parseInt(req.params.id));
   //404 
   if(!book) res.status(404).send('The book with the given ID was not found.');
    //Validate 
    //If invalid - return 400 - bad request
    const result = validateBook(req.body);

       if (result.error) {
        return res.status(400).send(error.details[0].message);
    }

    //Update book
    book.name = req.body.name;
    //Return updated book
    res.send(book)

});

function validateBook(book){
 const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return { error } = schema.validate(book);


}


//PORT enviroment variable 
//process global object that has properties
//if we dont have a global variable called port, it will use port 3000
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`Listening in the port ${port}`));
