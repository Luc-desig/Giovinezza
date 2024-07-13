require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
});

app.get('/map-url', (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const location = 'Giovinezza Coffee Shop,Bulevardul Iuliu Maniu 7,Bucharest,Romania';
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`;
    res.json({ mapUrl });
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: 'lucian.buftea94@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error: ' + error);
            res.status(500).send({ success: false, error: error.message });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ success: true });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
