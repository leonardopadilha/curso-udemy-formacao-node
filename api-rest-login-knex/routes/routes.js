const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UsersController");
const AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/user', UserController.create)
router.get('/user', AdminAuth, UserController.index)
router.get('/user/:id', AdminAuth, UserController.userById)
router.put('/user', AdminAuth, UserController.edit)
router.delete('/user/:id', AdminAuth, UserController.remove)
router.post('/recoverypassword', UserController.recoverPassword)
router.post('/changepassword', UserController.changePassword)
router.post('/login', UserController.login)

module.exports = router;