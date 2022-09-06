const ProjectRoutes = require('express').Router();
const { authorize } = require("../../middleware/auth");
const {
    getAll,
    getById,
    getByProjectTitle,
    getDate,
    create,
    update,
    remove
  } = require("./project.controller");

const upload = require("../../middleware/file");

ProjectRoutes.get("/", getAll);
ProjectRoutes.get("/:id", getById);
ProjectRoutes.get("/:projectTitle", getByProjectTitle);
ProjectRoutes.get("/date", getDate);
ProjectRoutes.post("/create", [authorize], upload.single("projectImage"), create);
ProjectRoutes.patch("/:id", [authorize], upload.single("projectImage"), update);
ProjectRoutes.delete("/:id", [authorize], remove);

module.exports = ProjectRoutes;