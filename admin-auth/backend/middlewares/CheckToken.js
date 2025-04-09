import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Acesso negado." });
    }
    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token inválido.", error });
    }
}