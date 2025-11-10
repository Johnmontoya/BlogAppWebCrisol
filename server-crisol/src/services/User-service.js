import User from "../models/User-model.js"

const registerUserService = async(userData) => {
    const user = new User(userData);
    return await user.save();
}

const getIsEmailExists = async(email) => {
    const user = await User.findOne({ email: email});
    return user;
}

const getUsers = async() => {
    const users = await User.find().select("-pasword");
    return users;
}

const getUserById = async(userId) => {
    const user = await User.findById(userId).select('-password -otp -resetPasswordToken -accountVerified');
    return user;
}

const loginEmail = async(email) => {
    const user = await User.findOne({ email: email });
    return user;
}

const updateUser = async(userId, username) => {
    const user = await User.findByIdAndUpdate(userId, {
        username: username
    }, { new: true });
    return user;    
}

const updatePass = async(pass, userId, token) => {
    const user = await User.findOneAndUpdate({
        _id: userId,
        resetPasswordToken: token
    }, {
        password: pass
    }, {
        new: true
    });
    return user;
}

const changePass = async(userId, pass) => {
    const data = await User.findByIdAndUpdate(userId, {
        password: pass
    }, {
        new: true
    });
    return data;
}

const deleteUser = async(userId) => {
    const user = await User.findByIdAndDelete(userId);
    return user;
}

export default {
    registerUserService,
    getIsEmailExists,
    getUsers,
    getUserById,
    loginEmail,
    updateUser,
    updatePass,
    changePass,
    deleteUser
}