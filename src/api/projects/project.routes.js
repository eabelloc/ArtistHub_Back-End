const ProjectRoutes = require('express').Router();
const { authorize } = require("../../middleware/auth");
const {
    getAll,
    getById,
    create,
    update,
    remove
  } = require("./project.controller");

const upload = require("../../middleware/file");

ProjectRoutes.get("/", getAll);
ProjectRoutes.get("/:id", getById);
//TODO: ver como pasar mas de un documento o url:
ProjectRoutes.post("/create", [authorize], upload.single("projectImage"), create);
ProjectRoutes.patch("/:id", [authorize], upload.single("projectImage"), update);
ProjectRoutes.delete("/:id", [authorize], remove);

//TODO: como subir varios archivos con cloudinary, multer y express

module.exports = ProjectRoutes;