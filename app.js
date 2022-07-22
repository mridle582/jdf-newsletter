require("dotenv").config();

const port = 3000;

const express = require("express");
const bodyPaser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyPaser.urlencoded({
    extended: true
}));


app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

mailchimp.setConfig({
    apiKey: process.env.MAIL_CHIMP_API_KEY,
    server: process.env.MAIL_CHIMP_SERVER
});

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName
    const email = req.body.email;
    const listID = process.env.MAIL_CHIMP_LIST_ID;
    async function run() {
        const response = await mailchimp.lists.addListMember(listID, {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        });
        res.sendFile(`${__dirname}/success.html`);
        console.log(`Successfully added contact as an audience member. The contact's id is ${
            response.id}.`);
    }
    run().catch(e => res.sendFile(`${__dirname}/failure.html`));
});


app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});