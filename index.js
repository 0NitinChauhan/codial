const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(express.static("./assets"));

// expressLayouts must be incldued before we include our "routes" --> because these routes will render the views
app.use(expressLayouts);

// extract style and scripts from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);



const expressRouter = require("./routes");  // by default this "requires" index.js

app.use("/", expressRouter); // any request that comes in goes to our expressRouter
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
    if (err) {
        console.log(`Error running the server: ${err}`);
    }
    else {
        console.log(`Server running successfully on port: ${port}`)
    }
});

