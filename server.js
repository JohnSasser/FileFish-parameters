// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8000;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// handlebars;

// We need to use sessions to keep track of our user's login status
app.use(
	session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

// the password check;
app.use(passport.initialize());
app.use(passport.session());

// app.get("/", function(req, res) {
// 	// If the user already has an account send them to the members page
// 	if (req.user) {
// 		res.redirect("/members");
// 	}
//  // for handelbars, displays the login.handlebars into the body variable in the main.handlebars;
// 	res.render("login");

// 	// res.sendFile(path.join(__dirname, "../public/signup.html"));
// });

// Requiring our routes
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let routeHtml = require("./routes/handlebars-routes")(app);
// let routeApi = require("./routes/api-routes.js")(app);
app.use(routeHtml);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, function() {
		console.log(
			"==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
			PORT,
			PORT
		);
	});
});
