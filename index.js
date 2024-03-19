import pg from 'pg';

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory',
    password: 'root',
    port: 5432,
});

db.connect()

db.query('SELECT * FROM medicine', (err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        console.log(res.rows)
    }

    db.end()
})


