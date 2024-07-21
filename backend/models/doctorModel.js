const db = require('../config/db');

const Doctor = {

       // Check if a speciality exists
    checkSpecialityExists: (speciality_id, callback) => {
        db.query('SELECT 1 FROM specialities WHERE speciality_id = ?', [speciality_id], (err, results) => {
            if (err) return callback(err);
            callback(null, results.length > 0);
        });
    },

    // Check if a town exists
    checkTownExists: (town_id, callback) => {
        db.query('SELECT 1 FROM towns WHERE town_id = ?', [town_id], (err, results) => {
            if (err) return callback(err);
            callback(null, results.length > 0);
        });
    },

    getAll: (callback) => {
        db.query('SELECT * FROM doctors', callback);
    },

    getById: (id, callback) => {
        db.query(
            'SELECT * FROM doctors d JOIN specialities s ON d.speciality_id = s.speciality_id JOIN towns t ON d.town_id = t.town_id WHERE d.doctor_id =?'
, [id], callback);
    },

    create: (data, callback) => {
        const { name, speciality_id, town_id, telephone, email, slmc_no, birthday, remarks, frequency } = data;
        const query = 'INSERT INTO doctors (name, speciality_id, town_id, telephone, email, slmc_no, birthday, remarks, frequency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [name, speciality_id, town_id, telephone, email, slmc_no, birthday, remarks, frequency];
        db.query(query, values, callback);
    }, 

    update: (id, data, callback) => {
        db.query('UPDATE doctors SET name = ?, specialization = ?, phone = ?, email = ? WHERE id = ?', 
            [data.name, data.specialization, data.phone, data.email, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM doctors WHERE id = ?', [id], callback);
    }


};

module.exports = Doctor;