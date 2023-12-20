const roles = require('../models/roles');

exports.createTableRoles = async (req, res) => {
    await roles.sync({force: true});
    res.status(201).json({message: "table roles créé"});
}
