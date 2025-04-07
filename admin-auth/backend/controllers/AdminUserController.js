import Admin from "../models/AdminUser.js";
import bcrypt from 'bcrypt'

export const postAdmin = async (req, res) => {
    const { name, email, password, confirmPass } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ message: "Campos obrigatórios." })
    }
    if (password !== confirmPass) {
        return res.status(422).json({ message: "As senhas precisam ser iguais." })
    }
    const existAdmin = await Admin.findOne({ email: email });
    //mudar para diferente aqui depois de criar o admin
    if (existAdmin) {
        return res.status(422).json({ message: "Área restrita, somente administrador." })
    }

    const salt = await bcrypt.genSalt(12);
    const passHash = await bcrypt.hash(password, salt);
    const admin = new Admin({
        name,
        email,
        password: passHash,
    })
    try {
        await admin.save();
        res.status(201).json({ message: "Admin registrado com sucesso", admin })

    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar Admin." })
    }
}