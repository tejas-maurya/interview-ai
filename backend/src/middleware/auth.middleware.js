const jwt = require("jsonwebtoken");

function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token is not provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        req.user = decoded;   // ✅ FIXED (not jwt.decode)

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = { authUser };