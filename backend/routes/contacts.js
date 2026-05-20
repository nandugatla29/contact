const express = require('express');
const router = express.Router();
const authmiddleware = require('../middleware/authMiddleware');
const {
    getContacts,
    addContact,
    deleteContact
} = require('../controllers/contactController');

router.get('/', authmiddleware, getContacts);
router.post('/', authmiddleware, addContact);
router.delete('/:id', authmiddleware, deleteContact);

module.exports = router;