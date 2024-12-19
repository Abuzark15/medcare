const Doctor = require('../modals/Doctor');
const User = require('../modals/User');

const requestToBeDoctor = async (req, res) => {
    try {
        // Extract user input from the request body
        const { userId, name, email, phone, gender, specialization, qualifications, experience } = req.body;

        // Validate input
        if (!specialization || !qualifications || !experience) {
            return res.status(400).json({ message: 'Specialization, qualifications, and experience are required.' });
        }

        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has already requested to be a doctor
        if (user.isDoctorRequested) {
            return res.status(400).json({ message: 'You have already requested to be a doctor' });
        }

        // Update the user's personal information and set isDoctorRequested to true
        await User.update(
            {
                name: name || user.name,  // Update name if provided, else keep the current value
                email: email || user.email,  // Update email if provided, else keep the current value
                phone: phone || user.phone,  // Update phone if provided, else keep the current value
                gender: gender || user.gender,  // Update gender if provided, else keep the current value
                isDoctorRequested: true,  // Set isDoctorRequested to true
            },
            { where: { id: userId } }  // Only update the record with the matching userId
        );

        // Create a new Doctor record with the submitted details
        const doctor = await Doctor.create({
            userId: user.id,  // Associate the doctor with the user
            specialization,
            qualifications,
            experience,
            profilePicture: req.file ? req.file.path : null,  // Store the profile picture path if available
            isApproved: false,  // Doctor is not approved yet
        });

        return res.status(200).json({ message: 'Request to be a doctor submitted successfully', doctor });
    } catch (error) {
        console.error('Error in requestToBeDoctor:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getRequests = async (req, res) => {
    try {
        console.log("Fetching doctor requests...");

        // Fetch doctors with associated user data
        const doctorsWithUser = await Doctor.findAll({
            where: {
                isApproved: false,  // Filter only doctors who are approved
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
};  

module.exports = { requestToBeDoctor , getRequests};
