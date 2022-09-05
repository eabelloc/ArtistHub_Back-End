const UserRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const upload = require("../../middleware/file")

const { 
    getAll, 
    getById,
    getByUsername,
    getProjectsByUsername,
    getMediasByUsername,
    register, 
    login, 
    update, 
    remove } = require("./user.controller");

UserRoutes.get('/', getAll);
UserRoutes.get('/:id', getById);
UserRoutes.get('/:username', getByUsername);
UserRoutes.get('/projects/:username', getProjectsByUsername);
UserRoutes.get('/medias/:username', getMediasByUsername);
UserRoutes.post('/register', upload.single("avatar"), register);
UserRoutes.post('/login', login);
UserRoutes.patch('/:id', [authorize], upload.single("avatar"), update);
UserRoutes.delete('/:id', [authorize], remove);

module.exports = UserRoutes;