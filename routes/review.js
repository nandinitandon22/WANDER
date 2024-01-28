const express=require ("express");
const router =express.Router({mergeParams:true});
const wrapasync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/expresserr.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js")

const reviewController =require("../controllers/review.js")
const review=require("../models/review.js");


//reviews post route
router.post("/",isLoggedIn, validateReview,wrapasync(reviewController.createreview));
  
  //delete review post route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapasync(reviewController.destroyreview));
  
  module.exports=router;