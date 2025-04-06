import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const postUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ message: "Os campos nome, email e senha são obrigatórios." })
    }
    if (password !== confirmPassword) {
        return res.status(422).json({ message: "As senhas precisam ser iguais." })
    }
    const existUser = await User.findOne({ email: email })
    if (existUser) {
        return res.status(422).json({ message: "Por favor utilize outro email." })
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
        name,
        email,
        password: passwordHash
    })
    try {
        await user.save();
        res.status(201).json({ message: "Usuário criado com sucesso.", user });

    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar usuário, tente novamente.", error });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: "Os campos email e senha são obrigatórios." })
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." })
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(422).json({ message: "Senha inválida." })
    }
    try {
        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user._id
            },
            secret
        )
        res.status(200).json({ message: "Autenticação feita com sucesso.", token })

    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor. Tente novamente." })
    }
}

export const privateRoute = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id, '-password');
    if (!user) {
        return res.status(404).json({ message: "Usiário não encontrado." })
    }
    res.status(200).json({ user });
}

export const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Acesso negado." });
    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();

    } catch (error) {
        return res.status(400).json({ message: "Token inválido." });
    }
}