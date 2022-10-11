const {User} = require('../models');


const userController = {

    //The User functions are here as methods as the functionality

    // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
    // 
  // get one user by id
getUsersById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create new User
createUser({ body }, res) {
    User.create(body)
      .then(dbuserData => res.json(dbuserData))
      .catch(err => res.status(400).json(err));
  },


  // update user by id(PUT)
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(err => res.status(400).json(err));
  },


  // delete user
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
  



}

module.exports = userController;