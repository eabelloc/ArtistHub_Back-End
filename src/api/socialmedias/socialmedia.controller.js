const SocialMedia = require("./socialmedia.model");
const { setError } = require("../../helpers/utils/error");
const { deleteFile } = require("../../middleware/delete-file");
//create, remove, update, getAll, getById

const getAll = async (req, res, next) => {
    try {
      const socialMedias = await SocialMedia.find()
      return res.status(200).json({
        message: 'All socialmedias',
        socialMedias
      })
    } catch (error) {
      return next(setError(500, error.message | 'Failed recover all socialMedias'));
    }
  }

const getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const socialMedia = await (await SocialMedia.findById(id));
      if (!socialmedia) return next(setError(404, error.message | 'SocialMedia not found'));
      return res.status(200).json({
        message: 'socialmedia by Id',
        socialMedia
      })
  
    } catch (error) {
      return next(setError(500, error.message | 'Failed social socialMedias id'));
    }
}

//TODO: VER SI ESTO FUNCIO (ES PROBABLE QUE DE ERRORES xD)
const create = async (req, res, next) => {
    try {
      const newSocialMedia = new SocialMedia(req.body);
      const socialMediaExist = await SocialMedia.findOne({
        socialMedia: newSocialMedia.socialMedia,
      })
      if (socialMediaExist) {
        return next(setError(409, 'SocialMedia already exists'))
      }
      else if (req.url) {
        newSocialMedia.website = req.url.path;
      }
      const socialMediaInDb = await newSocialMedia.save();
      res.status(201).json(socialMediaInDb);
    } catch (error) {
        return next(setError(500, 'Failed creating social socialMedia'))
    };
}
//TODO: VER SI FUNCINA
const update = async (req, res, next) => {
    try{
    const { id } = req.params;
    const socialMedia = new SocialMedia(req.body);
    socialMedia._id = id;
    if (req.url) {
        socialMedia.website = req.url.path;
      }
      else if (req.url) {
        socialMedia.twitter = req.url.path;
      }
      else if (req.url) {
        socialMedia.linkedin = req.url.path;
      }
    const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(id, socialMedia)
    if (!updatedSocialMedia) return next(setError(404, 'SocialMedia not found'));
    return res.satus(201).json({
        message: 'Updated socialMedia',
        updatedSocialMedia
    });
}
    catch (error) {
        return next(setError(500, error.message || 'Failed updating socialMedia'));
    };
}

const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedSocialMedia = await SocialMedia.findOneAndDelete(id);
      if (deletedSocialMedia.website) {
        deleteFile(deletedSocialMedia.website);
      }
      else if (deletedSocialMedia.twitter) {
        deleteFile(deletedSocialMedia.twitter);
      }
      else if (deletedSocialMedia.linkedin) {
        deleteUrl(deletedSocialMedia.linkedin);
      }
      if (!deletedSocialMedia) {
        return next(setError(404, "SocialMedia not found"));
      }
      return res.status(200).json({
        message: "User deleted",
        deletedSocialMedia,
      });
    } catch (error) {
      return next(setError(500, error.message || "Failed deleting SocialMedia"));
    }
  };

  module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
  }