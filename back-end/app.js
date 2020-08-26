const express = require("express"),
    cors = require("cors"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    pLocalMongoose = require("passport-local-mongoose"),
    mongoose = require("./database/database.js");
// ================== models =======================
const Blog = require("./database/models/blog");
const User = require("./database/models/user");
// ======================================
var corsOptions = {
    origin: "http://localhost:4200",
    credentials: true,
};

// ======================================
app.use(express.json());
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(
    require("express-session")({
        secret: "congo u hacked it !",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ===========================================
// =========================== user ===========================================
app.get("/User/:id", (req, res) => {
    User.findById(req.params.id).then((user) => res.send(user));
});
app.get("/users", (req, res) => {
    User.find({}).then((users) => res.send(users));
});
app.post("/users", (req, res) => {
    User.register(
        new User({
            username: req.body.username,
            id: req.body.id,
            date: new Date(),
            blogs: [],
        }),
        req.body.password,
        function (err, user) {
            if (err) {
                console.log(err);
                return res.status(200).json({ err: err });
            } else {
                // console.log(user);
                passport.authenticate("local")(req, res, function () {
                    req.login(user, function (err) {
                        if (err) {
                            return res
                                .status(200)
                                .json({ Message: "login failed ", err: err });
                        }
                        return res
                            .status(200)
                            .json({ Message: "login succsessful", user: user });
                    });
                });
            }
        }
    );
});
app.post("/users/login", (req, res) => {
    passport.authenticate("local")(req, res, function (err, user, info) {
        if (!user) {
            return res.status(200).json({ message: err, user: user });
        }
        return res.status(200).json({ user: req.user });
    });
});
app.get("/users/logout", isvalid, (req, res) => {
    req.logout();
    res.status(200).json({ message: "logout successful" });
});
app.get("/isLoggedIn", (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({ Message: "valid", user: req.user });
    }
    return res.status(200).json({ Message: "invalid Request" });
});
// ============================ blog ===========================================
app.get("/blogs", (req, res) => {
    Blog.find({})
        .then((blogs) => res.send(blogs))
        .catch((e) => console.log(e));
});

app.post("/new", isvalid, (req, res) => {
    new Blog({
        id: req.body.id,
        author: req.body.author,
        content: req.body.content,
        date: new Date(),
        heading: req.body.heading,
        img: req.body.img,
    })
        .save()
        .then((blog) => {
            User.findOne({ username: req.user.username }, (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                    user.blogs.push(blog);
                    // console.log(user);
                    user.save().then((user) => console.log(user));
                }
            });
            console.log(blog);

            // console.log(typeof req.user.username);
        })
        .catch((e) => console.log(e));
});
app.get("/blog/:id", (req, res) => {
    Blog.findOne({ id: req.params.id })
        .then((blog) => res.send(blog))
        .catch((e) => console.log(e));
});

app.put("/blog/:id", isvalid, (req, res) => {
    console.log(req.params.id);
    Blog.findOneAndUpdate({ id: req.params.id }, { $set: req.body })
        .then((blog) => console.log(blog))
        .catch((e) => console.log(e));
});
app.delete("/blogs/:id", isvalid, (req, res) => {
    Blog.findOneAndDelete({ id: req.params.id })
        .then((blog) => {})
        .catch((e) => {
            console.log(e);
            return res
                .status(200)
                .json({ message: "delete unsuccessful", err: e });
        });
});
app.get("/blogs/user/", isvalid, (req, res) => {
    User.findById(req.user._id)
        .populate("blogs")
        .then((blog) => res.status(200).json({ blog }))
        .catch((e) => console.log(e));
});
// ============================= extra =============================================

app.get("/deleteall", (req, res) => {
    User.deleteMany({}).then((data) => {
        Blog.deleteMany({}).then((blogdata) => {
            res.send(blogdata);
        });
    });
});

// ============================= middleware ====================
function isvalid(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).json({ Message: "invalid Request nako" });
    }
}
// ============================== listen =======================
port = process.env.port || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
