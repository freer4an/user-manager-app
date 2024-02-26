const { Router } = require('express');
const authenticate = require('../middleware/auth')
const tableController = require('../controllers/tableController')

const router = Router();

router.get("/users/:id", authenticate, tableController.getUsers)
router.patch("/users/block", authenticate, tableController.blockUser)
router.patch("/users/unblock", authenticate, tableController.unblockUser)
router.delete("/users/delete", authenticate, tableController.deleteUser)

module.exports = router