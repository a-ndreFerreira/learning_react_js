import Admin from "../models/AdminUser.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: "Credenciais inválidas." })
    }
    const admin = await Admin.findOne({ email: email })
    if (!admin) {
        return res.status(404).json({ message: "Admin não encontrado." })
    }
    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
        return res.status(422).json({ message: "Credencial inválida." })
    }
    try {
        const secret = process.env.SECRET;
        const token = jwt.sign(
            { id: admin._id },
            secret,
            { expiresIn: '1d' }
        )
        res.status(200).json({ message: "Autenticação feita com sucesso.", token })

    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor. Tente novamente.", error })
    }
}