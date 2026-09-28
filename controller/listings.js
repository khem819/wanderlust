const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewform = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showlisting = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        });

    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", {
        listing,
        mapToken: process.env.MAP_TOKEN
    });
};

module.exports.createlisting = async (req, res) => {
    if (!req.file) {
        throw new ExpressError(400, "A listing image is required.");
    }

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = res.locals.currUser._id;
    newListing.image = {url,filename};

    await newListing.save();

    req.flash("success", "New listing created!");
    res.redirect("/listings");
};

module.exports.editlisting = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
     
    let originalImageUrl = listing.image?.url;
    if (originalImageUrl) {
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    }
    res.render("listings/edit.ejs", { listing, originalImageUrl});
};

module.exports.updatelisting = async (req, res) => {
    const { id } = req.params;
    const updates = { ...req.body.listing };

    if (req.file) {
        updates.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    const listing = await Listing.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
    });

    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deletelisting = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};