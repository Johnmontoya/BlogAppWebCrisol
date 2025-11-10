import User from "../models/User-model.js"

const registerUserService = async(userData) => {
    const user = new User(userData);
    return await user.save();
}

const getIsEmailExists = async(email) => {
    const user = await User.findOne({ email: email});
    return user;
}

export default {
    registerUserService,
    getIsEmailExists
}