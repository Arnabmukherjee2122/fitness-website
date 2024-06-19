const mongoose = require('mongoose');

// URL-encoded password if it contains special characters
const password = encodeURIComponent('arnab@2001');

// Construct the connection string with the URL-encoded password
const uri = `mongodb+srv://aeccsearnabmukherjee2001:${password}@cluster0.kawowny.mongodb.net/fit-O-meter?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Database connected...");
})
.catch((err) => {
    console.error("Connection error", err);
});
