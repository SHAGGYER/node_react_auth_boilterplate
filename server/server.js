require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const auth = require('./middleware/Auth');
const isUser = require('./middleware/Protected');
mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

const app = express();
app.use(bodyParser.json());
app.use(fileUpload());
app.use(auth);

app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/auth', require('./controllers/auth'));
app.use("/api/user", isUser, require("./controllers/user"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/build/index.html"));
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

