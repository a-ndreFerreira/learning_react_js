import Admin from "../models/AdminUser.js";

export const privateRoute = async (req, res) => {
    const id = req.params.id;
    const admin = await Admin.findById(id, '-password');
    if (!admin) {
        return res.status(404).json({ message: "Usuário não encontrado." })
    }
    res.status(200).json(admin);
}