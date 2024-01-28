const express=require ("express");
const router =express.Router();
const wrapasync=require("../utils/wrapasync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js")
const upload = multer({ storage}) //files saved in storage by multer



// / used in place of listing as we have to require wrapasync,schema for lsitings

//use router.route for common paths


//index and create route for "/" path
router.route("/")
.get(wrapasync(listingController.index))
.post(isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapasync(listingController.createListing)
  )
  


//new route before id route so new not interperted as id
  
router.get("/new",isLoggedIn,listingController.renderNewForm);

//for ":id" path for show,update and delete route
  router.route("/:id")
  .get(wrapasync(listingController.showListing))
  .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapasync(listingController.updateListing)).delete(isLoggedIn,isOwner,wrapasync(listingController.destroyListing));

  //edit route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapasync(listingController.renderEditForm));

  
  module.exports=router;