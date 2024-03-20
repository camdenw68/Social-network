const { Thoughts, Users } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const Thoughts = await Course.find()
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const Thoughts = await Thoughts.findOne({ _id: req.params.thoughstId })
     

      if (!thoughts) {
        return res.status(404).json({ message: 'No message with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThoughts(req, res) {
    try {
      const thoughts = await Thoughts.create(req.body);
      const User = await User.findOneAndUpdate(req.body.userId,
        {
            $set: {
                thoughts: thoughts._id
            }
        },
         {
            new: true
        })
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteThoughts(req, res) {
    try {
      const Thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });

      if (!thoughts) {
        res.status(404).json({ message: 'No course with that ID' });
      }

     // await Users.deleteMany({ _id: { $in: thoughts.users } });
      res.json({ message: 'thoughts has been deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThoughts(req, res) {
    try {
      const thoughts = await thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
