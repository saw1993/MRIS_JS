const getUsers = (req, res) => {
    res.send('This is a protected route accessible only by users with specific roles');
};

module.exports = { getUsers };