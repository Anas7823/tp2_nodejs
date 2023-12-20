const jwt = require('jsonwebtoken');
const user = require('../models/user');
// Vérifier si l'utilisateur à un role chez une marque selon son id
exports.verifRole = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;
    const id_user = req.params.id_user;
    const id_marque = req.params.id_marque;

    console.log(token); 
    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid token'
                });
            } else{
                const decodedToken = jwt.verify(token, process.env.API_KEY);
                const  userId = decodedToken.id;
               
                if (decoded.id_user == id_user && decoded.id_marque == id_marque) { 
                    const userFound = await user.findOne({
                        where: {
                            id: userId
                        }
                    });
                    console.log(userFound.newUser);
                    if (userFound.newUser) { 
                        console.log('COUCOU')
                     
                        if (Date.now() - userFound.createdAt > 24 * 60 * 60 * 1000) {
                            console.log("COUCOU2")
                            //mettre a jour newUser en
                            user.update({newUser: 0}, {
                                where: {
                                    id: userId
                                }
                            })
                            
                            res.json("erreur plus le temps")
                        }// si la date de création du compte est inférieur à 24h
                        else{
                            next()
                        }
                        
                    } 
                    else if(userFound.is_super_admin == 1){
                        next();
                    }
                    else{
                        return res.status(401).json({
                            message: 'Vous n\'êtes pas abonné à cette marque.'
                        });
                    }
                } else {
                    if (decoded.newUser - Date.now() < 24 * 60 * 60 * 1000) { // si la date de création du compte est inférieur à 24h
                        next(); // on laisse passer
                    } else {
                        return res.status(401).json({
                            message: 'Invalid token'
                        });
                    }
                }
            }
        });
    } else {
        res.status(401).json({
            message: 'Vous n\'êtes pas abonné à cette marque.'
        });
    }
}

