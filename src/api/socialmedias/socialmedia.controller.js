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
      if (!socialMedia) return next(setError(404, error.message | 'SocialMedia not found'));
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
    const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(id, socialMedia)
    if (!updatedSocialMedia) return next(setError(404, 'SocialMedia not found'));
    return res.status(201).json({
        message: 'Updated socialMedia',
        updatedSocialMedia
    });
}
    catch (error) {
        return next(setError(500, error.message | 'Failed updating socialMedia'));
    };
}

const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedSocialMedia = await SocialMedia.findOneAndDelete(id);
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