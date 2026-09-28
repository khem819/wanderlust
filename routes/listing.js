const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const {
    isLoggedIn,
    isOwner,
    validateListing
} = require("../middleware.js");

const listingController = require("../controller/listings.js");

const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// ================= OBJECT ID VALIDATION =================

const validateObjectId = (req, res, next) => {
    if (!req.params.id || !/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    next();
};


// ================= INDEX & CREATE =================

router.route("/")
    .get(
        wrapAsync(listingController.index)
    )
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
            validateListing,
        wrapAsync(listingController.createlisting)
    );

// ================= NEW ROUTE =================
// IMPORTANT: Put this BEFORE /:id

router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewform
);


// ================= SHOW, UPDATE & DELETE =================

router.route("/:id")
    .get(
        validateObjectId,
        wrapAsync(listingController.showlisting)
    )
    .put(
        validateObjectId,
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updatelisting)
    )
    .delete(
        validateObjectId,
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deletelisting)
    );


// ================= EDIT ROUTE =================

router.get(
    "/:id/edit",
    validateObjectId,
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editlisting)
);


module.exports = router;