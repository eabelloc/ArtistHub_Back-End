const SocialMediaRoutes = require('express').Router();
const { authorize } = require("../../middleware/auth");
const {
    getAll,
    getById,
    create,
    update,
    remove
  } = require("./socialmedia.controller");

const upload = require("../../middleware/file");

SocialMediaRoutes.get("/", getAll);
SocialMediaRoutes.get("/:id", getById);
//TODO: ver como pasar mas de un documento o url:
SocialMediaRoutes.post("/create", [authorize], upload.single("website", "twitter", "linkedin"), create);
SocialMediaRoutes.patch("/:id", [authorize], upload.single("website", "twitter", "linkedin"), update);
SocialMediaRoutes.delete("/:id", [authorize], remove);

module.exports = SocialMediaRoutes;