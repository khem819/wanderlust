if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// ===========most important ==========

const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");

const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


// ================= DATABASE =================

const dburl = process.env.ATLASDB_URL;


if (!dburl) {
    throw new Error("ATLASDB_URL is not defined");
}

async function main() {
    await mongoose.connect(dburl);
}

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });


// ================= VIEW ENGINE =================

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);


// ================= MIDDLEWARE =================

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(
    express.static(path.join(__dirname, "public"))
);


// ================= SESSION =================

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not defined");
}

const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("Error in Mongo session store:", err);
});

app.use(
    session({
        store: store,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// ================= FLASH =================

app.use(flash());


// ================= PASSPORT =================

app.use(passport.initialize());

app.use(passport.session());

passport.use(
    new LocalStrategy(User.authenticate())
);

passport.serializeUser(
    User.serializeUser()
);

passport.deserializeUser(
    User.deserializeUser()
);


// ================= GLOBAL LOCALS =================

app.use((req, res, next) => {

    res.locals.success = req.flash("success");

    res.locals.error = req.flash("error");

    res.locals.currUser = req.user;

    next();
});


// ================= ROUTES =================

app.use(
    "/listings",
    listingsRouter
);

app.use(
    "/listings/:id/reviews",
    reviewRouter
);

app.use(
    "/",
    userRouter
);


// ================= 404 =================

app.all("/{*splat}", (req, res, next) => {

    next(
        new ExpressError(
            404,
            "Page Not Found"
        )
    );

});


// ================= ERROR HANDLER =================

app.use((err, req, res, next) => {

    const {
        statusCode = 500,
        message = "Something went wrong"
    } = err;

    res.status(statusCode).send(message);

});


// ================= SERVER =================

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

    console.log(
        `Server is listening on port ${PORT}`
    );

});