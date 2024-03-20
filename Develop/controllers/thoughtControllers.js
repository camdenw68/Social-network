const { Thoughts, Users } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtId });
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThoughts(req, res) {
    try {
      const thoughts = await Thoughts.create(req.body);
      const user = await Users.findOneAndUpdate(
        { _id: req.body.userId },
        {
          $push: {
            thoughts: thoughts._id
          }
        },
        { new: true }
      );
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      await Users.updateMany(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );
      res.json({ message: 'Thought has been deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with this ID' });
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const thoughts = await Thoughts.findByIdAndUpdate(
        req.body.thoughtId,
        {
          $addToSet: {
            reactions: req.body.reaction
          }
        },
        { new: true }
      );
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thoughts = await Thoughts.findByIdAndUpdate(
        req.params.thoughtId,
        {
          $pull: {
            reactions: { _id: req.params.reactionId }
          }
        },
        { new: true }
      );
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
