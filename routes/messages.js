import express from 'express';
import {
    createMessage,
    updateMessage,
    deleteMessage,
    findMessage,
    findAllMessages,
    getMessageCounts,
    trainMessageModel
} from '../controllers/messageController.js';

const router = express.Router();

// Route to train the model
router.post('/train', trainMessageModel);

// Route to create a new chatbot message
router.post('/message', createMessage);

// Route to update a chatbot message
router.put('/message/:id', updateMessage);

// Route to delete a chatbot message
router.delete('/message/:id', deleteMessage);

// Route to find a specific chatbot message
router.get('/message/:id', findMessage);

// Route to find all chatbot messages with pagination
router.get('/messages', findAllMessages);

// Route to get the count of messages
router.get('/messages/count', getMessageCounts);

export default router;
