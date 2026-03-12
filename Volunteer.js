const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();


const volunteerSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    address: String,
    availability: String,
    workDays: String,
    password: String,
    govtProof: String
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

router.post("/signup", async (req, res) => {
    try {
        const newVolunteer = new Volunteer(req.body);
        await newVolunteer.save();
        res.status(201).json({ message: "Signup Successful!WELCOME TO OUR TEAM", volunteer: newVolunteer });
    } catch (error) {
        res.status(500).json({ message: " Signup Failed", error });
    }
});
router.get("/signup", async (req, res) => {
    try {
        const Volunteers = await Volunteer.find();
        res.json(Volunteers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reports" });
    }
});

module.exports=router;
