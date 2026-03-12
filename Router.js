const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const router = express.Router();
const reportSchema = new mongoose.Schema({
  image: String,
  location: Object,
  category: String,
  description: String,
  timestamp: { type: Date, default: Date.now }
});

const Report = mongoose.model("Report", reportSchema);

router.post("/reports", async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();

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
      to: "reports@hopetech.store", // forwarder will send to Gmail
      subject: "New Tramp Report Submitted",

      html: `
        <h2>New Report Details</h2>
        <p><b>Category:</b> ${req.body.category}</p>
        <p><b>Description:</b> ${req.body.description}</p>

        <h3>Location:</h3>
        <p>
          Pincode: ${req.body.location.pincode}<br/>
          Village: ${req.body.location.village}<br/>
          Taluk: ${req.body.location.taluk}<br/>
          District: ${req.body.location.district}<br/>
          State: ${req.body.location.state}<br/>
          Country: ${req.body.location.country}
        </p>

        <h3>Image Preview:</h3>
        <img src="cid:reportimage" width="200"/>
      `,

      attachments: [
        {
          filename: "report-image.jpg",
          content: req.body.image.split("base64,")[1],
          encoding: "base64",
          cid: "reportimage"
        }
      ]
    });

    res.status(201).json({
      message: "Report saved & email sent successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to submit report"
    });
  }
});

router.get("/reports", async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reports" });
    }
});






const axios = require("axios");

router.post("/analyze", async (req, res) => {
  try {
    const imageParts = req.body.image.split(";base64,");
    const mimeType = imageParts[0].split(":")[1];
    const base64Data = imageParts[1];

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDnCwHVStoIIJHNheN10qZXniBVvFUCLGc`,
      {
        contents: [
          {
            parts: [
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64Data
                }
              },
              {
                text: "Tell only:\nGender:\nApproximate Age:"
              }
            ]
          }
        ]
      }
    );

    const resultText =
      response.data.candidates[0].content.parts[0].text;

    res.json({ result: resultText });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;



