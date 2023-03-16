const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, 
      {$set: req.body,})
      .then((user) => !user
      ? res.status(404).json({ message: 'No thought with that ID'})
      : res.json(thought)
      )
      
  },
  // delete User
  deleteUser(req,res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
    !user
    ? res.status(404).json({ message: 'No user with that ID'})
    : res.json(user))
    .catch((err) => {
        console.log
        res.status(500).json(err)}
    );
  },

  // add Friends
  addFriend(req,res) {
    console.log(req.params)
    User.findOneAndUpdate(
      {_id: req.params.userId}, 
      {$addToSet: {friends: req.params.friendId}},
      {new: true}
      )
      .then((user) => 
      !user
      ? res.status(404).json({ message: 'No user with that ID'})
      : res.json(user))
    .catch((err) => {
        console.log
        res.status(500).json(err)})
},

// delete friend
deleteFriend(req,res){
    User.findOneAndDelete(
      { _id: req.params.userId },
      { $pull: {friends: {friendId: req.params.friendId}}},
    )
      .then((user) => 
    !user
    ? res.status(404).json({ message: 'No user with that ID'})
    : res.json(user))
    .catch((err) => res.status(500).json(err)) 
}

};
