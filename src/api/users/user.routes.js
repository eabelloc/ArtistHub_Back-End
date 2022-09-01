const UserRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const upload = require("../../middleware/file")

const { 
    getAll, 
    getById,
    register, 
    login, 
    update, 
    remove } = require("./user.controller");

UserRoutes.get('/', getAll);
UserRoutes.get('/:id', getById);
UserRoutes.post('/register', upload.single("avatar"), register);
UserRoutes.post('/login', login);
UserRoutes.patch('/:id', [authorize], upload.single("avatar"), update);
UserRoutes.delete('/:id', [authorize], remove);

module.exports = UserRoutes;