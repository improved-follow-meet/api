import jwt from "jsonwebtoken";
import { refreshAccessToken } from "../controller/jwt.js";

export const authenticateToken = async (req, res, nextFunction ) => {
    const token = req.cookies.access;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is required.' });
    }

    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

        // Nếu token hợp lệ, gán decoded vào req.user và tiếp tục
        req.user = decoded;
        nextFunction();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            try {
                // Thử refresh token
                req.user = await refreshAccessToken(req, res);
                console.log("Refresh access token successfully");
                console.log(req.user);
                nextFunction();
            } catch (refreshError) {
                console.error(refreshError);
                return res.status(403).json({ message: "Invalid token or unable to refresh token." });
            }
        } else {
            console.error(error);
            return res.status(403).json({ message: "Invalid token." });
        }
    }
}