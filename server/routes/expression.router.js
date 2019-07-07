const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("inside GET expressions");
    let query = `
        SELECT * FROM "expressions"
        ORDER BY "id" DESC
        LIMIT 10;
    `;

    pool.query(query)
    .then((result) => {
        console.log("result from GET expressions:", result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET expressions:', error);
        res.sendStatus(500);
    })
})

router.post('/add', (req,res) => {
    console.log("req.body in post expression:", req.body);
    let query = `
        INSERT INTO "expressions" (expression)
        VALUES ($1);
    `;

    pool.query(query, [req.body.expression])
    .then((result) => {
        console.log("result from POST expression route:", result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log("error in POST expression route:", error);
        res.sendStatus(500);
    })
})

module.exports = router;