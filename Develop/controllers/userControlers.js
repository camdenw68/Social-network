const { User } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user by ID
  async getSingleUsers(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user by ID
  async deleteUsers(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user by ID
  async updateUsers(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        req.params.userId,
        { $set: req.body },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a friend from a user
  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
