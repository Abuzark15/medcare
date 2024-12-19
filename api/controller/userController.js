const  User  = require('../modals/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Doctor = require('../modals/Doctor');

// Register a new patient
const registerPatient = async (req, res) => {
    const { name, email, password, phone, gender } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the patient with the hashed password
        const newPatient = await User.create({ 
            name, 
            email, 
            password: hashedPassword, 
            phone, 
            gender 
        });

        // Generate a JWT token for the user
        const token = jwt.sign(
            { userId: newPatient.id }, 
            "abuzar", // Use your secret key from environment variables
            { expiresIn: '1h' }  // Token expiration time, can be adjusted
        );

        // Return the user and the token
        return res.status(201).json({
            user: newPatient, // Include the new patient data
            token, // Return the generated token
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};


// Login a patient
const loginPatient = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    
    console.log(isMatch);
    

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign({ id: user.id }, 'abuzar', { expiresIn: '1h' });
    res.json({user, token });
};

// Additional functions (if needed) can be added here...
const getDoctors = async(req, res) =>{
    try {
        console.log("Fetching doctor requests...");

        // Fetch doctors with associated user data
        const doctorsWithUser = await Doctor.findAll({
            where: {
                isApproved: true,  // Filter only doctors who are approved
            },
            include: [
                {
                    model: User,
                    required: true,  // Ensures we only get doctors with a related user
                    attributes: ['id', 'name', 'email', 'phone', 'gender', 'role'],
                },
            ],
        });

        console.log(doctorsWithUser);  // Log the result for debugging

        // If no doctors are found, return a 404 response
        if (doctorsWithUser.length === 0) {
            return res.status(404).json({ message: 'No doctor requests found.' });
        }

        // Return the data
        return res.status(200).json({ doctorsWithUser });
    } catch (error) {
        console.error("Error fetching doctor requests:", error);
        return res.status(500).json({ message: 'Error fetching doctor requests' });
    }
}
module.exports = {
    registerPatient,
    loginPatient,
    getDoctors,
};
