const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controller/reviews.js");
 

const validateObjectIds = (req, res, next) => {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;

    if (!objectIdPattern.test(req.params.id) || (req.params.reviewId && !objectIdPattern.test(req.params.reviewId))) {
        req.flash("error", "Requested resource does not exist!");
        return res.redirect("/listings");
    }

    next();
};



// ================= Reviews ROUTE =================
//post route

router.post("/",isLoggedIn, validateObjectIds, validateReview, wrapAsync(reviewController.createReview));


//Delete reviews route
router.delete("/:reviewId" ,isLoggedIn, validateObjectIds, isReviewAuthor,
    wrapAsync(reviewController.deleteReview)
);

module.exports = router;
