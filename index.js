require('./model/db');
require('./model/user.model');

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const users = require('./model/user.model')
const activityData = require("./model/activity.model");
const  waterAmount = require("./model/water.model");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.listen(5000, () => {
  console.log("App listening ");
});

// Define routes for your EJS pages
app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/activities", function (req, res) {
//   res.render("activities.ejs");
// });

app.get("/diet", function (req, res) {
  res.render("diet.ejs");
});

// app.get("/tracker", function (req, res) {
//   res.render("tracker.ejs");
// });

// app.get("/watertracker", function (req, res) {
//   res.render("watertracker.ejs");
// });
app.get("/weight", function (req, res) {
  res.render("weight.ejs");
});
app.get("/calorie", function (req, res) {
  res.render("calorie.ejs");
});
app.get("/registration", function (req, res) {
  res.render("registration.ejs");
});

app.get("/login", function (req, res) {
  res.render("login.ejs", { msg: '' });
});


app.get("/index2", function (req, res) {
  res.render("index2.ejs");
});


app.post('/save', (req, res) => {
  const user = new users(req.body);
  user.save()
    .then(() => {
      res.render("login");
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/activities', async (req, res) => {

  const email = req.query.email;
  res.render("activities2", { email });

});

app.post('/saveTime', async (req, res) => {
  // const { elapsedTime, selectedActivity, bmi,  steps, distance, heartPoints, } = req.body;

  const myemail = req.body.email;
  console.log("em is " + myemail);

  try {

    const activity = new activityData({
      ...req.body,
    });

    console.log("Act are" + activity);
    await activity.save();

    res.status(201).send(activity);

  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/login", (req, res) => {
  console.log(req.body)
  var email = req.body.email;
  var password = req.body.password;
  var data = users.find({ Email: email, Password: password })
    .then((data) => {
      if (data.length != 0)
        res.render("index2", { data: data[0] });
      else {
        res.render("login", { msg: "Invalid Credential" })
      }
    })
    .catch((err) => {
      console.log("error", err)
    })

})

app.get("/profile", async (req, res) => {
  const email = req.query.email;
  console.log("email is" + email);

  try {
    const [userData, actData, waterData] = await Promise.all([
      users.findOne({ Email: email }).exec(),  // Fetch a single user document
      activityData.find({ email: email }).exec(),  // Fetch all activity documents for the email
      waterAmount.find({email: email}).exec()
    ]);

    // console.log("data is ",userData);
    console.log("mydata is " + actData);

    if (userData) {

      res.render("profile", { user: userData, myData: actData , waterDetails:waterData});
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/tracker", function (req, res) {

  const email = req.query.email;

  res.render("tracker.ejs", { email });
});


app.get("/watertracker", function (req, res) {

  const email = req.query.email;
  console.log("email is " + email);
  res.render("watertracker.ejs", { email });
});

app.post("/savewater", async(req,res)=>{

  const email = req.body.email;

  try {

    const amount = new waterAmount({
      ...req.body,
    }); 

    console.log("Act are" + amount);
    await amount.save();

    res.status(201).send(amount);

  } catch (error) {
    res.status(500).send(error);
  }
});


