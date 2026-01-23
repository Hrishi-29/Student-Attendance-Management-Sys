const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");

const connection = mysql.createConnection({
    host: "localhost",
    user: "Hrishi",
    database: "college",
    password: "#Papaji05_",
});

let q = " INSERT INTO user(id, username, email, password) VALUES (?, ?, ?, ?)";
let values = ["123", "adw", "asdwa@aa", "asda"];

try {
    connection.query(q, values, (e, res) => {
        if (e) throw e;
        console.log(res);
    });
} catch (e) {
    console.log(e);
}

let createRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};
