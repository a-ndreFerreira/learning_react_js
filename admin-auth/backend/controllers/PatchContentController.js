// import { removeOldImagesArray } from "../helpers/removeOldImage.js";
import Category from "../models/Categories.js";
import fs from 'fs';

// export const updateContent = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { projectName, projectDescription, removeImage = [] } = req.body;
//         const category = await Category.findOne(
//             { "content._id": id },
//             { "content.$": 1 }
//         )
//         if (!category) {
//             return res.status(404).json({ message: "Categoria não foi encontrada." })
//         }
//         const content = category.content.id(id);
//         if (projectName) content.projectName = projectName;
//         if (projectDescription) content.projectDescription = projectDescription;

//         if (removeImage && removeImage.length > 0) {
//             const imagesToRemove = Array.isArray(removeImage) ? removeImage : [removeImage];
//             content.images = content.images.filter(item => !imagesToRemove.includes(item));
//             removeOldImagesArray(imagesToRemove);
//         }


//         if (req.file) {
//             const images = req.files.map(file => ({
//                 src: `/uploads/${file.filename}`
//             }))
//             // content.images.push(images)
//         }
//         await Category.updateOne({ 'content._id': id },
//             {
//                 $set: {
//                     "content.$.projectName": content.projectName,
//                     "content.$.projectDescription": content.projectDescription,
//                     "content.$.imagesSrc": content.images
//                 }
//             }
//         );
//         return res.status(200).json({ message: "Conteúdo atualizado com sucesso.", content });

//     } catch (error) {
//         return res.status(500).json({ message: `Erro ao atualizar conteúdo, ${error.message}.` })
//     }
// }

export const updateContent = async (req, res) => {
    try {
        const { categoryId, contentId } = req.params;
        const { projectName, projectDescription, removeImages = [] } = req.body;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Categoria não foi encontrada." })
        }
        const content = category.content.id(contentId);
        if (!content) {
            return res.status(404).json({ message: "Conteúdo não foi encontrada." })
        }
        if (projectName) content.projectName = projectName;
        if (projectDescription) content.projectDescription = projectDescription;
        if (removeImages && removeImages.length > 0) {
            const imagesToRemove = Array.isArray(removeImages) ? removeImages : [removeImages];

            content.images = content.images.filter(img => {
                if (imagesToRemove.includes(img)) {
                    try {
                        const filePath = path.join(process.cwd(), img);
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                        }
                        return false;
                    } catch (err) {
                        console.error(`Erro ao remover arquivo ${img}:`, err);
                        return true; // Mantém a imagem se não conseguir deletar
                    }
                }
                return true; // mantém
            });
        }
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => { src: `/uploads/${file.filename}` });
            content.images.push(...newImages);
        }

        await category.save();

        return res.status(200).json({ message: "Conteúdo atualizado com sucesso.", content });


    } catch (error) {
        return res.status(500).json({ message: `Erro ao atualizar conteúdo, ${error.message}.` })
    }
}