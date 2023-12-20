const express = require('express');
const router = express.Router();
const marqueController = require('../controllers/marqueController');
const followMiddleware = require('../middlewares/followed');
const superAdminMiddleware = require('../middlewares/superAdmin');
const middlewareAuth = require('../middlewares/auth');

// Route pour obtenir tous les commentaires
router.get('/create-table-marque', superAdminMiddleware.isSuperAdmin, marqueController.createTableMarque);
router.post('/create-marque', superAdminMiddleware.isSuperAdmin, marqueController.createMarque);
router.get('/get-all-marque',middlewareAuth.verifAuth, marqueController.getAllMarque);
router.get('/get-one-marque/:id',middlewareAuth.verifAuth, followMiddleware.verifRole, marqueController.getOneMarque);
//router.get('/get-followed-marque/:id',middlewareAuth.verifAuth, marqueController.getFollowersOfMarque);
router.get('/get-followed-marque/:id', marqueController.getFollowersOfMarque);


module.exports = router;
