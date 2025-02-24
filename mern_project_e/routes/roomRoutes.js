const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomapi');

router.get('/', roomController.getAllRooms);
router.get('/count', roomController.getroomscount);
router.get('/:id', roomController.getRoomById);
router.post('/', roomController.uploadRoomImages, roomController.createRoom);
router.put('/:id', roomController.uploadRoomImages, roomController.updateRoomById);
router.delete('/:id', roomController.deleteRoomById);

module.exports = router;
