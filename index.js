"Use strict";
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "Hrishi",
    database: "college",
    password: "#Papaji05_",
});

let port = 8080;

app.listen(port, () => {
    console.log(`Listening...${port}`);
});

let createRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

let q = "INSERT INTO user(id, username, email, password) VALUES ?";
let data = [];
for (let i = 1; i <= 100; i++) {
    data.push(createRandomUser());
}

// app.get("/", (req, res) => {
try {
    connection.query(q, [data], (err, result) => {
        // if (err) throw err;
        console.log(result);
        // res.render("home.ejs");
    });
} catch (err) {
    console.log(err);
}

connection.end();
