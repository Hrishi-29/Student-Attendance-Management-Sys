"Use strict";
const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

app.use(connectLivereload());
app.use(express.static(path.join(__dirname, "/public")));

app.use(methodOverride("__method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "/views"));
liveReloadServer.watch(path.join(__dirname, "/public"));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// let port = 8080;

// app.listen(port, () => {
//     console.log(`Listening...${port}`);
// });

// let createRandomUser = () => {
//     return [
//         faker.string.uuid(),
//         faker.internet.username(),
//         faker.internet.email(),
//         faker.internet.password(),
//     ];
// };

// let createRandomId = () => {
//     return [faker.string.uuid()];
// };

// app.get("/", (req, res) => {
//     let q = "SELECT count(*) FROM user";
//     try {
//         connection.query(q, (err, results) => {
//             if (err) throw err;
//             console.log(results);
//             let count = results[0]["count(*)"];
//             res.render("home.ejs", { count });
//         });
//     } catch (err) {
//         console.log(err);
//     }
//     // res.send("Welcome to My System...");
// });
// // connection.end();

// app.get("/user", (req, res) => {
//     let q = "SELECT * FROM user";
//     try {
//         connection.query(q, (err, results) => {
//             if (err) throw err;
//             res.render("show.ejs", { results });
//         });
//     } catch (err) {
//         console.log(err);
//         res.send("System Error...");
//     }
//     // res.send("Welcome to My System...");
// });

// app.get("/user/:id/edit", (req, res) => {
//     let { id } = req.params;
//     let q = `SELECT * FROM user WHERE id='${id}'`;
//     try {
//         connection.query(q, (err, results) => {
//             if (err) throw err;
//             let user = results[0];
//             res.render("edit.ejs", { user });
//         });
//     } catch (err) {
//         console.log(err);
//         res.send("System Error...");
//     }
// });

// app.get("/login", (req, res) => {
//     let q = "SELECT * FROM user";
//     try {
//         connection.query(q, (err, results) => {
//             if (err) throw err;
//             // console.log(results);
//             // res.send("Welcome Back...");
//             res.render("login.ejs", { results });
//         });
//     } catch (err) {
//         console.log(err);
//         res.send("System Error...");
//     }
// });

// app.patch("/login/:username/:password", (req, res) => {
//     res.send("Fetching...");
//     console.log("Fetching...");
//     //ERROR-->
//     // let { user, formPass } = req.params;
//     // let q = `SELECT * FROM user WHERE username = '${user}'&& password = '${formPass}'`;
//     // try {
//     //     connection.query(q, (err, results) => {
//     //         if (err) throw err;
//     //         let user = results[0];
//     //         console.log(user);
//     //         // res.send(user);
//     //         // res.render("edit.ejs", { user });
//     //     });
//     // } catch (err) {
//     //     // console.log(err);
//     //     res.send("System Error...");
//     // }
//     // res.send("Welcome Back! Your Profile...");
// });

module.exports = app;
