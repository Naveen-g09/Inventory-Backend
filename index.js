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

app.put('/update-medicine', (req, res) => {
    const { id, quantity } = req.body;
    db.query('UPDATE medicine SET quantity = $1 WHERE id = $2', [quantity, id], (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.send('Data updated successfully')
        }
    })
})

//TODO: add route to get medicine whose column of is_less is true

app.get('/get-less-medicine', (req, res) => {
    db.query('SELECT * FROM medicine WHERE is_less = true', (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.send(result.rows)
        }
    })
}
)

app.delete('/delete-medicine', (req, res) => {
    const { id } = req.body;
    db.query('DELETE FROM medicine WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.send('Data deleted successfully')
        }
    })
})



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

