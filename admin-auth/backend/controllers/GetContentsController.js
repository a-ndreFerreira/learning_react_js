import Category from "../models/Categories.js";

export const getContents = async (req, res) => {
    try {
        // const id = req.params.id;
        const categories = await Category.find({}, 'content');
        if (!categories) {
            return res.status(404).json({ message: "Conteúdos não encontrados." })
        }
        const allContents = categories.flatMap(category => category.content);
        res.status(200).json(allContents);

    } catch (error) {
        return res.status(500).json({ message: `Erro ao buscar conteúdos: ${error.message}` });
    }
}