const Doctor = require('../modals/Doctor');
const User = require('../modals/User');

const approvedRequest = async (req, res) => {
    const { id } = req.params;
    console.log('Received ID:', id);  // Get user ID from the route parameters

    try {
        // Step 1: Find the user who made the doctor request
        const user = await User.findByPk(id);

        // Step 2: Check if the user exists and has made a doctor request
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('user' , user);
        
        console.log('isDoctorRequested:', user.isDoctorRequested);
        if (user.isDoctorRequested !== true) {  // Check for boolean `true`
            return res.status(400).json({ message: 'User has not requested to become a doctor' });
        }

        // Step 3: Update the user's role and approval status
        user.role = 'doctor';  // Change the role to 'doctor'
        user.isDoctorApproved = true;  // Set approval status to true
        user.isDoctorRequested = false;  // Reset the doctor request flag
        await user.save();

        // Step 4: Update the doctor profile (if it already exists) or create a new one
        let doctor = await Doctor.findOne({ where: { userId: user.id } });

        if (doctor) {
            // If the doctor profile already exists, update it
            doctor.isApproved = true;
            await doctor.save();
        } else {
            // If the doctor profile does not exist, create a new one
            doctor = await Doctor.create({
                userId: user.id,
                isApproved: true,
                // Optionally, add other fields like specialization, qualifications, etc.
            });
        }

        // Step 5: Send the response with updated user and doctor details
        return res.status(200).json({
            message: 'Doctor request approved successfully',
            doctor,
            user,  // The updated user information, including role
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { approvedRequest };
