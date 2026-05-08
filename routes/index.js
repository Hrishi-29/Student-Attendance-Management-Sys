const express = require('express');
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "Hrishi",
    database: "college",
    password: "#Papaji05_",
});

/* GET home page. */
router.get('/', function(req, res, next) {
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
});

module.exports = router;
