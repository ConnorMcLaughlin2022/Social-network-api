const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);

router.route('/:userId/friends/:friendsId').post(addFriend)
router.route('/:userId/friends/:friendsId').delete(deleteFriend)

module.exports = router