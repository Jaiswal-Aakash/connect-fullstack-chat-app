import jwt from 'jsonwebtoken';
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWt_SECRET, {
        expiresIn: '7d'
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development'
    });
    return token;
}