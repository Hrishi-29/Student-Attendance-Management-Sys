const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "Hrishi",
    database: "college",
    password: "#Papaji05_",
});

let createRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};

let port = 8080;

app.listen(port, () => {
    console.log(`Listening...${port}`);
});

let data = [];
length1 = data.length;
for (var i = 1; i < 100; i++) {
    data.push(createRandomUser());
}
// console.log(data);

app.get("/", (req, res) => {
    let q = `INSERT INTO user(id, username, email, password) VALUES ?`;
    try {
        connection.query(q, data, (e, result) => {
            console.log(result);
        });
    } catch (e) {
        res.send("error in db");
        console.log(e);
    }
    console.log("request received...");
    res.send("Welcome to login-page");
});
