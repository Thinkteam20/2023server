const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(bodyParser.json());
const nodemailer = require("nodemailer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200, // for options request
    credentials: true, // Access-Control-Allow-Credentials: true
};

app.use(cors(corsOptions));
// app.use(express.urlencoded({ extended: true }));

app.post("/submit-form", upload.single("file"), async (req, res) => {
    console.log(req.file);
    // console.log(req.body.name);
    // console.log(req.body.phone); // 555-555-5555
    // console.log(req.body.email); // johndoe@example.com
    const { name, phone, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
            user: "tankteam20@outlook.com",
            pass: "mxmxMaster2s1223@",
        },
    });

    const mailOptions = {
        from: "tankteam20@outlook.com",
        to: "teamgrey10@likelion.org",
        subject: "2023PORTFOLIP JOB OFFER SANGPIL",
        text: `${name}------------${phone}------------${email}-----------${message}`,
        attachments: [
            {
                filename: req.file.originalname,
                content: req.file.buffer,
                contentType: "application/pdf",
            },
        ],
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send("Failed to send email.");
        } else {
            console.log("Email sent: " + info.response);
            res.send("Email sent successfully.");
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
