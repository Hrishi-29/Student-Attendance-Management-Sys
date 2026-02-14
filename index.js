"Use strict";
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("__method"));
app.use(express.urlencoded({ extended: true }));
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

let createRandomId = () => {
    return [faker.string.uuid()];
};

app.get("/", (req, res) => {
    let q = "SELECT count(*) FROM user";
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            console.log(results);
            let count = results[0]["count(*)"];
            res.render("home.ejs", { count });
        });
    } catch (err) {
        console.log(err);
    }
    // res.send("Welcome to My System...");
});
// connection.end();

app.get("/user", (req, res) => {
    let q = "SELECT * FROM user";
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            res.render("show.ejs", { results });
        });
    } catch (err) {
        console.log(err);
        res.send("System Error...");
    }
    // res.send("Welcome to My System...");
});

app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            let user = results[0];
            res.render("edit.ejs", { user });
        });
    } catch (err) {
        console.log(err);
        res.send("System Error...");
    }
});

app.get("/login", (req, res) => {
    // res.send("Welcome Back...");
    res.render("login.ejs");
});

app.patch("/login/:password", (req, res) => {});
