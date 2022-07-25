const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express()
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

// midlewire 
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wqxy0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const bookCollection = client.db('book_stock').collection('books');

        console.log('server side running')
        

        app.get('/book', async(req,res) =>{
            const query = {}
            const cursor = bookCollection.find(query);
            const books = await cursor.toArray();
            res.send(books);
        });
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('book stock server side are running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})