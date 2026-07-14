const express = require('express');
const userController = require('../controllers/userController');

//User routes
const router = express.Router();
router.route('/').get(userController.getUsers).post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUserByID)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
