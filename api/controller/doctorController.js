// controllers/doctorController.js
const Doctor = require('../modals/Doctor'); // Ensure the correct path to the model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../modals/User')

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Use your email service
    port: 587,
    secure: false,
    auth: {
        user: "shoyabkhan.smartdata@gmail.com", // Your email
        pass: "qylw xmjf xwdq wtnb", // Your email password
    },
});

// Send verification email
const sendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    const token = crypto.randomBytes(32).toString('hex');
    
    // Save token in database or associated with doctor
    const existingDoctor = await Doctor.findOne({ where: { email } });
    if (existingDoctor) {
        return res.status(400).send('Email already exists');
    }

    // Create a new doctor record with the email and verification token
    await Doctor.create({
        email,
        verificationToken: token,
        verified: false, // Initially unverified
    });


    const verificationLink = `http://localhost:5173/register-doctor?token=${token}&email=${email}`;
    
    const mailOptions = {
        from: 'shoyabkhan.smartdata@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `<p>Please verify your email by clicking on the link: <a href="${verificationLink}">Verify Email</a></p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error, "hfhgf");
            return res.status(500).send(error.toString());
            
            
        }
        res.status(200).send('Verification email sent');
    });
};

// Verify email
const verifyEmail = async (req, res) => {
    const { token, email } = req.query;

    const doctor = await Doctor.findOne({ where: { email, verificationToken: token } });
    if (!doctor) {
        return res.status(400).send('Invalid token or email');
    }

    await Doctor.update({ verified: true, verificationToken: null }, { where: { email } });
    res.send('Email verified successfully');
};  

// Register a new doctor
const registerDoctor = async (req, res) => {
    const { name, specialization, email, password } = req.body;
    const profilePhoto = req.file.path; // Ensure image is uploaded

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const newDoctor = await Doctor.update({
            name,
            specialization,
            email,
            password: hashedPassword,
            profilePhoto,
            verified: true, // Mark as verified since email is verified
        }, { where: { email } }); // Send verification email

        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login a doctor
const loginDoctor = async (req, res) => {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ where: { email } });

    if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found.' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign({ id: doctor.id }, 'abuzar', { expiresIn: '1h' });
    res.json({ doctor, token });
};

// Get all doctors
const getalldoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" });
    }
};
const getdoctorbyid = async (req, res) => {
    const {id} = req.params;
    try {
        const doctor = await Doctor.findOne({where: {id},
            include: [
                {
                    model: User,

                },
            ],});
        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" });
    }
};

module.exports = {
    registerDoctor,
    loginDoctor,
    getalldoctors,
    sendVerificationEmail,
    verifyEmail,
    getdoctorbyid,
};
