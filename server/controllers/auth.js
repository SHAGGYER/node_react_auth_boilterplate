const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

router.get("/init", async (req, res) => {
    let installed = false;
    const admin = await User.findOne({role: 'root-admin'});
    if (admin) {
        installed = true;
    }
    const user = await User.findById(req.userId);

    res.send({user, installed});
});

router.post("/send-verification-token", async (req, res) => {
    const user = await User.findOne({email: req.body.email.toLowerCase()});

    if (!user) {
        return res.status(401).send({
            message: "This email doesn't exist in our system"
        });
    }

    const token = uuid();
    user.emailVerificationToken = token;
    await user.save();

    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const host = process.env.APP_ENV === "dev" ? process.env.DEV_HOST : process.env.PRODUCTION_HOST;

        await transporter.sendMail({
            from: '"App" <no-reply@mikol.ai>',
            to: req.body.email.toLowerCase(),
            subject: "Password Reset",
            html: `
                <span>Hello, ${user.name}</span>
                <br>
                <strong>Click on the link below to reset your password:</strong>
                <br>
                <a href="${host + "/auth/reset-password?token=" + token}">
                    Reset Password
                </a>
            `
        });

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }

});

router.post("/check-email-verification-token", async (req, res) => {
    const user = await User.findOne({emailVerificationToken: req.body.token});
    if (!user) {
        return res.status(401).send({
            message: "Wrong Code"
        })
    }

    res.send(user);
});

router.post("/reset-password", async (req, res) => {
    const user = await User.findById(req.body.userId);
    user.password = req.body.password;
    user.emailVerificationToken = null;
    await user.save();
    res.sendStatus(200);
});

router.post("/register-admin", async (req, res) => {
    const rootAdminExists = await User.findOne({role: "root-admin"});
    if (rootAdminExists) return res.sendStatus(500);

    const admin = User({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        role: "root-admin",
    });

    await admin.save();

    const token = jwt.sign({userId: admin._id, userRole: admin.role}, "app");
    res.send({token});
});

router.post("/register", async (req, res) => {
    const userExists = await User.findOne({email: req.body.email.toLowerCase()});
    if (userExists) {
        return res.status(401).send({
            message: 'Email already exists'
        })
    }

    const newUser = User({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        role: "user",
    });

    await newUser.save();

    const token = jwt.sign({userId: newUser._id}, "app");
    res.send({token});
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email.toLowerCase()}).populate("settings");
    if (!user) {
        return res.status(401).send({
            message: "Could not log you in"
        });
    }

    const passwordMatches = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatches) {
        return res.status(401).send({
            message: "Could not log you in"
        });
    }

    const token = jwt.sign({userId: user._id}, "app");
    res.send({token});

});

module.exports = router;