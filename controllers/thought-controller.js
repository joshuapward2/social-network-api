const {Thoughts, User} = require('../models');


const thoughtsController = {
    // add Thoughts to User

// get all users
getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
    // 
  // get one user by id
getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No User/thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

    addThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbThoughtsData => {
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No User/thoughts found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
      },
      addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
          { _id: params.reactionsId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
          .then(dbThoughtsData => {
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No User/thoughts thoughts found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
      },

      // update thoughts by id(PUT)
updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No User/thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.status(400).json(err));
  },

      // remove thoughts
  removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtsid })
      .then(deletedThought => {
        if (!deletedThought) {
          throw { message: 'No Thoughts with this id!', status: 404};
        }
    return deletedThought;

        // return User.findOneAndUpdate(
        //   { _id: params.userId },
        //   { $pull: { thoughts: params.thoughtsid } },
        //   { new: true }
        // );
      })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No User thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => {
        if(err.status) {
          res.status(err.status).json(err)

        }
        else{
          res.status(500).json(err)
        }
       
      });

  }, // remove reactions
  removeReation({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.reactionsId },
      { $pull: { reactions: { reactionId: params.reactionsId } } },
      { new: true }
    )
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtsController;