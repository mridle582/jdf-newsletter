const port = 3000;

const express = require("express");
const bodyPaser = require("body-parser");
const request = require ("request");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.sendFile(`${__dirname}/signup.html`);
});


app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});
