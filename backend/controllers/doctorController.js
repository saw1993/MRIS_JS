const Doctor = require('../models/doctorModel');

const getDoctors = (req, res) => {
    const user = req.user;
    res.json({
        message: 'This is a protected route (Doctor) accessible only by users with specific roles',
        user: user
    });

};

const getDoctorById = (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: 'Doctor ID is required' });
    }

    Doctor.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(results[0]);
    });
};

const createDoctor = (req, res) => {
    const data = req.body;

    // Validate input data
    if (!data.name || !data.speciality_id || !data.town_id || !data.telephone || !data.email || !data.slmc_no || !data.birthday || !data.frequency) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if speciality exists
    Doctor.checkSpecialityExists(data.speciality_id, (err, exists) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!exists) {
            return res.status(400).json({ error: 'Speciality does not exist' });
        }

        // Check if town exists
        Doctor.checkTownExists(data.town_id, (err, exists) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!exists) {
                return res.status(400).json({ error: 'Town does not exist' });
            }

            // Insert doctor if both checks pass
            Doctor.create(data, (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'Doctor created', doctorId: results.insertId });
            });
        });
    });
};


const updateDoctor = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Doctor.update(id, data, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Doctor updated' });
    });
};

const deleteDoctor = (req, res) => {
    const id = req.params.id;
    Doctor.delete(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Doctor deleted' });
    });
};


module.exports = { getDoctors, getDoctorById,createDoctor,updateDoctor,deleteDoctor };