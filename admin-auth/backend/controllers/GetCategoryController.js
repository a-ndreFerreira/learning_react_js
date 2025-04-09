import Category from "../models/Categories.js";

export const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Item não foi encontrado." });
        }
        res.status(200).json(category);

    } catch (error) {
        return res.status(500).json({ message: `Erro ao buscar item, ${error.message}.` })
    }
}