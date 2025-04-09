import Category from "../models/Categories.js";

export const getContentById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOne(
            { "content._id": id },
            { "content.$": 1 }// => não sei se tem necessidade disso aqui
        )
        if (!category) {
            return res.status(404).json({ message: "Conteúdo não encontrado." })
        }
        res.status(200).json(category.content[0]);// => retorna o objeto
        // category.content => retorna o array com o objeto
    } catch (error) {
        return res.status(500).json({ message: `Erro ao buscar conteúdo: ${error.message}` });
    }
}