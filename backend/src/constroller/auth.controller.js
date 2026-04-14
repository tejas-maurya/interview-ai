const bcrypt = require("bcryptjs");
const userModel = require("../models/user_modal.js");
const jwttoken = require("jsonwebtoken");
const token_blacklist = require("../models/blacklist.model.js");

// ================= REGISTER =================
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password"
            });
        }

        const existingUser = await userModel.findOne({
            $or: [{ name: username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Account already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name: username,   // model uses "name"
            email,
            password: hash
        });

        const token = jwttoken.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_TOKEN,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,        // ⚠️ set true in production (HTTPS)
            sameSite: "lax"
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

// ================= LOGIN =================
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwttoken.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_TOKEN,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

// ================= LOGOUT =================
async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;

        if (token) {
            await token_blacklist.create({ token });
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

// ================= GET ME =================
async function getMeController(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user: {
                id: user._id,
                username: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};