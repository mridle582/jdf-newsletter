const port = 3000;

const express = require("express");
const bodyPaser = require("body-parser");
const request = require ("request");

const app = express();

app.use(express.static("public"));
app.use(bodyPaser.urlencoded({
    extended: true
}));

app.get("/", (req, res)=>{
    res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
    console.log(req.body);
    var firstName = req.body.fName;
    var lastName = req.body.lName
    var email = req.body.email;
    console.log(firstName, lastName, email);
});


app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});
