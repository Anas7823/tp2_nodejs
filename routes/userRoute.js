const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middlewareAuth = require('../middlewares/auth');
const superAdminMiddleware = require('../middlewares/superAdmin');

// Route pour obtenir tous les commentaires
router.get('/create-table-user',superAdminMiddleware.isSuperAdmin, userController.createTableUser);
router.get('/get-all-user',middlewareAuth.verifAuth, userController.getAllUser);
router.get('/get-user/:id',middlewareAuth.verifAuth, userController.getUserById);

router.post('/create-user', userController.createUser);
router.post('/login', userController.login);

module.exports = router;