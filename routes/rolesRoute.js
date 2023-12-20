const express = require('express');
const router = express.Router();
const roleController = require('../controllers/rolesController');
const superAdminMiddleware = require('../middlewares/superAdmin');

router.get('/create-table-role', superAdminMiddleware.isSuperAdmin, roleController.createTableRoles);



module.exports = router;
