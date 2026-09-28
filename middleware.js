const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        return res.redirect("/login");
    }
    next();
};

module.exports.savedRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing || !listing.owner || !listing.owner.equals(req.user._id)) {
        req.flash("error", "Permission not allowed to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports. validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body, { abortEarly: false });

    if(error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body, { abortEarly: false });

    if(error) {
        let errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review || !review.author || !review.author.equals(req.user._id)) {
        req.flash("error", "Permission not allowed to edit");
        return res.redirect(`/listings/${id}`);
    }

    next();
};