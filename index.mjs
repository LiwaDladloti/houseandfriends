"use strict";
import express from "express";
import bodyParser from "body-parser";
import ejs from 'ejs';
import nodemailer from "nodemailer";

const { renderFile } = ejs;

var app = express();

var port = 8000;

app.use(express.static('public'));

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', __dirname + '/views');
app.engine('html', renderFile);

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log("server running on port " + port)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.html');
});

app.post('/contact', (req, res) => {
    console.log(req.body);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dladlotil@gmail.com',//replace with your email
            pass: 'Pa55word!'//replace with your password
        }
    });

    var mailOptions = {
        from: 'dladlotil@gmail.com',//replace with your email
        to: 'dladlotil@gmail.com',//replace with your email
        subject: `Contact name: ${req.body.name}`,
        html: `<h1>Contact details</h1>
                <h2> name:${req.body.name} </h2><br>
                <h2> email:${req.body.email} </h2><br>
                <h2> message:${req.body.message} </h2><br>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error') // if error occurs send error as response to client
        }
        else {
            console.log('Email sent: ' + info.response);
            res.redirect('/')//if mail is sent successfully send Sent successfully as response
        }
        // info.redirect('/');
    });
});

