const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createTableUser = async (req, res) => {
    await user.sync({force: true});
    res.status(201).json({message: "table user créé"});
}

exports.createUser = async (req, res) => {
    const {pseudo, password, is_super_admin} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await user.create({
        pseudo: pseudo,
        password: hash,
        is_super_admin: is_super_admin
    });
    res.status(201).json(newUser);
}

exports.login = async (req, res) => {
    const {pseudo, password} = req.body;
    const userFound = await user.findOne({
        where: {
            pseudo: pseudo
        }
    });
    if (userFound) {
        console.log("HOLA Señorita, my còrazon, my guapa, my chiquita, my mamacita")

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (isMatch) {
            const token = jwt.sign({id: userFound.id, pseudo: userFound.pseudo}, process.env.API_KEY, {expiresIn: '1h'});
            res.status(200).json({token: token});
        } else {
            res.status(401).json({message: "Mot de passe incorrect"});
        }
    } else {
        res.status(404).json({message: "Utilisateur non trouvé"});
    }
}

exports.getAllUser = async (req, res) => {
    const allUser = await user.findAll();
    res.status(200).json(allUser);
}

exports.getUserById = async (req, res) => {
    const id = req.params.id;
    const userFound = await user.findOne({
        where: {
            id: id
        }
    });
    if (userFound) {
        res.status(200).json(userFound);
    } else {
        res.status(404).json({message: "Utilisateur non trouvé"});
    }
}