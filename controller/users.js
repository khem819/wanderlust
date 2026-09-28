const User = require("../models/user.js");

module.exports.rendersignup = (req, res) => {
    res.render("users/signup.ejs");
}


module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        // Create new user
        const newUser = new User({
            username,
            email
        });

        // Register user with passport-local-mongoose
        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        // Automatically log in the newly registered user
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}


module.exports.renderlogin = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = (req, res) => {
        const redirectUrl = res.locals.redirectUrl || req.session.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        req.flash("success", "Welcome back to Wanderlust!");
        res.redirect(redirectUrl);
    }

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};
