const marque = require('../models/marque');
const user = require('../models/user');
const roles = require('../models/roles');

exports.createTableMarque = async (req, res) => {
    await marque.sync({force: true});
    res.status(201).json({message: "table marque créé"});
}

exports.createMarque = async (req, res) => {
    const {nom} = req.body;
    const newMarque = await marque.create({
        nom: nom
    });
    res.status(201).json(newMarque);
}

exports.getAllMarque = async (req, res) => {
    const allMarque = await marque.findAll();
    res.status(200).json(allMarque);
}

exports.getOneMarque = async (req, res) => {
    const oneMarque = await marque.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(oneMarque);
}

exports.getFollowersOfMarque = async (req, res) => {

    
    const marqueFound = await marque.findOne({
        where: {
            id: req.params.id
        }
    });
    const roleFound = await roles.findAll({
        where: {
            id_marque: marqueFound.id
        }
    });
    const tableau = [] 

    await Promise.all(roleFound.map(async (role) => {
        console.log(role.dataValues.id_user);
        const users = await user.findOne({
            where: {
                id: role.dataValues.id_user
            }
        });
        tableau.push(users);
    }));
    
    res.json(tableau);


    /*const userFound = await user.findAll({
        where: {
            id: roleFound.id_user
        }
    });
    if (userFound) {
        res.status(200).json(userFound);
    } else {
        res.status(404).json({message: "Aucun abonné trouvé"});
    }*/
}
