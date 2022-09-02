const MediaRoutes = require('express').Router();
const { authorize } = require("../../middleware/auth");
const {
    getAll,
    getById,
    create,
    update,
    remove
  } = require("./media.controller");

const upload = require("../../middleware/file");

MediaRoutes.get("/", getAll);
MediaRoutes.get("/:id", getById);
//TODO: ver como pasar mas de un documento o url:
MediaRoutes.post("/create", [authorize], upload.single("mediaImage"), create);
MediaRoutes.patch("/:id", [authorize], upload.single("mediaImage"), update);
MediaRoutes.delete("/:id", [authorize], remove);

module.exports = MediaRoutes;