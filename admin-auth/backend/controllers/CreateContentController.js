import Category from "../models/Categories.js";

export const createContent = async (req, res) => {
    try {
        const id = req.params.id;
        const { projectName, projectDescription } = req.body;
        const images = req.files.map(file => ({
            src: `/uploads/${file.filename}`
        }))
        if (!projectName || !projectDescription || !images) {
            return res.status(400).json({ message: "Dados inválidos." });
        }
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada." });
        }
        //se der erro, images aqui
        const content = {
            projectName,
            projectDescription,
            images
        }
        category.content.push(content);
        await category.save();
        res.status(201).json({ message: "Conteúdo adicionado com sucesso.", category });

    } catch (error) {
        return res.status(500).json({ message: `Erro ao criar conteúdo: ${error.message}` });
    }
}