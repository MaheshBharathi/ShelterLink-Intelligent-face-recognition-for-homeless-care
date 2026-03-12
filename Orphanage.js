const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

const nodemailer = require("nodemailer");

const orphanageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  categories: { type: String, required: true },
  capacity: { type: Number, required: true },
  services: { type: String, required: true },
  contact: { type: String, required: true },
  image: { type: String }
});

const Orphanage = mongoose.model("Orphanage", orphanageSchema);

router.post("/add", async (req, res) => {
  try {
    const newOrphanage = new Orphanage(req.body);
    await newOrphanage.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "reports@hopetech.store",
        pass: "Hopetech@123"
      }
    });

    await transporter.sendMail({
      from: "reports@hopetech.store",
      to: "reports@hopetech.store",
      subject: "New Orphanage Added",

      html: `
        <h2>New Orphanage Registered</h2>

        <p><b>Name:</b> ${req.body.name}</p>
        <p><b>Address:</b> ${req.body.address}</p>
        <p><b>Categories:</b> ${req.body.categories}</p>
        <p><b>Capacity:</b> ${req.body.capacity}</p>
        <p><b>Services:</b> ${req.body.services}</p>
        <p><b>Contact:</b> ${req.body.contact}</p>

        ${req.body.image ? `<img src="cid:orphanimage" width="200"/>` : ""}
      `,

      attachments: req.body.image
        ? [
            {
              filename: "orphanage.jpg",
              content: req.body.image.split("base64,")[1],
              encoding: "base64",
              cid: "orphanimage"
            }
          ]
        : []
    });

    res.status(201).json({
      message: "Orphanage added & email sent successfully!",
      orphanage: newOrphanage
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding orphanage",
      error
    });
  }
});

router.get("/list", async (req, res) => {
    try {
        const orphanages = await Orphanage.find();
        res.status(200).json(orphanages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orphanages", error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const orphanage = await Orphanage.findById(req.params.id);
        if (!orphanage) {
            return res.status(404).json({ message: "Orphanage not found" });
        }
        res.status(200).json(orphanage);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orphanage", error });
    }
});


router.put("/update/:id", async (req, res) => {
    try {
        const orphanageId = req.params.id;

        if (!orphanageId) {
            return res.status(400).json({ message: " Orphanage ID is required." });
        }

        const updatedOrphanage = await Orphanage.findByIdAndUpdate(
            orphanageId,
            req.body,
            { new: true, runValidators: true } 
        );

        if (!updatedOrphanage) {
            return res.status(404).json({ message: "Orphanage not found." });
        }

        res.status(200).json({ message: "orphanage updated successfully!", orphanage: updatedOrphanage });
    } catch (error) {
        res.status(500).json({ message: "Error updating orphanage", error });
    }
});



router.delete("/delete/:id", async (req, res) => {
    try {
        const orphanage = await Orphanage.findById(req.params.id);
        if (!orphanage) {
            return res.status(404).json({ message: "Orphanage not found" });
        }

        await Orphanage.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Orphanage deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting orphanage", error });
    }
});


module.exports =router;


