import Category from "../models/Categories.js";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const imageHeroSrc = `/uploads/${req.file.filename}`;
        if (!name || !description || !imageHeroSrc) {
            return res.status(400).json({ message: "Dados inválidos." });
        }
        const category = new Category({
            name,
            description,
            imageHeroSrc,
        })
        await category.save();
        res.status(201).json({ message: "Categoria criada com sucesso", category })

    } catch (error) {
        return res.status(500).json({ message: `Erro ao postar categoria., ${error.message}.` })
    }
}