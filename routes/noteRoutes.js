const express = require('express');
const noteController = require('../controllers/noteController');
const router = express.Router();

// Routes
router.get('/', noteController.note_index);
router.get('/about', noteController.note_about);
router.get('/contact', noteController.note_contact_get);
router.post('/contact', noteController.note_contact_post);
router.get('/add', noteController.note_create_get);
router.post('/add', noteController.note_create_post);
router.get('/details/:id', noteController.note_details);
router.get('/edit/:id', noteController.note_edit_get);
router.post('/edit/:id', noteController.note_edit_post);
router.get('/:id', noteController.note_delete);

module.exports = router;