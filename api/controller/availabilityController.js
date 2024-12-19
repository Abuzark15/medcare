const  Availability  = require('../modals/Availability');

// Create availability
const createAvailability = async (req, res) => {
    const { doctorId, date, startTime, endTime } = req.body;

    try {
        const availability = await Availability.create({ doctorId, date, startTime, endTime });
        res.status(201).json(availability);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get availability for a specific doctor
const getAvailabilityByDoctor = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const availability = await Availability.findAll({ where: { doctorId } });
        console.log("GDGffidbjzdfihbSDGf",availability);
        
        res.status(200).json(availability);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete availability
const deleteAvailability = async (req, res) => {
    const { id } = req.params;

    try {
        await Availability.destroy({ where: { id } });
        res.status(204).send();
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createAvailability,
    getAvailabilityByDoctor,
    deleteAvailability,
};
