const User=require("../models/user")

module.exports.renderSignupform=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup=async(req,res)=>{
    try{
        let {username, email,password}=req.body;
        const newUser =new User({email,username});
        const registeredUser =await User.register(newUser,password)
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success","Welcome to Wanderlust!")
        res.redirect("/listings")
        });
     }
     catch(e){
req.flash("error",e.message);
res.redirect("/signup")
    }
};

module.exports.renderloginform=(req,res)=>{
    res.render("users/login.ejs")
};
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back ");
    let redirectUrl=res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl)
    };

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Logged out");
        res.redirect("listings")
    })
};