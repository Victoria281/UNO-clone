const express = require('express')
const app = express()
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;
const createHttpErrors = require('http-errors');
const ApiRouter = require('./src/controller/api');

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));



// APIs
app.use('/api', ApiRouter);

// 404 Handler
app.use((req, res, next) => {
    next(
        createHttpErrors(404, `Unknown Resource ${req.method} ${req.originalUrl}`),
    );
});

// Error Handler
app.use((error, req, res, next) => {
    console.error(error);
    return res.status(error.status || 500).json({
        error: error.message || `Unknown Error!`,
    });
});

app.get("*", (req, res) => {
    console.log(req)
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})