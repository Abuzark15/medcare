const Consultation = require('../modals/Consultation');
const Doctor = require('../modals/Doctor');
const User = require('../modals/User');


const requestConsultation = async (req, res) => {
    const { patientId, doctorId, timeSlot, description, date,patientname,age,gender} = req.body;
    // Collect all uploaded image paths
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    try {
        const consultation = await Consultation.create({
            patientId,
            doctorId,
            timeSlot,
            date,
            description,
            patientname,
            age,
            gender,
            imagePath: JSON.stringify(imagePaths), // Store as a JSON string
        });

        res.status(201).json(consultation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get consultations for a specific patient
const getConsultationsByPatient = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const consultations = await Consultation.findAll({
            where: { doctorId },
            include: {
                model: User,
                attributes: [ 'name' , 'email'], 
            },
        });
        res.status(200).json(consultations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching consultations', error });
    }
};

// Update consultation status
const updateConsultationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await Consultation.update({ status }, { where: { id } });
        res.status(204).json({message : "update statsu successfully"});
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAllConsultationbypatient = async (req, res) => {
    const { patientId } = req.params; // Destructure doctorId from req.params
    try {
        const consultations = await Consultation.findAll({
            where: { patientId },
            include: [
                {
                    model: Doctor,
                    // Adjust attributes as per your Doctor model
                    include:{
                        model: User,
                    }
                },
                {
                    model: User,
                    // Assuming this is the alias for the user model
                    // Adjust attributes as needed
                },
            ],
        });
        res.status(200).json(consultations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching consultations', error });
    }
};

module.exports = {
    requestConsultation,
    getConsultationsByPatient,
    updateConsultationStatus,
    getAllConsultationbypatient,
};
