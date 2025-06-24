// import GroupTrip from '../models/GroupTrip.js';
// import User from '../models/user.model.js';

// export const createGroupTrip = async (req, res) => {
//   try {
//     const { tripName, destination, startDate, endDate, description, memberEmails } = req.body;
//     const creatorId = req.user.id;

//     const memberDocs = await User.find({ email: { $in: memberEmails } });
//     const memberIds = memberDocs.map(user => user._id);

//     const newTrip = await GroupTrip.create({
//       tripName,
//       destination,
//       startDate,
//       endDate,
//       description,
//       createdBy: creatorId,
//       members: [creatorId, ...memberIds]
//     });

//     res.status(201).json(newTrip);
//   } catch (err) {
//     console.error('Create trip error:', err.message);
//     res.status(500).json({ error: 'Failed to create group trip.' });
//   }
// };

// export const getUserGroupTrips = async (req, res) => {
//   try {
//     const trips = await GroupTrip.find({ members: req.user.id })
//       .populate('createdBy', 'name email')
//       .populate('members', 'name email');
//     res.json(trips);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: 'Error fetching group trips' });
//   }
// };
