import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true // evita emails duplicados
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    accountVerified: { type: Boolean, default: false},
    avatar: {
        public_id: String,
        url: String
    },
    otp: {
        type: Number,
        default: 0
    },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;

