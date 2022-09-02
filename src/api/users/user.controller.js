const User = require('./user.model');

const bcrypt = require("bcrypt");
const { createToken } = require("../../helpers/utils/token-action");
const { setError } = require("../../helpers/utils/error");
const { deleteFile } = require('../../middleware/delete-file');

const getAll = async (req, res, next) => {
    try {
        const users = await User.find().populate("projects medias socialMedia");
        return res.status(200).json({
            message: 'All Users',
            users
        })
    } catch (error) {
        return next(setError(500, error.message | 'Failed recover all users'));
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("projects medias socialmedias");
        if (!user) return next(setError(404, "User not found"));
        return res.status(200).json(user);
    } catch (error) {
        return next(setError(500, error.message || 'Failed recover User'));
        }
};

const register = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const usernameExist = await User.findOne({ username: newUser.username });
        if (usernameExist) return next(setError(409, "This username already exist"));
        if(req.file) {
            newUser.avatar = req.file.path
        }
        const userInDb = await newUser.save();
        res.status(201).json(userInDb);
    } catch (error) {
        return next(setError(500, error.message || 'Failed create User'));
    }
};

const login = async (req, res, next) => {
    try {
      const userInDb = await User.findOne({ username: req.body.username });
      if (!userInDb) return next(setError(404, "User not found"));
      if (bcrypt.compareSync(req.body.password, userInDb.password)) {
        const token = createToken(userInDb._id, userInDb.username);
        return res.status(200).json({ userInDb, token })
      } else {
        return next(setError(401, "Invalid Password"));
      }
    } catch (error) {
      return next(setError(500, error.message || 'Unexpected error at login'));
    }
}

const update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = new User(req.body);
      user._id = id;
      if(req.file) {
        user.avatar = req.file.path
      }
      const updatedUser = await User.findByIdAndUpdate(id, user);
      if (!updatedUser) return next(setError(404, 'User not found'));
      return res.status(201).json({
        message: 'Updated User',
        updatedUser
      })
  
    } catch (error) {
      return next(setError(500, error.message | 'Failed updated user'));
    }
  }

const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (deletedUser.avatar) {
        deleteFile(deletedUser.avatar)
      }
      if (!deletedUser) return next(setError(404, 'User not found'));
      return res.status(200).json({
        message: 'Delete User',
        deletedUser
      })
    } catch (error) {
      return next(setError(500, error.message || 'Failed deleted user'));
    }
  }

  module.exports = { 
    getAll, 
    getById,
    register, 
    login, 
    update, 
    remove };