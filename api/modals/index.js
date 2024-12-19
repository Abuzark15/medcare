const Patient = require('./User');
const Consultation = require('./Consultation');
const Doctor = require('./Doctor');


Patient.hasMany(Consultation, {
    foreignKey: 'patientId',
    sourceKey: 'id',
});

Consultation.belongsTo(Patient, {
    foreignKey: 'patientId',
    targetKey: 'id',
});
Consultation.belongsTo(Doctor, {
    foreignKey : 'doctorId',
    targetKey: 'id',
})
