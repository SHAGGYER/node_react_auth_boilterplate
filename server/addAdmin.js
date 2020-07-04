require("dotenv").config();
const mongoose = require('mongoose');
const User = require('./models/User');

(async function () {
    mongoose.connect(process.env.MONGODB_KEY, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

    const admin = User({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'root-admin'
    })

    await admin.save();
    console.log('Admin created successfully');
    process.exit();
})()