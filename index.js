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

//TODO: Connect to the database and create REST APIS to do CRUD operations on the medicine table

//TODO: Fetch medicine data from the database route
//TODO: Insert medicine data into the database route from the frontend
//TODO: Update medicine data in the database route from the frontend
//TODO: Delete medicine data from the database route from the frontend
//TODO: Fetch the medicine data by id from the database route from the frontend or by the type of medicine
//TODO: Fetch the medicine data from search keyword from the database route from the frontend
// my  database name is inventory and table name is medicine and the columns are id, name, type, quantity, limit quantity, is_low
//TODO: create a new route which will return all the medicines which are low in quantity is low is gonna be decided by the limit quantity



db.connect()
    .then(() => {
        console.log('Connected to the database successfully')
    })
    .catch(err => {
        console.log(err.stack)
    })


app.get('/medicines', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM medicine')
        res.json(result.rows)
    } catch (err) {
        console.log(err.stack)
    }
}
)

app.post('/medicines', async (req, res) => {
    const { id, name, type, quantity, limit_quantity, is_low } = req.body
    try {
        const result = await db.query('INSERT INTO medicine (name, type, quantity, limit_quantity, is_low) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, type, quantity, limit_quantity, is_low])
        res.json(result.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
}
)

app.put('/medicines/:id', async (req, res) => {
    const { id } = req.params
    const { name, type, quantity, limit_quantity, is_low } = req.body
    try {
        const result = await db.query('UPDATE medicine SET name = $1, type = $2, quantity = $3, limit_quantity = $4, is_low = $5 WHERE id = $6 RETURNING *', [name, type, quantity, limit_quantity, is_low, id])
        res.json(result.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
})

app.delete('/medicines/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await db.query('DELETE FROM medicine WHERE id = $1', [id])
        res.json({ message: 'Deleted successfully' })
    } catch (err) {
        console.log(err.stack)
    }
})

app.get('/medicines/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await db.query('SELECT * FROM medicine WHERE id = $1', [id])
        res.json(result.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
})

app.get('/medicines/search/:keyword', async (req, res) => {
    const { keyword } = req.params
    try {
        const result = await db.query('SELECT * FROM medicine WHERE name ILIKE $1', [`%${keyword}%`])
        res.json(result.rows)
    } catch (err) {
        console.log(err.stack)
    }
})

app.get('/medicines/low', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM medicine WHERE quantity <= limit_quantity')
        res.json(result.rows)
    } catch (err) {
        console.log(err.stack)
    }
})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

