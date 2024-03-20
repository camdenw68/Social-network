const router = require('express').Router();
const { getUsers, getSingleUsers, createUser, deleteUsers, updateUsers, addFriend, deleteFriend } = require('../../controllers/userControlers');

router.route('/').get(getUsers).post(createUser);
router.route('/:usersId').get(getSingleUsers).put(updateUsers).delete(deleteUsers);
router.route('/:usersId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
