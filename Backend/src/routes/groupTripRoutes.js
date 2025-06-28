import express from 'express';
import Group from '../models/GroupTrip.js';
import User from '../models/user.model.js';

const router = express.Router();

// Match user to groups by destination + interest
router.get('/match/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const groups = await Group.find({
    destination: { $in: user.destinations },
    interests: { $in: user.interests },
  }).populate('members');
  res.json(groups);
});

// Create group
router.post('/create', async (req, res) => {
  const { name, destination, date, interests, userId } = req.body;
  const group = new Group({ name, destination, date, interests, members: [userId] });
  await group.save();
  res.json(group);
});

// Join group
router.post('/join/:groupId', async (req, res) => {
  const { userId } = req.body;
  const group = await Group.findById(req.params.groupId);
  if (!group.members.includes(userId)) {
    group.members.push(userId);
    await group.save();
  }
  res.json(group);
});

export default router;
