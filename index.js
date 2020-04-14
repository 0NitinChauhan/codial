const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const socket = require("socket.io");

// user for session cookies
const session = require("express-session");

// used for authentication
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// requires 'session' argument to store the session!
const MongoStore = require("connect-mongo")(session);

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

// expressLayouts must be incldued before we include our "routes" --> because these routes will render the views
app.use(expressLayouts);

// extract style and scripts from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", "./views");

// We will use MongoStore to store session cookie in the DB
app.use(
  session({
    name: "codial",
    // TODO - change the secret before deployment
    secret: "FoolOfATook",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // maxAge is specified in milliseconds --> 100 minutes
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        if (err) {
          console.log(`Error: ${err}`);
        } else {
          console.log("connect-mongodb setup ok!");
        }
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

const expressRouter = require("./routes"); // by default this "requires" index.js
app.use("/", expressRouter); // any request that comes in goes to our expressRouter

const server = app.listen(port, function (err) {
  if (err) {
    console.log(`Error running the server: ${err}`);
  } else {
    console.log(`Server running successfully on port: ${port}`);
  }
});

const io = socket(server);

io.on("connection", function (socket) {
  // each connection has its own socket which we receive in the function
  console.log("Made socket connection", socket.id);

  // listen to chat message
  socket.on("chat-message", function (data) {
    // emit data to all sockets connected to the server (including the one that sent it)
    console.log("received data", data);
    io.sockets.emit("chat-message", data);
  });

  // listen to typing message & broadcast to all sockets except the one who sent it
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
