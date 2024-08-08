import User from "../models/User.js";

export const sendFriendRequest = async (req, res) => {
	try {
        const { fromUserId, toUserId } = req.body;

		// Find the users by their IDs
		const fromUser = await User.findById(fromUserId);
        const toUser = await User.findById(toUserId);

		if (!fromUser || !toUser) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if a friend request has already been sent
		if (toUser.friendRequests.includes(fromUserId)) {
			return res.status(400).json({ error: "Friend request already sent" });
		}

		// Add the friend request
		toUser.friendRequests.push(fromUserId);
		await toUser.save();

		res.status(200).json({ success: true, message: "Friend request sent" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

export const acceptFriendRequest = async (req, res) => {
    try {
        const { userId, fromUserId } = req.body;

        // Find the users by their IDs
        const user = await User.findById(userId);
        const fromUser = await User.findById(fromUserId);

        if (!user || !fromUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the friend request exists
        const requestIndex = user.friendRequests.indexOf(fromUserId);
        if (requestIndex === -1) {
            return res.status(400).json({ error: "Friend request not found" });
        }

        // Add each other as friends
        user.friends.push(fromUserId);
        fromUser.friends.push(userId);

        // Remove the friend request
        user.friendRequests.splice(requestIndex, 1);

        // Save the users
        await user.save();
        await fromUser.save();

        res.status(200).json({ success: true, message: "Friend request accepted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const rejectFriendRequest = async (req, res) => {
    try {
        const { userId, fromUserId } = req.body;

        // Find the users by their IDs
        const user = await User.findById(userId);
        const fromUser = await User.findById(fromUserId);

        if (!user || !fromUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the friend request exists
        const requestIndex = user.friendRequests.indexOf(fromUserId);
        if (requestIndex === -1) {
            return res.status(400).json({ error: "Friend request not found" });
        }

        // Remove the friend request
        user.friendRequests.splice(requestIndex, 1);

        // Save the user
        await user.save();

        res.status(200).json({ success: true, message: "Friend request rejected" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
