import Category from "../models/Categories.js"

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}, 'name description imageHeroSrc')
        if (!categories) {
            return res.status(404).json({ message: "Dados não foram encontrados." })
        }
        res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: `Erro ao buscar dados, ${error.message}.` })
    }
}