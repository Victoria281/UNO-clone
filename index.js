const express = require('express')
const app = express()
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//POST
app.post('/postroute', function (req, res, next) {
    const color = req.body.color;
    const values = req.body.values;
    const image_file = req.body.image_file;
    return pool.query(
        `INSERT INTO uno_cards (color, values, image_file) VALUES ($1, $2, $3)`,
        [color, values, image_file],
        function (error) {
            if (error && error.code === '23505') {
                return next(createHttpError(400, `Error`));
            } else if (error) {
                return next(error);
            }
            return res.sendStatus(201);
        },
    );
});

//GET
app.get('/get/:id', function (req, res, next) {
    const id = req.id;
    return pool.query(
        `SELECT * FROM uno_cards WHERE card_id = $1`,
        [id],
        function (error) {
            if (error && error.code === '23505') {
                return next(createHttpError(404, `Not found`));
            } else if (error) {
                return next(error);
            }
            return res.sendStatus(201);
        },
    );
});

//GETALL
app.get('/getall', function (req, res, next) {
    return pool.query(`SELECT * FROM uno_cards ORDER BY card_id;`, [], function (error, result) {
        if (error) {
            return next(error);
        }
        const cards = [];
        for (let i = 0; i < result.rows.length; i++) {
            const card = result.rows[i];
            cards.push({
                id: card.card_id,
                color: card.color,
                values: card.values,
                image_file: card.image_file,
            });
        }
        return res.json({ cards: cards });
    });
});

//PUT
app.put('/a/:moduleCode', function (req, res, next) {
    const grade = req.body.grade;
    const moduleCode = req.params.moduleCode;
    // TODO: Use Parameterized query instead of string concatenation
    return database.query(`UPDATE modules_tab SET grade = '${grade}' WHERE module_code = '${moduleCode}'`, [], function (
        error,
        result,
    ) {
        if (error) {
            return next(error);
        }
        if (result.rowCount === 0) {
            return next(createHttpError(404, `No such Module: ${moduleCode}`));
        }
        return res.sendStatus(200);
    });
});

//DELETE
app.delete('/d/:moduleCode', function (req, res, next) {
    const moduleCode = req.params.moduleCode;
    // TODO: Use Parameterized query instead of string concatenation
    return database.query(`DELETE FROM modules_tab WHERE module_code = '${moduleCode}'`, [], function (error, result) {
        if (error) {
            return next(error);
        }
        return res.sendStatus(200);
    });
});

app.listen(5000, () => {
    console.log(`App running on port 5000`)
})