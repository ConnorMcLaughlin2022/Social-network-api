const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },
      // Get a single thought
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought found with that id' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Create a thought
      createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thought: thought._id } },
                { new: true }
              );
            })
            .then((user) =>
              !user
                ? res.status(404).json({
                    message: 'Thoughtcreated, but found no user with that ID',
                  })
                : res.json('Created the Thought 🎉')
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
          });
      },
      // update thought
      updateThought(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body },
        
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with that ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // delete thought
    deleteThought(req,res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with that ID'})
        : Thought.deleteMany({ _id: req.params.thouhtId}))
    },
}