const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');

router.post("/change-email", async (req, res) => {
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) {
        return res.status(401).send({
            message: "Denne email er taget"
        });
    }

    const user = await User.findById(req.body.userId);

    user.email = req.body.email;
    await user.save();
    return res.sendStatus(200);
});

router.post("/change-password", async (req, res) => {
    const user = await User.findById(req.body.userId);

    const passwordMatches = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!passwordMatches) {
        return res.status(401).send({
            message: "Kodeord er forkert"
        });
    }

    user.password = req.body.password;
    await user.save();
    res.sendStatus(200);
});

router.post("/change-profile-image", async (req, res) => {
    const user = await User.findById(req.userId);
    if (user.imagePath) {
        const pathToOldFile = path.join(__dirname, '..', user.imagePath);

        if (fs.existsSync(pathToOldFile)) {
            fs.unlinkSync(pathToOldFile);
        }
    }

    let image = req.files.image;

    let filename = uuidv4() + '-' + image.name;
    let _path = path.join(__dirname, "..", "uploads");
    let pathFile = _path + '/' + filename;
    let url = "/uploads/" + filename;

    await image.mv(pathFile);
    user.imagePath = url;
    await user.save();

    res.send(url);
});

module.exports = router;