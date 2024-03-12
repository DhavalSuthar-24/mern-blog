import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const updateUser = async (req, res, next) => {
    const { username, email, profilepic, password } = req.body;

    if (req.user._id !== req.params.userId) {
        return next(errorHandler(401, 'You are not allowed to update this user.'));
    }

    if (password && password.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters.'));
    }

    if (username) {
        if (username.length < 5 || username.length > 17) {
            return next(errorHandler(400, 'Username must be between 5 and 17 characters.'));
        }
        if (!/^[a-z0-9_]+$/.test(username)) {
            return next(errorHandler(400, 'Username must contain only lowercase letters, numbers, or underscore.'));
        }
        if (/\s/.test(username)) {
            return next(errorHandler(400, 'Username cannot contain spaces.'));
        }
        req.body.username = username.toLowerCase(); // Convert username to lowercase
    }

    try {
        if (password) {
            req.body.password = bcryptjs.hashSync(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: username,
                email: email,
                profilepic,
                password: password,
            },
        }, { new: true });

        const { password: userPassword, ...rest } = updatedUser._doc;
        res.status(200).json({
            success: true,
            data: rest
        });
    } catch (e) {
        next(e);
    }
};
