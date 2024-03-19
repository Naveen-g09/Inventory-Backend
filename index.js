import pg from 'pg';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 3000;

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory',
    password: 'root',
    port: 5432,
});

db.connect()
    .then(() => {
        console.log('Connected to the database successfully')
    })
    .catch(err => {
        console.log(err.stack)
    })


app.get('/get-medicine', (req, res) => {
    db.query('SELECT * FROM medicine', (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.send(result.rows)
        }
    })
})

app.post('/post-medicine', (req, res) => {
    const { name, quantity } = req.body;
    db.query('INSERT INTO medicine (name, quantity) VALUES ($1, $2)', [name, quantity], (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.send('Data added successfully')
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

