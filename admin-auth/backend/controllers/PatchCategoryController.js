import Category from "../models/Categories.js";
import { removeOldHeroImage } from "../helpers/removeOldImage.js";

export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        let imageHeroSrc = null;
        if (req.file) {
            imageHeroSrc = `/uploads/${req.file.filename}`
        }
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada." })
        }
        if (imageHeroSrc) {
            removeOldHeroImage(category)
        }
        const updateDataCategory = {};
        if (name) updateDataCategory.name = name;
        if (description) updateDataCategory.description = description;
        if (imageHeroSrc) updateDataCategory.imageHeroSrc = imageHeroSrc;
        const updateCategory = await Category.findByIdAndUpdate(
            id,
            updateDataCategory,
            { new: true }
        )
        res.status(201).json({ message: "Categoria atualizada com sucesso.", updateCategory })

    } catch (error) {
        return res.status(500).json({ message: `Erro ao atualizar categoria, ${error.message}.` })
    }
}