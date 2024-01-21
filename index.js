const express = require('express');
const Controller = require('./Controller/controller');
const router = express.Router();



router.get('/', Controller.readAllUser);
router.get('/arts/add', Controller.addNewArt);
router.post('/arts/add', Controller.submitForm);
router.get("/arts/:id", Controller.update)
router.post("/arts/:id", Controller.submitUpdate)
router.get("/arts/:id/delete.", Controller.deletedById)

// router.post('/add', Controller.addPostUser);
// router.get('/delete/:id', Controller.deleteUserById);


module.exports = router;