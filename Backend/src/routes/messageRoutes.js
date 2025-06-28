import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

router.get('/:groupId', async (req, res) => {
  const messages = await Message.find({ group: req.params.groupId }).populate('sender');
  res.json(messages);
});

export default router;
